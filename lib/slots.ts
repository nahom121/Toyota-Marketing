export type WorkshopDate = "October 18, 2026" | "October 21, 2026" | "October 25, 2026";

type WorkshopDateConfig = {
  value: WorkshopDate;
  dayLabel: string;
  shortLabel: string;
  // When set, this workshop only appears on the site / accepts new
  // bookings within this window. Both are checked against the current
  // time on every request, so nothing needs to be manually toggled at
  // the exact moment a workshop should open or close.
  visibleFrom?: number;
  visibleUntil?: number;
};

const ALL_WORKSHOP_DATES: WorkshopDateConfig[] = [
  {
    value: "October 18, 2026",
    dayLabel: "Sunday, October 18th",
    shortLabel: "Oct 18",
    // Taken off the site once the last (2pm) session has started — all
    // four sessions run their course by 3:00 PM CDT.
    visibleUntil: new Date("2026-10-18T20:00:00Z").getTime(),
  },
  {
    value: "October 21, 2026",
    dayLabel: "Wednesday, October 21st",
    shortLabel: "Oct 21",
    // Opened at 10:00 AM CDT on Oct 18; taken off the site once its last
    // (8pm) session has started — that class runs its course by 9:00 PM CDT.
    visibleFrom: new Date("2026-10-18T15:00:00Z").getTime(),
    visibleUntil: new Date("2026-10-22T02:00:00Z").getTime(),
  },
  {
    value: "October 25, 2026",
    dayLabel: "Sunday, October 25th",
    shortLabel: "Oct 25",
    // Opens at 10:00 AM CDT on Oct 18.
    visibleFrom: new Date("2026-10-18T15:00:00Z").getTime(),
  },
];

export function getVisibleWorkshopDates(now: number = Date.now()): { value: WorkshopDate; dayLabel: string; shortLabel: string }[] {
  return ALL_WORKSHOP_DATES.filter(
    (w) => (w.visibleFrom === undefined || now >= w.visibleFrom) && (w.visibleUntil === undefined || now < w.visibleUntil)
  );
}

export const SLOTS_BY_DATE: Record<WorkshopDate, string[]> = {
  "October 18, 2026": ["11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM"],
  "October 21, 2026": ["7:00 PM", "8:00 PM"],
  "October 25, 2026": ["10:30 AM", "11:30 AM", "12:30 PM", "1:30 PM"],
};

export const SLOT_CAPACITY = 30;

export const SLOT_CAPACITIES_BY_DATE: Record<WorkshopDate, Record<string, number>> = {
  "October 18, 2026": { "11:00 AM": 30, "12:00 PM": 30, "1:00 PM": 30, "2:00 PM": 30 },
  "October 21, 2026": { "7:00 PM": 30, "8:00 PM": 30 },
  "October 25, 2026": { "10:30 AM": 30, "11:30 AM": 30, "12:30 PM": 30, "1:30 PM": 30 },
};

const PRE_BEGINNER = {
  title: "Pre-Beginner",
  bullets: [
    "Have never skated before",
    "Cannot skate across the floor on your own",
    "Need to hold the wall or another person to skate or keep your balance",
  ],
};
const BEGINNER = {
  title: "Beginner",
  bullets: [
    "Can skate across the floor without holding the wall or another person",
    "Can pick up both feet while skating instead of walking/shuffling",
    "Can glide forward and keep your balance without assistance",
  ],
};
const INTERMEDIATE = {
  title: "Intermediate",
  bullets: [
    "Can comfortably make forward scissors/bubbles (circles with your feet) while moving",
    "Can glide on one foot for at least 5 seconds without putting your foot down",
    "Can comfortably complete at least one backward scissor/bubble on your own",
  ],
};
const ADVANCED = {
  title: "Advanced",
  bullets: [
    "Can comfortably skate backward across the floor using backward scissors/bubbles without falling",
    "Can squat all the way down into a cannonball while rolling and maintain your balance",
    "Can cross one foot over the other while skating forward around a circle without losing your balance",
  ],
};

export const SLOT_LEVELS_BY_DATE: Record<WorkshopDate, Record<string, { title: string; bullets: string[] }>> = {
  "October 18, 2026": {
    "11:00 AM": PRE_BEGINNER,
    "12:00 PM": BEGINNER,
    "1:00 PM": INTERMEDIATE,
    "2:00 PM": ADVANCED,
  },
  "October 21, 2026": {
    "7:00 PM": PRE_BEGINNER,
    "8:00 PM": BEGINNER,
  },
  "October 25, 2026": {
    "10:30 AM": PRE_BEGINNER,
    "11:30 AM": BEGINNER,
    "12:30 PM": INTERMEDIATE,
    "1:30 PM": ADVANCED,
  },
};

// Slot start times in UTC ms, Houston is CDT = UTC-5 through Nov 1, 2026.
// Used server-side to close registration the moment a class starts.
export const SLOT_START_UTC_MS_BY_DATE: Record<WorkshopDate, Record<string, number>> = {
  "October 18, 2026": {
    "11:00 AM": new Date("2026-10-18T16:00:00Z").getTime(),
    "12:00 PM": new Date("2026-10-18T17:00:00Z").getTime(),
    "1:00 PM": new Date("2026-10-18T18:00:00Z").getTime(),
    "2:00 PM": new Date("2026-10-18T19:00:00Z").getTime(),
  },
  "October 21, 2026": {
    "7:00 PM": new Date("2026-10-22T00:00:00Z").getTime(),
    "8:00 PM": new Date("2026-10-22T01:00:00Z").getTime(),
  },
  "October 25, 2026": {
    "10:30 AM": new Date("2026-10-25T15:30:00Z").getTime(),
    "11:30 AM": new Date("2026-10-25T16:30:00Z").getTime(),
    "12:30 PM": new Date("2026-10-25T17:30:00Z").getTime(),
    "1:30 PM": new Date("2026-10-25T18:30:00Z").getTime(),
  },
};

// SKATEHSP: 15% off, valid for either the Oct 21 or Oct 25 workshop (any
// session), good through 11:59 PM CDT on Oct 18 — the day it was announced.
export const DISCOUNT_CODES: Record<string, { percentOff: number; validDates: WorkshopDate[]; expiresAt: number }> = {
  SKATEHSP: {
    percentOff: 15,
    validDates: ["October 21, 2026", "October 25, 2026"],
    expiresAt: new Date("2026-10-19T04:59:00Z").getTime(),
  },
};

export const FORCE_SOLD_OUT = false;

// Coarse bound only, for limiting how much Stripe data gets pulled — exact
// classification of a sale is by matching metadata.date, not this cutoff.
export const ACTIVE_WORKSHOPS_START = new Date("2026-10-05T00:00:00Z").getTime() / 1000;
