export const phase3e2SpecialistRoutes = [
  "/level-2-electrician-sydney",
  "/services/cctv-security-camera-installation-sydney",
  "/services/consumer-mains-sydney",
  "/services/data-cabling-electrician-sydney",
  "/services/defect-notice-repairs-sydney",
  "/services/disconnect-reconnect-electrician-sydney",
  "/services/metering-services-sydney",
  "/services/overhead-service-lines-sydney",
  "/services/phone-line-electrician-sydney",
  "/services/point-of-attachment-repairs-sydney",
  "/services/private-power-pole-sydney",
  "/services/smart-meter-electrician-sydney",
  "/services/split-system-air-conditioning-sydney",
  "/services/underground-service-mains-sydney",
  "/solar-batteries",
] as const;

export const phase3e2ConsolidationPairs = [
  { routes: ["/services/electrical-testing-tagging-reports-sydney", "/services/testing-and-tagging-sydney"], recommendation: "retain_both", hold: "Confirm the actual property-report and portable-equipment testing deliverables; no whole-property certification is implied by a tag." },
  { routes: ["/services/intercom-access-control-electrician-sydney", "/services/intercom-installation-sydney"], recommendation: "needs_search_console_evidence", hold: "Confirm security authority, actual installation/commissioning scope and legitimate query demand before a consolidation decision." },
  { routes: ["/services/tv-antenna-wall-cabling-sydney", "/services/tv-points-antenna-electrician-sydney"], recommendation: "consolidate_later", hold: "Review actual media/outlet scope, demand and backlinks before selecting any future surviving URL or redirect. No reception or rooftop capability is inferred." },
] as const;

export const phase3e2SelectedRoutes: readonly string[] = [
  ...phase3e2SpecialistRoutes,
  ...phase3e2ConsolidationPairs.flatMap(pair => pair.routes),
].sort();

export function phase3e2EvidenceHolds(route: string): string[] {
  if (!phase3e2SelectedRoutes.includes(route)) throw new Error(`Route outside Phase 3E2: ${route}`);
  const holds = ["Owner documentary evidence remains required for current licence scope and any specialist authorisation relevant to the accepted work."];
  if (route === "/solar-batteries") holds.push("Confirm system-specific solar/battery accreditation, design/install/commissioning scope and any incentive or network requirements; no rebate, savings or backup guarantee.");
  else if (route.includes("air-conditioning")) holds.push("Confirm electrical versus refrigerant work, NSW air-conditioning scope and ARC permissions for the actual equipment; no unrestricted refrigeration inference.");
  else if (/cctv|intercom/.test(route)) holds.push("Security-equipment authority and applicable business licensing arrangement are unverified; electrical/cabling statements do not establish permission for security installation or advice.");
  else if (/data-cabling|phone-line|tv-/.test(route)) holds.push("Confirm current cabling registration and additional competencies; carrier, rooftop antenna, mounting and reception work are not inferred.");
  else if (!/testing/.test(route)) holds.push("Confirm the permitted service activity, current network authorisation, asset boundary and any metering-provider involvement before work is accepted.");
  const pair = phase3e2ConsolidationPairs.find(pair => (pair.routes as readonly string[]).includes(route));
  if (pair) holds.push(pair.hold);
  return holds;
}
