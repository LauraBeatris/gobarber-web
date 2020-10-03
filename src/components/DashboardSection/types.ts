export interface Appointment {
  name: string;
  date: Date;
  avatar_url: string;
}

export interface DashboardSectionProps {
  title: string;
  appointments: Appointment[];
}
