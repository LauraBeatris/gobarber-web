export interface User {
  id: number;
  name: string;
  avatar_url?: string;
}

export enum AppointmentType {
  "HAIR_CARE" = "HAIR_CARE",
  "CLASSIC_SHAVING" = "CLASSIC_SHAVING",
  "HAIR_WASHING" = "HAIR_WASHING",
}

export interface Appointment {
  id: string;
  date: string;
  type: AppointmentType;
  isPast: boolean;
  customer: User;
}

export interface ProviderMonthAvailability {
  day: number;
  isPast: boolean;
  available: boolean;
}

export interface Notification {
  id: string;
  read: boolean;
  content: string;
  created_at: string;
}
