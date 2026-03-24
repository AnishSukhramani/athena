/**
 * Google Sheets append - write leads to configured sheet
 *
 * Uses values.update with an explicit A:I range instead of values.append.
 * Append can misalign columns (e.g. data starting at H) when Sheets infers
 * a "table" from sparse or offset existing rows.
 */

import { google } from 'googleapis';

const DATA_RANGE = 'Sheet2!A1:I';
const COL_COUNT = 9;

/** Pad row to exactly COL_COUNT cells so columns A–I always align */
function padRow(cells) {
  const out = [...cells];
  while (out.length < COL_COUNT) out.push('');
  return out.slice(0, COL_COUNT);
}

/**
 * Initialize Google Sheets client
 * @param {string|object} credentialsOrPath - Path to JSON file, or base64-encoded JSON string, or credentials object
 */
function getSheetsClient(credentialsOrPath) {
  const authOptions =
    typeof credentialsOrPath === 'object'
      ? { credentials: credentialsOrPath, scopes: ['https://www.googleapis.com/auth/spreadsheets'] }
      : { keyFile: credentialsOrPath, scopes: ['https://www.googleapis.com/auth/spreadsheets'] };
  const auth = new google.auth.GoogleAuth(authOptions);
  return google.sheets({ version: 'v4', auth });
}

/**
 * Resolve Google credentials from env (base64 or path)
 */
export function resolveGoogleCredentials() {
  const base64 = process.env.GOOGLE_SERVICE_ACCOUNT_BASE64;
  const path = process.env.GOOGLE_SERVICE_ACCOUNT_PATH || './service-account.json';
  if (base64) {
    try {
      return JSON.parse(Buffer.from(base64, 'base64').toString('utf-8'));
    } catch (err) {
      throw new Error('Invalid GOOGLE_SERVICE_ACCOUNT_BASE64: must be base64-encoded JSON');
    }
  }
  return path;
}

/**
 * Append lead rows to sheet
 * Expected columns: Company, Job Title, Source URL, Email, Phone, LinkedIn, Facebook, Source, Timestamp
 * @param credentialsOrPath - From resolveGoogleCredentials(): path string or credentials object
 */
export async function appendLeads(leads, sheetId, credentialsOrPath, log) {
  if (!leads || leads.length === 0) {
    log.info('No leads to append');
    return { appended: 0 };
  }

  const sheets = getSheetsClient(credentialsOrPath);

  const rows = leads.map((lead) =>
    padRow([
      lead.companyName || '',
      lead.jobTitle || '',
      lead.sourceUrl || '',
      lead.email || '',
      lead.phone || '',
      lead.linkedIn || '',
      lead.facebook || '',
      lead.source || '',
      new Date().toISOString(),
    ])
  );

  try {
    const existingRes = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: DATA_RANGE,
    });
    const existingRows = existingRes.data.values ?? [];
    const startRow = existingRows.length + 1;
    const endRow = startRow + rows.length - 1;
    const range = `Sheet2!A${startRow}:I${endRow}`;

    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: rows },
    });
    log.info({ count: rows.length, range }, 'Wrote leads to Google Sheet');
    return { appended: rows.length };
  } catch (err) {
    log.error({ err }, 'Google Sheets write failed');
    throw err;
  }
}

/**
 * Ensure sheet has headers (call once or on first run)
 */
export async function ensureHeaders(sheetId, credentialsOrPath, log) {
  const sheets = getSheetsClient(credentialsOrPath);
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Sheet2!A1:I1',
    });
    const vals = res.data.values?.[0] ?? [];
    const hasHeaderRow = vals.some((v) => String(v ?? '').trim() !== '');
    if (hasHeaderRow) {
      return;
    }
  } catch {
    // sheet might be empty
  }

  const headers = [
    'Company',
    'Job Title',
    'Source URL',
    'Email',
    'Phone',
    'LinkedIn',
    'Facebook',
    'Source',
    'Timestamp',
  ];
  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: 'Sheet2!A1:I1',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [headers] },
  });
  log.info('Wrote sheet headers');
}
