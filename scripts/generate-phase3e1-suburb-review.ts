import { writeFileSync } from "node:fs";
import { createSuburbIndexationRecommendations } from "./phase3e1-suburb-review";

const rows = createSuburbIndexationRecommendations();
const columns = ["route", "suburb", "postcode", "area", "region", "review", "approvedEvidenceRecords", "recommendation", "rationale"] as const;
const csvCell = (value: string | number) => `"${String(value).replaceAll('"', '""')}"`;
writeFileSync("reports/phase3e1-suburb-indexation-recommendations.csv", [
  columns.join(","),
  ...rows.map(row => columns.map(column => csvCell(row[column])).join(",")),
].join("\n") + "\n");
console.log(JSON.stringify({ routes: rows.length, reviewed: rows.filter(row => row.review === "reviewed").length, recommendation: "needs_owner_decision", appliedDecisions: 0 }));
