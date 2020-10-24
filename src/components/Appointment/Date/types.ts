import { Appointment } from "shared/types/apiSchema";

export interface AppointmentDateProps {
  date: Appointment["date"];
  isPast?: Appointment["isPast"];
}

export interface AppointmentDateContainerProps {
  isPast: AppointmentDateProps["isPast"];
}
