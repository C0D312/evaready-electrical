import {
  AlertTriangle,
  BadgeCheck,
  Camera,
  ClipboardCheck,
  FileText,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { business } from "@/data/site";

type TrustProcessProofVariant =
  | "general"
  | "emergency"
  | "level2"
  | "defectNotice"
  | "switchboard"
  | "suburb";

type ProofItem = {
  title: string;
  text: string;
  icon: LucideIcon;
};

type ChecklistGroup = {
  title: string;
  items: string[];
};

type TrustProcessProofProps = {
  className?: string;
  compact?: boolean;
  locality?: string;
  serviceName?: string;
  variant?: TrustProcessProofVariant;
};

const baseProofItems: ProofItem[] = [
  {
    title: "Licence verification",
    text: `NSW Electrical Licence ${business.licence}, ABN ${business.abn}, Open Cabler registration number ${business.openCablerRegistration} and ARCtick ${business.arctickLicence} are shown clearly before you call or book.`,
    icon: BadgeCheck,
  },
  {
    title: "Emergency call triage",
    text: "Call first for power loss, burning smells, smoke, sparking, repeated tripping, unsafe wiring or urgent Level 2 issues.",
    icon: Phone,
  },
  {
    title: "Secure booking form",
    text: "The ServiceM8 booking form collects your address, contact details, job notes and photos so planned work can be reviewed clearly.",
    icon: ClipboardCheck,
  },
  {
    title: "Clear next steps",
    text: "Urgent faults start with the phone. Planned work is reviewed from the details you send before the next step is confirmed.",
    icon: ShieldCheck,
  },
];

const emergencyProofItems: ProofItem[] = [
  {
    title: "Call-first safety warning",
    text: "Keep clear of exposed wiring, wet fittings, smoke, burning smells, fallen lines and damaged switchboards. For life-threatening danger, call emergency services first.",
    icon: AlertTriangle,
  },
  {
    title: "What happens on the call",
    text: "Describe what has happened, your suburb, what is hot, wet, sparking, tripping or without power, and whether anyone is at risk.",
    icon: Phone,
  },
];

const level2ProofItems: ProofItem[] = [
  {
    title: business.level2Asp.shortDisplay,
    text: `${business.level2Asp.display}. Send notices, photos and paperwork so the job can be reviewed against the correct network and licence scope.`,
    icon: BadgeCheck,
  },
  {
    title: "Supply-side details",
    text: "Consumer mains, service equipment, metering, point of attachment, private pole and defect notice jobs need clear photos and site notes.",
    icon: FileText,
  },
];

const switchboardProofItems: ProofItem[] = [
  {
    title: "Switchboard quote clarity",
    text: "Send clear switchboard photos, tripping details, load plans or defect notices so the upgrade can be scoped before work starts.",
    icon: Camera,
  },
  {
    title: "Safety-first testing",
    text: "Burning smells, heat, buzzing, repeated tripping or damaged wiring should be checked before affected circuits are returned to normal use.",
    icon: Wrench,
  },
];

const suburbProofItems: ProofItem[] = baseProofItems.map((item) =>
  item.title === "Licence verification"
    ? {
        ...item,
        text: `NSW Electrical Licence ${business.licence} and ABN ${business.abn} are shown clearly before you call or book. Data, CCTV and refrigeration credentials are shown in the licence credential section where relevant.`,
      }
    : item,
);

const checklistGroupsByVariant: Record<TrustProcessProofVariant, ChecklistGroup[]> = {
  general: [
    {
      title: "Photos and documents to send",
      items: [
        "Suburb, address and best contact number",
        "Photos of the affected area, switchboard or equipment",
        "Short notes on what changed, when it happens and what is unsafe",
      ],
    },
    {
      title: "After you request a quote",
      items: [
        "Job details and photos are reviewed",
        "Urgent hazards are directed back to a phone call",
        "Clear next steps are confirmed before work starts",
      ],
    },
  ],
  emergency: [
    {
      title: "How emergency triage works",
      items: [
        "Call first and keep people away from the affected area",
        "Explain power loss, heat, smoke, sparking, water or tripping",
        "Follow safe phone guidance while attendance is arranged",
      ],
    },
    {
      title: "Do not touch",
      items: [
        "Exposed wiring, fallen lines or damaged service equipment",
        "Wet power points, switches, lights or appliances",
        "Hot, smoking, buzzing or burnt switchboards",
      ],
    },
  ],
  level2: [
    {
      title: "Level 2 document checklist",
      items: [
        "Defect notice photo, deadline and any retailer or network paperwork",
        "Switchboard, meter box, service equipment and consumer mains photos",
        "Point of attachment, private pole or overhead service photos if relevant",
      ],
    },
    {
      title: "Level 2 scope notes",
      items: [
        "Distributor and network attendance times sit with the relevant parties",
        "Work is scoped against the relevant network, licence and job requirements",
        "Unsafe supply-side faults should be discussed by phone first",
      ],
    },
  ],
  defectNotice: [
    {
      title: "Defect notice checklist",
      items: [
        "Photo of every page of the defect notice",
        "Deadline, site address, suburb and best contact person",
        "Switchboard, meter box and affected equipment photos",
      ],
    },
    {
      title: "Before work is booked",
      items: [
        "The notice is reviewed against the visible defect",
        "Photos help confirm the right next step",
        "Urgent hazards are handled by phone first",
      ],
    },
  ],
  switchboard: [
    {
      title: "Switchboard quote checklist",
      items: [
        "A clear photo of the whole switchboard",
        "Close photos of labels, breakers, fuses or burnt areas",
        "Notes about tripping, new loads, EV chargers or renovation plans",
      ],
    },
    {
      title: "Safety-first warnings",
      items: [
        "Do not remove covers or touch burnt wiring",
        "Call first if there is heat, buzzing, smoke or a burning smell",
        "Old fuses, overloaded circuits and defects should be checked before reuse",
      ],
    },
  ],
  suburb: [
    {
      title: "Local quote checklist",
      items: [
        "Suburb, postcode, address and access notes",
        "Photos of the switchboard, affected fitting or meter area",
        "Strata, tenant, parking or site contact details where relevant",
      ],
    },
    {
      title: "Clear next steps before work starts",
      items: [
        "Call first for unsafe faults",
        "Use the booking form for planned work and photos",
        "Level 2, switchboard and defect notice details are reviewed before booking",
      ],
    },
  ],
};

function getProofItems(variant: TrustProcessProofVariant) {
  if (variant === "emergency") {
    return [...baseProofItems, ...emergencyProofItems];
  }

  if (variant === "level2" || variant === "defectNotice") {
    return [...baseProofItems, ...level2ProofItems];
  }

  if (variant === "switchboard") {
    return [...baseProofItems, ...switchboardProofItems];
  }

  if (variant === "suburb") {
    return [
      ...suburbProofItems,
      {
        title: "Local job details",
        text: "Suburb, access, parking, strata entry, business hours and photos help Evaready review planned work across Sydney and surrounding regions.",
        icon: Camera,
      },
    ];
  }

  return baseProofItems;
}

function getHeading(variant: TrustProcessProofVariant, serviceName?: string, locality?: string) {
  if (variant === "emergency") {
    return "What happens when you call about an urgent electrical fault.";
  }

  if (variant === "level2") {
    return "Photos, notices and paperwork make Level 2 work clearer.";
  }

  if (variant === "defectNotice") {
    return "Send the defect notice before the next step is booked.";
  }

  if (variant === "switchboard") {
    return "Send switchboard details before planned upgrade work starts.";
  }

  if (variant === "suburb" && locality) {
    return `Clear electrical next steps for ${locality}.`;
  }

  if (serviceName) {
    return `How Evaready scopes ${serviceName.toLowerCase()}.`;
  }

  return "Licensed electrical help with clear next steps.";
}

function getIntro(variant: TrustProcessProofVariant, serviceName?: string, locality?: string) {
  if (variant === "emergency") {
    return "Emergency triage starts with a phone call. Planned follow-up work can then be reviewed from photos, job notes and access details once the immediate safety risk is clear.";
  }

  if (variant === "level2") {
    return "Level 2 enquiries can involve consumer mains, metering, defect notices, service equipment, point of attachment and supply-side issues. The right documents help keep the process practical and compliance-safe.";
  }

  if (variant === "defectNotice") {
    return "A defect notice should be reviewed with the visible notice, site photos, suburb, deadline and any retailer or network paperwork before planned repair work is booked.";
  }

  if (variant === "switchboard") {
    return "Switchboard work is easier to quote when the existing board, protection, labels, defects and new load plans are visible before the job starts.";
  }

  if (variant === "suburb" && locality) {
    return `For ${locality}, call first for unsafe faults or use the secure booking form to send photos, access notes and job details for planned electrical work.`;
  }

  if (serviceName) {
    return `For ${serviceName.toLowerCase()} across Sydney and surrounding regions, Evaready uses photos, job notes and call-first safety triage to confirm the clearest next step.`;
  }

  return "Call first for urgent faults, or send photos and documents through the secure booking form for planned electrical work across Sydney and surrounding regions.";
}

export function TrustProcessProof({
  className = "",
  compact = false,
  locality,
  serviceName,
  variant = "general",
}: TrustProcessProofProps) {
  const proofItems = getProofItems(variant);
  const checklistGroups = checklistGroupsByVariant[variant];

  return (
    <section
      className={`trust-process-proof bg-[#020814] py-12 text-white sm:py-16 ${className}`}
      aria-labelledby={`trust-process-proof-${variant}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
              Trust and process
            </p>
            <h2
              id={`trust-process-proof-${variant}`}
              className={`${compact ? "mt-3 text-3xl sm:text-4xl" : "mt-3 text-3xl sm:text-5xl"} max-w-4xl font-black leading-tight tracking-tight`}
            >
              {getHeading(variant, serviceName, locality)}
            </h2>
            <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-slate-300 sm:text-lg">
              {getIntro(variant, serviceName, locality)}
            </p>
            <p className="mt-5 rounded-2xl border border-red-300/25 bg-red-500/10 p-4 text-sm font-bold leading-6 text-red-50">
              For smoke, sparking, burning smells, power loss, wet electrical
              equipment or unsafe wiring, call first. For life-threatening
              danger, keep clear and call emergency services first.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              {proofItems.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-cyan-300/18 bg-white/[0.055] p-5 shadow-xl shadow-slate-950/18 ring-1 ring-white/5"
                  >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-300/12 text-cyan-200">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-lg font-black leading-6 text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-300">
                      {item.text}
                    </p>
                  </article>
                );
              })}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {checklistGroups.map((group) => (
                <article
                  key={group.title}
                  className="rounded-2xl border border-cyan-300/18 bg-[linear-gradient(135deg,rgba(7,18,38,0.92),rgba(8,35,65,0.78))] p-5 shadow-xl shadow-slate-950/18"
                >
                  <h3 className="text-lg font-black text-white">
                    {group.title}
                  </h3>
                  <ul className="mt-4 grid gap-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-slate-300">
                        <ClipboardCheck
                          className="mt-0.5 h-5 w-5 shrink-0 text-cyan-200"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
