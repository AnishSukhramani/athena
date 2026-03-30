/**
 * NPPES — ingest dental providers from a local NPPES CSV.
 * Set NPPES_CSV_PATH to the npidata file path.
 */
import fs from 'fs';
import readline from 'readline';
import crypto from 'crypto';
import { supabase } from '@jobportalscout/db';
import { ensurePractice } from './practice-db.js';

function hashAddress(parts) {
  return crypto.createHash('sha256').update(parts.join('|')).digest('hex');
}

function isDentalTaxonomy(code) {
  return String(code || '').trim().startsWith('1223');
}

function detectDelimiter(firstLine) {
  return firstLine.includes('|') ? '|' : ',';
}

function splitRow(line, delimiter) {
  if (delimiter === '|') return line.split('|');
  const out = [];
  let cur = '';
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { inQ = !inQ; continue; }
    if (!inQ && ch === ',') { out.push(cur); cur = ''; continue; }
    cur += ch;
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

function buildHeaderIndex(headerCells) {
  const idx = {};
  headerCells.forEach((h, i) => {
    const key = String(h).replace(/^\uFEFF/, '').trim();
    idx[key] = i;
    idx[key.toLowerCase()] = i;
  });
  return idx;
}

function getCell(headerIdx, cells, ...names) {
  for (const n of names) {
    const i = headerIdx[n] ?? headerIdx[n.toLowerCase()];
    if (i !== undefined && cells[i] !== undefined) return String(cells[i]).replace(/^"|"$/g, '');
  }
  return '';
}

export async function runNppesFragment(log) {
  const csvPath = process.env.NPPES_CSV_PATH;
  if (!csvPath || !fs.existsSync(csvPath)) {
    log.warn('NPPES_CSV_PATH not set or file missing — skipping NPPES fragment');
    return 0;
  }

  const fileStream = fs.createReadStream(csvPath, { encoding: 'utf-8' });
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let lineNo = 0;
  let headerIdx = null;
  let delimiter = '|';
  let created = 0;

  for await (const line of rl) {
    lineNo += 1;
    if (lineNo === 1) {
      delimiter = detectDelimiter(line);
      headerIdx = buildHeaderIndex(splitRow(line, delimiter));
      continue;
    }
    if (!headerIdx) break;

    const cells = splitRow(line, delimiter);
    const npi = getCell(headerIdx, cells, 'NPI');
    const entityType = getCell(headerIdx, cells, 'Entity Type Code');
    const tax1 = getCell(headerIdx, cells, 'Healthcare Provider Taxonomy Code_1', 'Healthcare Provider Taxonomy Code 1');
    if (!npi || !isDentalTaxonomy(tax1)) continue;
    if (entityType && entityType !== '2') continue;

    const orgName =
      getCell(headerIdx, cells, 'Provider Organization Name (Legal Business Name)') ||
      getCell(headerIdx, cells, 'Provider Last Name (Legal Name)') ||
      getCell(headerIdx, cells, 'Provider Organization Name') ||
      'Dental practice';

    const line1 = getCell(headerIdx, cells, 'Provider First Line Business Practice Location Address');
    const city = getCell(headerIdx, cells, 'Provider Business Practice Location Address City Name');
    const state = getCell(headerIdx, cells, 'Provider Business Practice Location Address State Name');
    const zip = getCell(headerIdx, cells, 'Provider Business Practice Location Address Postal Code');
    const location = [line1, city, state, zip].filter(Boolean).join(', ');
    const addrHash = hashAddress([line1, city, state, zip]);

    const { data: snap } = await supabase
      .from('npi_snapshots_athena')
      .select('npi, address_hash')
      .eq('npi', npi)
      .maybeSingle();

    if (snap && snap.address_hash === addrHash) continue;

    await supabase.from('npi_snapshots_athena').upsert({
      npi,
      address_hash: addrHash,
      practice_name: orgName,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'npi' });

    const practice = await ensurePractice({
      name: orgName,
      domain: null,
      locations: location ? [location] : [],
    });

    const existing = await supabase.from('practices_athena').select('npi_ids').eq('id', practice.id).single();
    const prevIds = existing?.data?.npi_ids || [];
    await supabase.from('practices_athena').update({
      npi_ids: Array.from(new Set([...prevIds, npi])),
      locations: location ? [location] : undefined,
    }).eq('id', practice.id);

    await supabase.from('signals_athena').insert({
      type: 'new_practice',
      practice_id: practice.id,
      strength: 'HIGH',
      metadata: {
        npi_id: npi,
        location,
        detected_at: new Date().toISOString(),
        change: snap ? 'address_or_new' : 'new',
      },
    });
    created += 1;

    const maxRows = Number(process.env.NPPES_MAX_ROWS || 5000);
    if (created >= maxRows) { log.warn({ maxRows }, 'NPPES row cap reached'); break; }
  }

  log.info({ signalsCreated: created }, 'NPPES fragment done');
  return created;
}
