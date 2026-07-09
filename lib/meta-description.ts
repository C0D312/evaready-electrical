export const maxMetaDescriptionLength = 160;
export const targetMetaDescriptionLength = 155;

const weakFinalPhrases = [
  "CCTV/data and general",
  "and general",
  "across Sydney and surrounding",
  "planned electrical",
  "Level 2 electrical",
  "across the Southern",
  "across the Central",
  "across the Blue",
  "across Blue",
  "general",
  "across",
  "defect",
  "power",
  "with",
  "for",
  "and",
  "or",
];

const weakFinalPhraseLabels = weakFinalPhrases.map((phrase) =>
  phrase.toLowerCase(),
);

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function stripSentencePunctuation(value: string) {
  return value.replace(/[.!?]+$/g, "").trim();
}

function endsWithWeakPhrase(value: string) {
  const ending = stripSentencePunctuation(normalizeWhitespace(value))
    .replace(/[,\s;:/&-]+$/g, "")
    .toLowerCase();

  return weakFinalPhraseLabels.some((phrase) => ending.endsWith(phrase));
}

function removeWeakEnding(value: string) {
  let current = stripSentencePunctuation(normalizeWhitespace(value));

  for (let attempts = 0; attempts < 8; attempts += 1) {
    const before = current;
    current = current.replace(/[,\s;:/&-]+$/g, "").trim();

    for (const phrase of weakFinalPhrases) {
      const lower = current.toLowerCase();
      const phraseLower = phrase.toLowerCase();

      if (lower.endsWith(phraseLower)) {
        current = current.slice(0, current.length - phrase.length).trim();
        break;
      }
    }

    current = current.replace(/\b(?:and|or|with|for)$/i, "").trim();

    if (current === before) {
      break;
    }
  }

  return current.replace(/[,\s;:/&-]+$/g, "").trim();
}

function finishSentence(value: string) {
  const normalized = normalizeWhitespace(value);

  if (!normalized) {
    return normalized;
  }

  if (/[.!?]$/.test(normalized) && !endsWithWeakPhrase(normalized)) {
    return normalized;
  }

  const repaired = removeWeakEnding(normalized);

  return repaired ? `${repaired}.` : normalized;
}

function trimToSafeMetaSentence(value: string, maxLength: number) {
  const normalized = normalizeWhitespace(value);

  if (normalized.length <= maxLength) {
    return finishSentence(normalized);
  }

  const available = Math.max(0, maxLength - 1);
  const trimmed = stripSentencePunctuation(normalized.slice(0, available).trimEnd());
  const lastSentenceEnd = Math.max(
    trimmed.lastIndexOf("."),
    trimmed.lastIndexOf("!"),
    trimmed.lastIndexOf("?"),
  );

  if (lastSentenceEnd > 90) {
    return finishSentence(trimmed.slice(0, lastSentenceEnd + 1));
  }

  const lastSpace = trimmed.lastIndexOf(" ");
  const wordBoundary =
    lastSpace > 90 ? trimmed.slice(0, lastSpace) : trimmed;
  const repaired = removeWeakEnding(wordBoundary);

  return finishSentence(repaired || wordBoundary);
}

export function clampMetaDescription(
  description: string | string[],
  maxLength = maxMetaDescriptionLength,
) {
  const candidates = (Array.isArray(description) ? description : [description])
    .map((candidate) => finishSentence(candidate))
    .filter(Boolean);
  const safeCandidates = candidates
    .map((candidate) => trimToSafeMetaSentence(candidate, maxLength))
    .filter((candidate) => candidate.length <= maxLength)
    .filter((candidate) => !endsWithWeakPhrase(candidate));
  const preferredCandidate =
    safeCandidates.find(
      (candidate) =>
        candidate.length >= 120 &&
        candidate.length <= targetMetaDescriptionLength,
    ) ??
    safeCandidates.find((candidate) => candidate.length <= maxLength) ??
    trimToSafeMetaSentence(candidates[0] ?? "", maxLength);

  return preferredCandidate;
}

export function buildSentenceAwareMetaDescription(
  fragments: string[],
  options: {
    maxLength?: number;
    targetLength?: number;
  } = {},
) {
  const maxLength = options.maxLength ?? maxMetaDescriptionLength;
  const targetLength = options.targetLength ?? targetMetaDescriptionLength;
  const sentences = fragments
    .map((fragment) => finishSentence(fragment))
    .filter(Boolean);
  const accepted: string[] = [];

  for (const sentence of sentences) {
    const candidate = [...accepted, sentence].join(" ");

    if (candidate.length <= targetLength) {
      accepted.push(sentence);
      continue;
    }

    if (accepted.length === 0 && candidate.length <= maxLength) {
      accepted.push(sentence);
    }

    break;
  }

  if (accepted.length > 0) {
    return accepted.join(" ");
  }

  return clampMetaDescription(sentences, maxLength);
}

export function getMetaDescriptionWarnings(description: string) {
  const warnings: string[] = [];
  const normalized = normalizeWhitespace(description);

  if (!normalized) {
    return warnings;
  }

  if (!/[.!?]$/.test(normalized)) {
    warnings.push("description does not end with sentence punctuation");
  }

  if (/[,\s;:/&-]$/.test(normalized)) {
    warnings.push("description ends with incomplete punctuation");
  }

  if (/\b(?:and|or|with|for)\.?$/i.test(normalized)) {
    warnings.push("description ends with connector word");
  }

  for (const phrase of weakFinalPhrases) {
    if (
      stripSentencePunctuation(normalized)
        .replace(/[,\s;:/&-]+$/g, "")
        .toLowerCase()
        .endsWith(phrase.toLowerCase())
    ) {
      warnings.push(`description ends with weak final token: ${phrase}`);
      break;
    }
  }

  return warnings;
}
