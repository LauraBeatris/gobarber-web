import { UseAppointmentsPayload } from "hooks/useAppointments/types";
import { SetFilter } from "hooks/useFilter/types";
import { UseProviderMonthAvailabilityPayload } from "hooks/useProviderMonthAvailability/types";

export interface DashboardContentProps {
  selectedDay: Date;
  currentMonth: Date;
  setSelectedDay: SetFilter<Date>;
  setCurrentMonth: SetFilter<Date>;
  nextAppointment: UseAppointmentsPayload["nextAppointment"];
  eveningAppointments: UseAppointmentsPayload["eveningAppointments"];
  morningAppointments: UseAppointmentsPayload["morningAppointments"];
  isLoadingAvailability: boolean;
  isLoadingAppointments: boolean;
  providerMonthAvailabilityDates: UseProviderMonthAvailabilityPayload["providerMonthAvailabilityDates"];
}
