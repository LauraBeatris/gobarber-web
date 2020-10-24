import { Appointment, User } from "shared/types/apiSchema";

export interface AppointmentProps extends AppointmentContainerProps {
  date?: Appointment["date"];
  isPast?: Appointment["isPast"];
  avatarUrl: User["avatar_url"];
  customerName: User["name"];
}

export interface AppointmentContainerProps {
  showLateralBorder?: boolean;
  isPast?: AppointmentProps["isPast"];
}
