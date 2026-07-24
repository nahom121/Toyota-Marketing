export const SLOTS = ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM"] as const;
export type Slot = typeof SLOTS[number];
export const SLOT_CAPACITY = 30;
