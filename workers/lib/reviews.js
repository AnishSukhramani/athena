/**
 * Review / Phone Friction Detector — Google Places API.
 */
import { supabase } from '@jobportalscout/db';
import { classifyReviewPhoneFriction } from './classify.js';
import { ensurePractice } from './practice-db.js';
import { USER_AGENT } from './constants.js';

const PLACES_FIND = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json';
const PLACES_DETAILS = 'https://maps.googleapis.com/maps/api/place/details/json';

async function findPlaceId(query, apiKey) {
  const u = new URL(PLACES_FIND);
  u.searchParams.set('input', query);
  u.searchParams.set('inputtype', 'textquery');
  u.searchParams.set('fields', 'place_id,name');
  u.searchParams.set('key', apiKey);
  const res = await fetch(u, { headers: { 'User-Agent': USER_AGENT } });
  const json = await res.json();
  return json.candidates?.[0]?.place_id || null;
}

async function fetchPlaceReviews(placeId, apiKey) {
  const u = new URL(PLACES_DETAILS);
  u.searchParams.set('place_id', placeId);
  u.searchParams.set('fields', 'name,rating,reviews,url,formatted_address');
  u.searchParams.set('reviews_no_translations', 'false');
  u.searchParams.set('key', apiKey);
  const res = await fetch(u, { headers: { 'User-Agent': USER_AGENT } });
  const json = await res.json();
  const r = json.result || {};
  return {
    name: r.name,
    rating: r.rating,
    formatted_address: r.formatted_address,
    url: r.url,
    reviews: (r.reviews || []).slice(0, 5).map((rev) => ({
      text: rev.text || '',
      rating: rev.rating,
      time: rev.time,
    })),
  };
}

export async function runReviewFrictionForQueries(queries, log) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    log.warn('GOOGLE_MAPS_API_KEY not set — skipping review fragment');
    return 0;
  }

  let created = 0;
  for (const q of queries) {
    if (!q.trim()) continue;
    try {
      const placeId = await findPlaceId(q, apiKey);
      if (!placeId) { log.debug({ q }, 'No place id'); continue; }
      const details = await fetchPlaceReviews(placeId, apiKey);
      const classification = await classifyReviewPhoneFriction(details.reviews, log);
      if (!classification.friction) continue;

      const practice = await ensurePractice({
        name: details.name || q,
        domain: null,
        locations: details.formatted_address ? [details.formatted_address] : [],
      });

      await supabase.from('signals_athena').insert({
        type: 'phone_friction',
        practice_id: practice.id,
        strength: 'MEDIUM-HIGH',
        metadata: {
          matched_reviews: details.reviews.map((r) => ({ text: r.text })),
          sentiment_score: classification.sentiment,
          place_url: details.url,
          place_id: placeId,
          query: q,
        },
      });
      created += 1;
    } catch (err) {
      log.warn({ q, err: err.message }, 'Review friction query failed');
    }
  }
  log.info({ signalsCreated: created }, 'Review friction done');
  return created;
}

export async function runReviewFrictionFragment(log) {
  const fromEnv = (process.env.REVIEW_PRACTICE_QUERIES || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const limit = Number(process.env.REVIEW_DB_PRACTICE_LIMIT || 15);
  const { data: fromDb } = await supabase
    .from('practices_athena')
    .select('name, locations')
    .not('domain', 'is', null)
    .order('updated_at', { ascending: false })
    .limit(limit);

  const dbQueries = (fromDb || []).map((p) => {
    const locs = Array.isArray(p.locations) ? p.locations : [];
    const loc = locs.length ? String(locs[0]) : '';
    return loc ? `${p.name} ${loc}` : p.name;
  });

  const queries = [...new Set([...fromEnv, ...dbQueries])];
  return runReviewFrictionForQueries(queries, log);
}
