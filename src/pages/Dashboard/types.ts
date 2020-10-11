import { UseAppointmentsPayload } from "hooks/useAppointments/types";
import { UseProviderMonthAvailabilityPayload } from "hooks/useProviderMonthAvailability/types";

export interface DashboardContentProps {
  selectedDay: Date;
  currentMonth: Date;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  nextAppointment: UseAppointmentsPayload["nextAppointment"];
  eveningAppointments: UseAppointmentsPayload["eveningAppointments"];
  morningAppointments: UseAppointmentsPayload["morningAppointments"];
  providerMonthAvailabilityDates: UseProviderMonthAvailabilityPayload["providerMonthAvailabilityDates"];
}
