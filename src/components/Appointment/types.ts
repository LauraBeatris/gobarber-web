import { Appointment, User } from "shared/types/apiSchema";

export interface AppointmentContainerProps {
  showLateralBorder?: boolean;
}

export interface AppointmentProps extends AppointmentContainerProps {
  name: User["name"];
  date?: Appointment["date"];
  avatar_url: User["avatar_url"];
}
