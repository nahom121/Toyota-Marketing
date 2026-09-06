export const SLOTS = ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM"] as const;
export type Slot = typeof SLOTS[number];
export const SLOT_CAPACITY = 30;
export const SLOT_CAPACITIES: Record<Slot, number> = {
  "10:00 AM": 30,
  "11:00 AM": 30,
  "12:00 PM": 30,
  "1:00 PM": 30,
};
export const FORCE_SOLD_OUT = true;
export const WORKSHOP4_START = new Date("2026-09-07T00:00:00Z").getTime() / 1000;
