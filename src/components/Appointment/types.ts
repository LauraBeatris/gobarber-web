import { User } from "shared/types/apiSchema";

export interface AppointmentContainerProps {
  showLateralBorder?: boolean;
}

export interface AppointmentProps extends AppointmentContainerProps {
  name: User["name"];
  date?: Date;
  avatar_url: User["avatar_url"];
}
