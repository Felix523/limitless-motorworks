import { ComboboxItem } from "@mantine/core";

export interface BookingForm {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  year?: string | number;
  make?: string;
  model?: string;
  service?: ComboboxItem | null;
  description?: string;
}

export interface Email {
  recipientEmail?: string;
  subject?: string;
  message?: string;
}

export type Schedule = {
  // bookedSlots: Record<string, string[]>;
  onSubmit: (dateTime: Date) => void;
};
