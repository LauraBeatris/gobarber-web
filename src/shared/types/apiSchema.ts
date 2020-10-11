export interface User {
  id: number;
  name: string;
  avatar_url: string;
}

export interface Appointment {
  id: string;
  name: string;
  date: string;
  customer: User;
}

export interface ProviderMonthAvailability {
  day: number;
  available: boolean;
}
