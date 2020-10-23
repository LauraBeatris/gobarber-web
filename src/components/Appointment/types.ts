import { Appointment, User } from "shared/types/apiSchema";

export interface AppointmentContainerProps {
  showLateralBorder?: boolean;
}

export interface AppointmentProps extends AppointmentContainerProps {
  date?: Appointment["date"];
  avatar_url: User["avatar_url"];
  customerName: User["name"];
}
