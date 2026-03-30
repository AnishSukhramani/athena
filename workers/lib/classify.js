/**
 * LLM classification for jobs/reviews — not used for raw scraping.
 */
import OpenAI from 'openai';
import { matchesTarget } from '../../src/filters.js';

const FRONT_DESK_KEYWORDS = [
  'front desk',
  'receptionist',
  'patient coordinator',
  'front office',
  'scheduling coordinator',
];

function ruleBasedFrontDesk(jobTitle, description) {
  const t = `${jobTitle || ''} ${description || ''}`.toLowerCase();
  return FRONT_DESK_KEYWORDS.some((k) => t.includes(k));
}

/**
 * @returns {{ frontDesk: boolean, keywords: string[], source: 'rules'|'llm' }}
 */
export async function classifyJobFrontDesk({ jobTitle, description, companyName, log }) {
  const combined = { jobTitle, rawDescription: description || '', companyName: companyName || '' };
  const rulesMatch = matchesTarget(combined) || ruleBasedFrontDesk(jobTitle, description);

  if (!process.env.OPENAI_API_KEY) {
    return { frontDesk: rulesMatch, keywords: rulesMatch ? FRONT_DESK_KEYWORDS.filter((k) => `${jobTitle} ${description}`.toLowerCase().includes(k)) : [], source: 'rules' };
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  try {
    const res = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'Classify if this job is for a dental practice front desk / reception / patient coordinator role. Reply JSON: {"frontDesk":boolean,"keywords":string[]}',
        },
        {
          role: 'user',
          content: JSON.stringify({ jobTitle, description: (description || '').slice(0, 8000), companyName }),
        },
      ],
    });
    const text = res.choices[0]?.message?.content || '{}';
    const parsed = JSON.parse(text);
    const frontDesk = Boolean(parsed.frontDesk);
    const keywords = Array.isArray(parsed.keywords) ? parsed.keywords : [];
    return { frontDesk, keywords, source: 'llm' };
  } catch (err) {
    log?.warn?.({ err: err.message }, 'LLM job classification failed; using rules');
    return { frontDesk: rulesMatch, keywords: [], source: 'rules' };
  }
}

/**
 * @returns {{ friction: boolean, matchedPhrases: string[], sentiment: number|null }}
 */
export async function classifyReviewPhoneFriction(reviews, log) {
  const textBlob = reviews.map((r) => `${r.text || ''}`).join('\n').slice(0, 12000);
  const keywordHits = [];
  const patterns = [/no one answers/i, /long hold/i, /never called back/i, /phone keeps ringing/i, /unanswered/i, /voicemail/i];
  for (const p of patterns) {
    if (p.test(textBlob)) keywordHits.push(p.source);
  }

  if (!process.env.OPENAI_API_KEY) {
    return { friction: keywordHits.length > 0, matchedPhrases: keywordHits, sentiment: null };
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  try {
    const res = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'Given Google Maps review snippets about a dental practice, detect phone friction (unanswered calls, long holds, no callback). JSON: {"friction":boolean,"matchedPhrases":string[],"sentiment":number}',
        },
        { role: 'user', content: textBlob },
      ],
    });
    const parsed = JSON.parse(res.choices[0]?.message?.content || '{}');
    return {
      friction: Boolean(parsed.friction) || keywordHits.length > 0,
      matchedPhrases: [...keywordHits, ...(Array.isArray(parsed.matchedPhrases) ? parsed.matchedPhrases : [])],
      sentiment: typeof parsed.sentiment === 'number' ? parsed.sentiment : null,
    };
  } catch (err) {
    log?.warn?.({ err: err.message }, 'LLM review classification failed');
    return { friction: keywordHits.length > 0, matchedPhrases: keywordHits, sentiment: null };
  }
}
