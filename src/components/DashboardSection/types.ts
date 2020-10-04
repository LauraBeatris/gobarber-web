import { Appointment } from "shared/types/apiSchema";

export interface DashboardSectionProps {
  title: string;
  appointments: Appointment[];
}
