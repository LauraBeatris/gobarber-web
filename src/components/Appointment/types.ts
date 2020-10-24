import { Appointment, User } from "shared/types/apiSchema";

export interface AppointmentProps extends AppointmentContainerProps {
  date: Appointment["date"];
  type: Appointment["type"];
  isPast?: Appointment["isPast"];
  showDate?: boolean;
  avatarUrl: User["avatar_url"];
  customerName: User["name"];
}

export interface AppointmentContainerProps {
  showLateralBorder?: boolean;
  isPast?: AppointmentProps["isPast"];
}
