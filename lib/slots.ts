export const SLOTS = ["1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"] as const;
export type Slot = typeof SLOTS[number];
export const SLOT_CAPACITY = 30;
export const SLOT_CAPACITIES: Record<Slot, number> = {
  "1:00 PM": 30,
  "2:00 PM": 30,
  "3:00 PM": 30,
  "4:00 PM": 30,
};
export const FORCE_SOLD_OUT = false;
export const WORKSHOP3_START = new Date("2026-09-01T00:00:00Z").getTime() / 1000;

