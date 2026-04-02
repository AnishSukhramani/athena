/**
 * Legacy PMS / portal fingerprints (Athena v1.2 tech_stack fragment).
 */
import { supabase } from '@jobportalscout/db';
import { USER_AGENT } from './constants.js';

/** DOM / script signatures for legacy practice software */
export const LEGACY_STACK_PATTERNS = [
  { id: 'dentrix_portal', re: /dentrix\.com\/portal/i },
  { id: 'eaglesoft', re: /eaglesoft/i },
  { id: 'mysecurehealthdata', re: /mysecurehealthdata\.com/i },
  { id: 'curve_hero_legacy', re: /curve\.com\/patient/i },
  { id: 'dentrix_ascend_embed', re: /dentrixascend\.com/i },
  { id: 'open_dental', re: /opendental\.com/i },
  { id: 'carestream', re: /carestreamdental\.com/i },
  { id: 'webforms_aspnet', re: /__VIEWSTATE|WebForm_DoPostBackWithOptions/i },
  { id: 'php_legacy', re: /\/index\.php\?option=com_/i },
];

const DEFAULT_PATHS = ['/patients', '/patient', '/patient-portal', '/contact', '/contact-us'];

async function fetchHtml(url, timeoutMs = 20000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { 'User-Agent': USER_AGENT, Accept: 'text/html,application/xhtml+xml' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(t);
  }
}

function collectMatches(html) {
  const matches = [];
  for (const { id, re } of LEGACY_STACK_PATTERNS) {
    if (re.test(html)) matches.push(id);
  }
  return matches;
}

async function fetchBuiltWithHint(domain, apiKey, log) {
  if (!apiKey) return null;
  const clean = domain.replace(/^https?:\/\//i, '').split('/')[0];
  const url = `https://api.builtwith.com/v21/api.json?KEY=${encodeURIComponent(apiKey)}&LOOKUP=${encodeURIComponent(clean)}`;
  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const j = await res.json();
    const paths = j?.Results?.[0]?.Result?.Paths;
    if (!Array.isArray(paths)) return { raw: j };
    const techNames = paths.flatMap((p) => (Array.isArray(p?.Technologies) ? p.Technologies : []))
      .map((t) => t?.Name)
      .filter(Boolean)
      .slice(0, 40);
    const legacyHints = techNames.filter((n) =>
      /asp\.net|web forms|iis|php\/5|coldfusion|jquery 1\.|apache\/2\.2/i.test(String(n)),
    );
    return { techNames, legacyHints };
  } catch (err) {
    log.warn({ err: err.message, domain: clean }, 'BuiltWith API failed');
    return null;
  }
}

export async function runTechStackFragment(log) {
  const take = Number(process.env.TECH_STACK_SCAN_LIMIT || process.env.WEBSITE_SCAN_LIMIT || 20);
  const { data: practices } = await supabase
    .from('practices_athena')
    .select('id, name, domain')
    .not('domain', 'is', null)
    .order('updated_at', { ascending: false })
    .limit(take);

  log.info({ practicesToScan: (practices || []).length, scanLimit: take }, 'Tech stack fragment');

  const extraPaths = (process.env.TECH_STACK_EXTRA_PATHS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const pathsToTry = [...new Set([...DEFAULT_PATHS, ...extraPaths])];

  const builtWithKey = process.env.BUILTWITH_API_KEY?.trim();
  let created = 0;

  for (const p of practices || []) {
    if (!p.domain) continue;
    const base = p.domain.startsWith('http') ? p.domain.replace(/\/$/, '') : `https://${p.domain.replace(/\/$/, '')}`;
    const urlsFetched = [];
    const chunks = [];

    try {
      const home = await fetchHtml(base);
      urlsFetched.push(base);
      chunks.push(home);
    } catch (err) {
      log.warn({ domain: p.domain, err: err.message }, 'Tech stack: homepage fetch failed');
      continue;
    }

    for (const path of pathsToTry) {
      const u = base + (path.startsWith('/') ? path : `/${path}`);
      if (u === base) continue;
      try {
        const html = await fetchHtml(u, 15000);
        urlsFetched.push(u);
        chunks.push(html);
        if (chunks.join('').length > 400_000) break;
      } catch {
        /* optional paths */
      }
    }

    const combined = chunks.join('\n');
    let matches = collectMatches(combined);

    let apiMeta = null;
    if (builtWithKey) {
      apiMeta = await fetchBuiltWithHint(p.domain, builtWithKey, log);
      if (apiMeta?.legacyHints?.length) {
        matches = [...new Set([...matches, ...apiMeta.legacyHints.map((h) => `builtwith:${h}`)])];
      }
    }

    if (matches.length === 0) {
      log.debug({ domain: p.domain }, 'Tech stack: no legacy signatures');
      continue;
    }

    await supabase.from('signals_athena').insert({
      type: 'legacy_tech_stack',
      practice_id: p.id,
      strength: 'MEDIUM',
      metadata: {
        matches,
        urls_fetched: urlsFetched,
        builtwith: apiMeta
          ? { legacyHints: apiMeta.legacyHints, sample: apiMeta.techNames?.slice(0, 15) }
          : null,
      },
    });
    created += 1;
  }

  log.info({ signalsCreated: created }, 'Tech stack fragment done');
  return created;
}
