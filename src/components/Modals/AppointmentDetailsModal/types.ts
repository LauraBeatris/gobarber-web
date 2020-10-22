import { AppointmentProps } from "components/Appointment/types";
import { ModalComponentProps } from "contexts/modal/types";

export type AppointmentDetailsProps = Omit<AppointmentProps, "showLateralBorder">;

export type AppointmentDetailsModalProps = ModalComponentProps<AppointmentDetailsProps>;
