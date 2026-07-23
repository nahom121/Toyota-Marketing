export const SLOTS = ["7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"] as const;
export type Slot = typeof SLOTS[number];
export const SLOT_CAPACITY = 30;
