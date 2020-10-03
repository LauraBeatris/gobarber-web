import { User } from "contexts/auth/types";

export interface AppointmentContainerProps {
  showLateralBorder?: boolean;
}

export interface AppointmentProps extends AppointmentContainerProps {
  name: User["name"];
  date?: Date;
  avatar_url: User["avatar_url"];
}
