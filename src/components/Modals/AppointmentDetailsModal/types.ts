import { AppointmentProps } from "components/Appointment/types";
import { ModalComponentProps } from "contexts/modal/types";

export type AppointmentDetailsModalProps = ModalComponentProps<
  Omit<AppointmentProps, "showLateralBorder">
>
