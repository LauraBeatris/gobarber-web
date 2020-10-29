import { Appointment } from "shared/types/apiSchema";

export interface UseAppointmentsPayload {
  morningAppointments: Appointment[];
  eveningAppointments: Appointment[];
  nextAppointment?: Appointment;
  isLoading: boolean;
}
