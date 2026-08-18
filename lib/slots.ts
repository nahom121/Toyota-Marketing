export const SLOTS = ["9:30 AM", "10:30 AM", "11:30 AM", "12:30 PM"] as const;
export type Slot = typeof SLOTS[number];
export const SLOT_CAPACITY = 30;
