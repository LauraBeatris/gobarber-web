export interface User {
  id: number;
  name: string;
  avatar_url?: string;
}

export interface Appointment {
  id: string;
  date: string;
  isPast: boolean;
  customer: User;
}

export interface ProviderMonthAvailability {
  day: number;
  available: boolean;
}
