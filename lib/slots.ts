export type WorkshopDate = "October 11, 2026" | "October 14, 2026";

export const WORKSHOP_DATES: { value: WorkshopDate; dayLabel: string; shortLabel: string }[] = [
  { value: "October 11, 2026", dayLabel: "Sunday, October 11th", shortLabel: "Oct 11" },
  { value: "October 14, 2026", dayLabel: "Wednesday, October 14th", shortLabel: "Oct 14" },
];

export const SLOTS_BY_DATE: Record<WorkshopDate, string[]> = {
  "October 11, 2026": ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM"],
  "October 14, 2026": ["6:30 PM", "7:30 PM"],
};

export const SLOT_CAPACITY = 30;

export const SLOT_CAPACITIES_BY_DATE: Record<WorkshopDate, Record<string, number>> = {
  "October 11, 2026": { "10:00 AM": 30, "11:00 AM": 30, "12:00 PM": 30, "1:00 PM": 30 },
  "October 14, 2026": { "6:30 PM": 30, "7:30 PM": 30 },
};

export const SLOT_LEVELS_BY_DATE: Record<WorkshopDate, Record<string, { title: string; bullets: string[] }>> = {
  "October 11, 2026": {
    "10:00 AM": {
      title: "Pre-Beginner",
      bullets: [
        "Have never skated before",
        "Cannot skate across the floor on your own",
        "Need to hold the wall or another person to skate or keep your balance",
      ],
    },
    "11:00 AM": {
      title: "Beginner",
      bullets: [
        "Can skate across the floor without holding the wall or another person",
        "Can pick up both feet while skating instead of walking/shuffling",
        "Can glide forward and keep your balance without assistance",
      ],
    },
    "12:00 PM": {
      title: "Intermediate",
      bullets: [
        "Can comfortably make forward scissors/bubbles (circles with your feet) while moving",
        "Can glide on one foot for at least 5 seconds without putting your foot down",
        "Can comfortably complete at least one backward scissor/bubble on your own",
      ],
    },
    "1:00 PM": {
      title: "Advanced",
      bullets: [
        "Can comfortably skate backward across the floor using backward scissors/bubbles without falling",
        "Can squat all the way down into a cannonball while rolling and maintain your balance",
        "Can cross one foot over the other while skating forward around a circle without losing your balance",
      ],
    },
  },
  "October 14, 2026": {
    "6:30 PM": {
      title: "Pre-Beginner",
      bullets: [
        "Have never skated before",
        "Cannot skate across the floor on your own",
        "Need to hold the wall or another person to skate or keep your balance",
      ],
    },
    "7:30 PM": {
      title: "Beginner",
      bullets: [
        "Can skate across the floor without holding the wall or another person",
        "Can pick up both feet while skating instead of walking/shuffling",
        "Can glide forward and keep your balance without assistance",
      ],
    },
  },
};

// Slot start times in UTC ms, Houston is CDT = UTC-5 through Nov 1, 2026.
// Used server-side to close registration the moment a class starts.
export const SLOT_START_UTC_MS_BY_DATE: Record<WorkshopDate, Record<string, number>> = {
  "October 11, 2026": {
    "10:00 AM": new Date("2026-10-11T15:00:00Z").getTime(),
    "11:00 AM": new Date("2026-10-11T16:00:00Z").getTime(),
    "12:00 PM": new Date("2026-10-11T17:00:00Z").getTime(),
    "1:00 PM": new Date("2026-10-11T18:00:00Z").getTime(),
  },
  "October 14, 2026": {
    "6:30 PM": new Date("2026-10-14T23:30:00Z").getTime(),
    "7:30 PM": new Date("2026-10-15T00:30:00Z").getTime(),
  },
};

export const FORCE_SOLD_OUT = false;

// Coarse bound only, for limiting how much Stripe data gets pulled — exact
// classification of a sale is by matching metadata.date, not this cutoff.
export const ACTIVE_WORKSHOPS_START = new Date("2026-10-05T00:00:00Z").getTime() / 1000;
