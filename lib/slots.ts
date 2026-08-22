export const SLOTS = ["9:30 AM", "10:30 AM", "11:30 AM", "12:30 PM"] as const;
export type Slot = typeof SLOTS[number];
export const SLOT_CAPACITY = 30; // default, used as fallback
export const SLOT_CAPACITIES: Record<Slot, number> = {
  "9:30 AM":  32,
  "10:30 AM": 36,
  "11:30 AM": 36,
  "12:30 PM": 31,
};
export const FORCE_SOLD_OUT = true;
