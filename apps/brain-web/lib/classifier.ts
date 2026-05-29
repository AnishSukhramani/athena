/**
 * Rules-based classifier (recommender). Outputs actionable/content booleans; both may be true.
 */

export const CLASSIFIER_VERSION = 'rules-v1';

export type SignalTypeForClassify =
  | 'job_frontdesk'
  | 'chronic_turnover'
  | 'phone_friction'
  | 'new_practice'
  | 'low_automation'
  | 'legacy_tech_stack'
  | 'competitor_xray_engagement';

export type ClassificationInput = {
  score: number;
  summary: string | null;
  evidenceTexts: string[];
  signalTypes: SignalTypeForClassify[];
};

export type ClassificationResult = {
  recommended_actionable: boolean;
  recommended_content: boolean;
  recommendation_confidence: number;
  recommendation_reason: string;
};

const EMAIL_RE = /\b[\w%+.-]+@[\w.-]+\.[a-z]{2,}\b/i;
const PHONE_RE = /(\+?\d[\d\s().-]{8,}\d)/;

const CONTENT_KW = [
  'conference',
  'webinar',
  'research',
  'study',
  'published',
  'journal',
  'abstract',
  'clinical trial',
  'ce course',
  'continuing education',
  'symposium',
  'white paper',
  'industry news',
  'announcement',
  'report',
  'survey',
  'breakthrough',
];

const HIRING_KW = [
  'hiring',
  'apply',
  'job',
  'position',
  'opening',
  'receptionist',
  'front desk',
  'dental assistant',
  'now hiring',
];

function norm(s: string) {
  return s.toLowerCase();
}

function hasAny(haystack: string, needles: string[]) {
  const h = norm(haystack);
  return needles.some((n) => h.includes(n));
}

/**
 * Heuristic: hiring/contact signals → actionable; editorial/competitor/education → content; both allowed.
 */
export function classifyOpportunity(input: ClassificationInput): ClassificationResult {
  const blob = [
    input.summary || '',
    ...input.evidenceTexts,
    ...input.signalTypes.map((t) => t.replace(/_/g, ' ')),
  ].join(' \n ');

  const st = new Set(input.signalTypes);

  let actionable = false;
  let content = false;
  const reasons: string[] = [];

  if (
    st.has('job_frontdesk') ||
    st.has('chronic_turnover') ||
    st.has('phone_friction')
  ) {
    actionable = true;
    reasons.push('signal indicates outreach/hiring or contact friction');
  }

  if (EMAIL_RE.test(blob) || PHONE_RE.test(blob)) {
    actionable = true;
    reasons.push('contact info in summary or evidence');
  }

  if (!actionable && hasAny(blob, HIRING_KW)) {
    actionable = true;
    reasons.push('hiring or role keywords in text');
  }

  if (
    st.has('competitor_xray_engagement') ||
    st.has('new_practice') ||
    st.has('low_automation') ||
    st.has('legacy_tech_stack')
  ) {
    content = true;
    reasons.push('signal fits narrative/competitive or practice story');
  }

  if (hasAny(blob, CONTENT_KW)) {
    content = true;
    reasons.push('education/news/research language');
  }

  if (!actionable && !content) {
    reasons.push('default: low-signal row; review manually');
  }

  const nReasons = Math.max(1, reasons.length);
  const confidence = Math.min(
    0.95,
    0.45 + (actionable || content ? 0.12 * nReasons : 0)
  );

  return {
    recommended_actionable: actionable,
    recommended_content: content,
    recommendation_confidence: Math.round(confidence * 100) / 100,
    recommendation_reason: reasons.slice(0, 4).join('; '),
  };
}
