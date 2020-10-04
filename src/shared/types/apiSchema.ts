export interface User {
  id: number;
  name: string;
  avatar_url: string;
}

export interface Appointment {
  name: string;
  date: Date;
  avatar_url: string;
}

export interface ProviderMonthAvailability {
  day: number;
  available: boolean;
}
