import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  coverageRegions,
  coverageSearchItems,
  prioritySuburbLocalSignals,
  type CoverageArea,
  type CoverageRegion,
  type CoverageSuburb,
  getSuburbPageCopy,
  getSuburbPaths,
} from "../data/service-area-coverage";
import { getEmergencyResponseForRegion } from "../data/site";

type AuditRow = {
  "CTA count": number;
  "FAQ count": number;
  H1: string;
  "Level 1 or Level 3 wording present": "yes" | "no";
  "Level 2 electrician wording present": "yes" | "no";
  "Level 2 summary present": "yes" | "no";
  "call-first safety wording present": "yes" | "no";
  "correct response-time wording present": "yes" | "no";
  "duplicate text hash": string;
  "emergency electrician wording present": "yes" | "no";
  "emergency summary present": "yes" | "no";
  "fake office claim present": "yes" | "no";
  "general electrical wording present": "yes" | "no";
  "generated URL": string;
  "guaranteed response-time claim present": "yes" | "no";
  "hero description": string;
  "hero description word count": number;
  "hero note": string;
  "internal links count": number;
  "local examples present": "yes" | "no";
  "local property mix present": "yes" | "no";
  "meta description": string;
  "meta description duplicate count": number;
  "meta description length": number;
  "meta description opening duplicate count": number;
  "meta title": string;
  "meta title length": number;
  "nearby suburbs count": number;
  "nearby suburb section present": "yes" | "no";
  "phone CTA present": "yes" | "no";
  "process heading": string;
  "priority local context present": "yes" | "no" | "n/a";
  "priority suburb": "yes" | "no";
  "quote-photo guidance present": "yes" | "no";
  "quote CTA present": "yes" | "no";
  "response-time wording present": "yes" | "no";
  "repeated phrase risk": "yes" | "no";
  "service intro": string;
  "switchboard summary present": "yes" | "no";
  "thin-copy risk": "yes" | "no";
  area: string;
  postcode: string;
  region: string;
  slug: string;
  suburb: string;
  warnings: string;
};

type SuburbRecord = {
  area: CoverageArea;
  region: CoverageRegion;
  suburb: CoverageSuburb;
};

const outputPath = path.join(
  process.cwd(),
  "reports",
  "suburb-page-audit.csv",
);

function csvEscape(value: number | string) {
  const text = String(value);

  if (/[",\n\r]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }

  return text;
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/\b\d{4}\b/g, "postcode")
    .replace(/\b[a-z]+(?:-[a-z]+)*\b(?=\s(?:homes|businesses|strata|properties|jobs|customers))/g, "suburb")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeExactText(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function firstWords(value: string, count: number) {
  return normalizeExactText(value).split(/\s+/).slice(0, count).join(" ");
}

function textHash(parts: string[]) {
  return createHash("sha1")
    .update(parts.map(normalizeText).join("|"))
    .digest("hex")
    .slice(0, 12);
}

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function titleForSuburb(suburb: CoverageSuburb) {
  return `Electrician ${suburb.name} ${suburb.postcode} | Emergency & Level 2`;
}

function pageUrl(region: CoverageRegion, area: CoverageArea, suburb: CoverageSuburb) {
  return `/service-areas/${region.slug}/${area.slug}/${suburb.slug}`;
}

function hasIntent(
  copy: ReturnType<typeof getSuburbPageCopy>,
  intent: "emergency" | "level2" | "switchboard",
) {
  return copy.serviceSummaries.some((summary) => summary.intent === intent);
}

function combinedCopy(copy: ReturnType<typeof getSuburbPageCopy>) {
  return [
    copy.heroSupportLine,
    copy.heroDescription,
    copy.heroNote,
    copy.processDescription,
    copy.serviceIntro,
    ...copy.landingServiceCards.flatMap((card) => [
      card.title,
      card.text,
      ...card.items,
    ]),
    ...copy.callQuoteGuidance.callFirst,
    ...copy.callQuoteGuidance.quoteForm,
    ...copy.level2QuoteChecklist,
    ...copy.localHighlights.flatMap((item) => [item.title, item.text]),
    ...copy.serviceSummaries.flatMap((summary) => [
      summary.title,
      summary.text,
    ]),
    ...Object.values(copy.faqAnswers),
  ].join(" ");
}

function yesNo(value: boolean): "yes" | "no" {
  return value ? "yes" : "no";
}

function enumerateSuburbs() {
  return coverageRegions.flatMap((region) =>
    region.areas.flatMap((area) =>
      area.suburbs.map((suburb) => ({ area, region, suburb })),
    ),
  );
}

function buildAuditRows(records: SuburbRecord[]) {
  const generatedUrls = new Map<string, number>();
  const generatedPathSet = new Set(
    getSuburbPaths().map(
      (item) => `/service-areas/${item.region}/${item.area}/${item.suburb}`,
    ),
  );
  const sitemapUrlSet = new Set(coverageSearchItems.map((item) => item.href));
  const slugCountsByArea = new Map<string, Map<string, number>>();
  const hashCounts = new Map<string, number>();
  const heroDescriptionCounts = new Map<string, number>();
  const metaDescriptionCounts = new Map<string, number>();
  const metaOpeningCounts = new Map<string, number>();

  for (const { area, region, suburb } of records) {
    const url = pageUrl(region, area, suburb);
    generatedUrls.set(url, (generatedUrls.get(url) ?? 0) + 1);

    const areaKey = `${region.slug}/${area.slug}`;
    const areaSlugCounts = slugCountsByArea.get(areaKey) ?? new Map<string, number>();
    areaSlugCounts.set(suburb.slug, (areaSlugCounts.get(suburb.slug) ?? 0) + 1);
    slugCountsByArea.set(areaKey, areaSlugCounts);

    const copy = getSuburbPageCopy(region, area, suburb);
    const heroDescriptionKey = normalizeExactText(copy.heroDescription);
    const metaDescriptionKey = normalizeExactText(copy.metaDescription);
    const metaOpeningKey = firstWords(copy.metaDescription, 4);
    const hash = textHash([
      copy.heroDescription,
      copy.heroNote,
      copy.serviceIntro,
      ...copy.serviceSummaries.map((summary) => summary.text),
      ...Object.values(copy.faqAnswers),
    ]);
    hashCounts.set(hash, (hashCounts.get(hash) ?? 0) + 1);
    heroDescriptionCounts.set(
      heroDescriptionKey,
      (heroDescriptionCounts.get(heroDescriptionKey) ?? 0) + 1,
    );
    metaDescriptionCounts.set(
      metaDescriptionKey,
      (metaDescriptionCounts.get(metaDescriptionKey) ?? 0) + 1,
    );
    metaOpeningCounts.set(
      metaOpeningKey,
      (metaOpeningCounts.get(metaOpeningKey) ?? 0) + 1,
    );
  }

  const rows = records.map(({ area, region, suburb }) => {
    const copy = getSuburbPageCopy(region, area, suburb);
    const url = pageUrl(region, area, suburb);
    const title = titleForSuburb(suburb);
    const nearbySuburbsCount = Math.min(
      region.areas.flatMap((areaItem) =>
        areaItem.suburbs.filter(
          (nearbySuburb) => nearbySuburb.slug !== suburb.slug,
        ),
      ).length,
      8,
    );
    const hash = textHash([
      copy.heroDescription,
      copy.heroNote,
      copy.serviceIntro,
      ...copy.serviceSummaries.map((summary) => summary.text),
      ...Object.values(copy.faqAnswers),
    ]);
    const quickLinksCount = 4;
    const primaryCtas = 2;
    const finalCtas = 2;
    const internalLinksCount =
      copy.serviceLinks.length + quickLinksCount + nearbySuburbsCount;
    const ctaCount = primaryCtas + finalCtas + 1;
    const emergencySummaryPresent = hasIntent(copy, "emergency");
    const level2SummaryPresent = hasIntent(copy, "level2");
    const switchboardSummaryPresent = hasIntent(copy, "switchboard");
    const allCopy = combinedCopy(copy);
    const response = getEmergencyResponseForRegion(region.name);
    const expectedResponsePattern = response.isCore
      ? /\b(60-minute|within 60 minutes)\b/i
      : /\b(90-minute|within 90 minutes)\b/i;
    const emergencyElectricianPresent = new RegExp(
      `\\bEmergency electrician in ${suburb.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
      "i",
    ).test(allCopy);
    const level2ElectricianPresent = new RegExp(
      `\\bLevel 2 electrician in ${suburb.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
      "i",
    ).test(allCopy);
    const generalElectricalPresent = new RegExp(
      `\\bgeneral electrical work in ${suburb.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
      "i",
    ).test(allCopy);
    const responseTimePresent =
      /\b(60-minute|within 60 minutes|90-minute|within 90 minutes)\b/i.test(
        allCopy,
      );
    const correctResponseTimePresent = expectedResponsePattern.test(allCopy);
    const level1OrLevel3Present =
      /\b(Level 1|Level One|Level 3|Level Three|ASP1|ASP 1|ASP3|ASP 3)\b/i.test(
        allCopy,
      );
    const localPropertyMixPresent =
      /\b(homes|apartments|strata|shops|businesses|warehouses|units|duplexes|terraces|acreage|commercial|townhouses|villas|family homes|older homes|workshops)\b/i.test(
        allCopy,
      );
    const quotePhotoGuidancePresent =
      /\b(photo|photos|job notes|booking form|address|access|switchboard photos)\b/i.test(
        allCopy,
      );
    const callFirstSafetyPresent =
      /\b(call first|call before|phone first|unsafe|no power|power loss|sparking|burning|smoke|heat)\b/i.test(
        allCopy,
      );
    const localExamplesPresent = copy.localHighlights.some((highlight) =>
      /typical|common|examples|enquiries/i.test(
        `${highlight.title} ${highlight.text}`,
      ),
    );
    const fakeOfficeClaimPresent = new RegExp(
      `\\b(?:office|branch)\\s+(?:in|at)\\s+${suburb.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}|\\bbased\\s+in\\s+${suburb.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
      "i",
    ).test(allCopy);
    const guaranteedResponseClaimPresent =
      /\b(guaranteed|30[- ]minute|1[- ]hour|same[- ]day guaranteed|always arrive|guaranteed response)\b/i.test(
        allCopy,
      );
    const thinCopyRisk =
      wordCount(copy.heroDescription) +
        wordCount(copy.heroNote) +
        wordCount(copy.serviceIntro) +
        copy.localHighlights.reduce(
          (total, highlight) => total + wordCount(highlight.text),
          0,
        ) <
      170;
    const repeatedPhraseRisk = (hashCounts.get(hash) ?? 0) > 1;
    const heroDescriptionDuplicateCount =
      heroDescriptionCounts.get(normalizeExactText(copy.heroDescription)) ?? 1;
    const metaDescriptionDuplicateCount =
      metaDescriptionCounts.get(normalizeExactText(copy.metaDescription)) ?? 1;
    const metaOpeningDuplicateCount =
      metaOpeningCounts.get(firstWords(copy.metaDescription, 4)) ?? 1;
    const prioritySignals = prioritySuburbLocalSignals[suburb.slug] ?? [];
    const isPrioritySuburb = prioritySignals.length > 0;
    const priorityLocalContextPresent =
      !isPrioritySuburb ||
      prioritySignals.some((signal) =>
        normalizeExactText(allCopy).includes(normalizeExactText(signal)),
      );
    const metaSuburbNamePresent = normalizeExactText(
      copy.metaDescription,
    ).includes(normalizeExactText(suburb.name));
    const metaPostcodePresent =
      !suburb.postcode || copy.metaDescription.includes(suburb.postcode);
    const metaDescriptionTooGeneric =
      /^(need an electrician|need electrical help|evaready helps)\b/i.test(
        copy.metaDescription,
      ) ||
      (isPrioritySuburb &&
        !/\b(apartment|apartments|coastal|commercial|duplex|factory|home|homes|industrial|office|retail|shop|shops|strata|terrace|unit|units|warehouse|workshop|larger blocks|older boards|storm|outdoor|switchboard|consumer mains|Level 2)\b/i.test(
          copy.metaDescription,
        ));
    const nearbySuburbSectionPresent = nearbySuburbsCount > 0;
    const warnings: string[] = [];
    const areaKey = `${region.slug}/${area.slug}`;
    const duplicateSlugCount =
      slugCountsByArea.get(areaKey)?.get(suburb.slug) ?? 0;

    if (duplicateSlugCount > 1) {
      warnings.push("duplicate suburb slug within area");
    }
    if ((generatedUrls.get(url) ?? 0) > 1) {
      warnings.push("duplicate generated URL");
    }
    if (!suburb.postcode) {
      warnings.push("missing postcode");
    } else if (!/^\d{4}$/.test(suburb.postcode)) {
      warnings.push("invalid postcode format");
    }
    if (!region.name || !area.name || !suburb.name) {
      warnings.push("missing region/area/suburb name");
    }
    if (!sitemapUrlSet.has(url)) {
      warnings.push("generated sitemap URL missing");
    }
    if (!generatedPathSet.has(url)) {
      warnings.push("orphan suburb page");
    }
    if (title.length > 65) {
      warnings.push("meta title over 65 characters");
    }
    if (copy.metaDescription.length > 160) {
      warnings.push("meta description over 160 characters");
    }
    if (!metaSuburbNamePresent) {
      warnings.push("meta description missing suburb name");
    }
    if (!metaPostcodePresent) {
      warnings.push("meta description missing postcode");
    }
    if (metaDescriptionDuplicateCount > 1) {
      warnings.push(
        `duplicate meta description shared by ${metaDescriptionDuplicateCount} pages`,
      );
    }
    if (heroDescriptionDuplicateCount > 1) {
      warnings.push(
        `identical hero description shared by ${heroDescriptionDuplicateCount} pages`,
      );
    }
    if (
      metaOpeningDuplicateCount > 20 &&
      /^(need|evaready|electrical|for)\b/i.test(firstWords(copy.metaDescription, 4))
    ) {
      warnings.push(
        `same generic meta opening shared by ${metaOpeningDuplicateCount} pages`,
      );
    }
    if (metaDescriptionTooGeneric) {
      warnings.push("meta description too generic");
    }
    if (isPrioritySuburb && !priorityLocalContextPresent) {
      warnings.push("priority suburb missing local context signal");
    }
    if (wordCount(copy.heroDescription) < 32) {
      warnings.push("hero description too short");
    }
    if (!emergencySummaryPresent) {
      warnings.push("emergency summary missing");
    }
    if (!emergencyElectricianPresent) {
      warnings.push("emergency electrician wording missing");
    }
    if (!level2SummaryPresent) {
      warnings.push("Level 2 summary missing");
    }
    if (!level2ElectricianPresent) {
      warnings.push("Level 2 electrician wording missing");
    }
    if (!generalElectricalPresent) {
      warnings.push("general electrical wording missing");
    }
    if (!switchboardSummaryPresent) {
      warnings.push("switchboard summary missing");
    }
    if (!responseTimePresent) {
      warnings.push("response-time wording missing");
    }
    if (!correctResponseTimePresent) {
      warnings.push("correct response-time wording missing");
    }
    if (level1OrLevel3Present) {
      warnings.push("Level 1 or Level 3 wording present");
    }
    if (ctaCount < 4) {
      warnings.push("low CTA count");
    }
    if (copy.serviceLinks.length < 8 || internalLinksCount < 8) {
      warnings.push("too few internal links");
    }
    if (Object.keys(copy.faqAnswers).length < 5) {
      warnings.push("too few FAQs");
    }
    if (!localPropertyMixPresent) {
      warnings.push("local property mix missing");
    }
    if (!quotePhotoGuidancePresent) {
      warnings.push("quote-photo guidance missing");
    }
    if (!callFirstSafetyPresent) {
      warnings.push("call-first safety wording missing");
    }
    if (!localExamplesPresent) {
      warnings.push("local examples missing");
    }
    if (!nearbySuburbSectionPresent) {
      warnings.push("nearby suburb section missing");
    }
    if (fakeOfficeClaimPresent) {
      warnings.push("possible fake office claim");
    }
    if (guaranteedResponseClaimPresent) {
      warnings.push("possible guaranteed response-time claim");
    }
    if (thinCopyRisk) {
      warnings.push("thin-copy risk");
    }
    if (repeatedPhraseRisk) {
      warnings.push("repeated phrase risk");
    }
    if ((hashCounts.get(hash) ?? 0) > 1) {
      warnings.push(`duplicate text hash shared by ${hashCounts.get(hash)} pages`);
    }

    return {
      region: region.name,
      area: area.name,
      suburb: suburb.name,
      postcode: suburb.postcode,
      slug: suburb.slug,
      "generated URL": url,
      "meta title": title,
      "meta title length": title.length,
      "meta description": copy.metaDescription,
      "meta description length": copy.metaDescription.length,
      "meta description duplicate count": metaDescriptionDuplicateCount,
      "meta description opening duplicate count": metaOpeningDuplicateCount,
      H1: `Electrician ${suburb.name} ${suburb.postcode}`,
      "hero description": copy.heroDescription,
      "hero description word count": wordCount(copy.heroDescription),
      "hero note": copy.heroNote,
      "process heading": copy.processHeading,
      "priority suburb": yesNo(isPrioritySuburb),
      "priority local context present": isPrioritySuburb
        ? yesNo(priorityLocalContextPresent)
        : "n/a",
      "service intro": copy.serviceIntro,
      "local property mix present": yesNo(localPropertyMixPresent),
      "quote-photo guidance present": yesNo(quotePhotoGuidancePresent),
      "call-first safety wording present": yesNo(callFirstSafetyPresent),
      "local examples present": yesNo(localExamplesPresent),
      "emergency summary present": yesNo(emergencySummaryPresent),
      "emergency electrician wording present": yesNo(
        emergencyElectricianPresent,
      ),
      "Level 2 summary present": yesNo(level2SummaryPresent),
      "Level 2 electrician wording present": yesNo(level2ElectricianPresent),
      "general electrical wording present": yesNo(generalElectricalPresent),
      "switchboard summary present": yesNo(switchboardSummaryPresent),
      "response-time wording present": yesNo(responseTimePresent),
      "correct response-time wording present": yesNo(
        correctResponseTimePresent,
      ),
      "Level 1 or Level 3 wording present": yesNo(level1OrLevel3Present),
      "CTA count": ctaCount,
      "phone CTA present": "yes" as const,
      "quote CTA present": "yes" as const,
      "FAQ count": Object.keys(copy.faqAnswers).length,
      "internal links count": internalLinksCount,
      "nearby suburbs count": nearbySuburbsCount,
      "nearby suburb section present": yesNo(nearbySuburbSectionPresent),
      "duplicate text hash": hash,
      "fake office claim present": yesNo(fakeOfficeClaimPresent),
      "guaranteed response-time claim present": yesNo(
        guaranteedResponseClaimPresent,
      ),
      "thin-copy risk": yesNo(thinCopyRisk),
      "repeated phrase risk": yesNo(repeatedPhraseRisk),
      warnings: warnings.join("; "),
    } satisfies AuditRow;
  });

  return rows;
}

const columns: (keyof AuditRow)[] = [
  "region",
  "area",
  "suburb",
  "postcode",
  "slug",
  "generated URL",
  "meta title",
  "meta title length",
  "meta description",
  "meta description length",
  "meta description duplicate count",
  "meta description opening duplicate count",
  "H1",
  "hero description",
  "hero description word count",
  "hero note",
  "process heading",
  "priority suburb",
  "priority local context present",
  "service intro",
  "local property mix present",
  "quote-photo guidance present",
  "call-first safety wording present",
  "local examples present",
  "emergency summary present",
  "emergency electrician wording present",
  "Level 2 summary present",
  "Level 2 electrician wording present",
  "general electrical wording present",
  "switchboard summary present",
  "response-time wording present",
  "correct response-time wording present",
  "Level 1 or Level 3 wording present",
  "CTA count",
  "phone CTA present",
  "quote CTA present",
  "FAQ count",
  "internal links count",
  "nearby suburbs count",
  "nearby suburb section present",
  "duplicate text hash",
  "fake office claim present",
  "guaranteed response-time claim present",
  "thin-copy risk",
  "repeated phrase risk",
  "warnings",
];

const rows = buildAuditRows(enumerateSuburbs());
const csv = [
  columns.map(csvEscape).join(","),
  ...rows.map((row) => columns.map((column) => csvEscape(row[column])).join(",")),
].join("\n");

mkdirSync(path.dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${csv}\n`, "utf8");

const rowsWithWarnings = rows.filter((row) => row.warnings.length > 0);
const duplicateUrlWarnings = rows.filter((row) =>
  row.warnings.includes("duplicate generated URL"),
);

console.log(
  JSON.stringify(
    {
      duplicateUrlIssues: duplicateUrlWarnings.length,
      outputPath,
      totalSuburbPages: rows.length,
      rowsWithWarnings: rowsWithWarnings.length,
      warningExamples: rowsWithWarnings
        .slice(0, 8)
        .map((row) => ({
          suburb: row.suburb,
          url: row["generated URL"],
          warnings: row.warnings,
        })),
    },
    null,
    2,
  ),
);
