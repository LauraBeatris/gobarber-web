import React, { useState } from "react";
import Lottie from "react-lottie";
import { useTranslation } from "react-i18next";

import animationData from "assets/lotties/calendar.json";
import useAppointments from "hooks/useAppointments";
import withBusinessHourRange from "hocs/withBusinessHourRange";
import useLoadingDelay from "hooks/useLoadingDelay";
import { getLottieDefaultOptions } from "settings/lottie";
import { useProviderMonthAvailability } from "hooks/useProviderMonthAvailability";

import { ProviderMonthAvailabilityLoadingContainer } from "./styles";
import DashboardContent from "./DashboardContent";

const lottieOptions = getLottieDefaultOptions(animationData);

const DashboardContainer: React.FC = () => {
  const [t] = useTranslation();

  const [selectedDay, setSelectedDay] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const {
    providerMonthAvailabilityDates,
    loadingProviderMonthAvailability,
  } = useProviderMonthAvailability(currentMonth);

  const {
    nextAppointment,
    eveningAppointments,
    morningAppointments,
  } = useAppointments(selectedDay);

  const loading = useLoadingDelay(loadingProviderMonthAvailability);

  if (loading) {
    return (
      <ProviderMonthAvailabilityLoadingContainer>
        <Lottie options={lottieOptions} />

        <p>{t("dashboard.verifying_your_schedule_availability")}</p>
      </ProviderMonthAvailabilityLoadingContainer>
    );
  }

  return (
    <DashboardContent
      selectedDay={selectedDay}
      currentMonth={currentMonth}
      setSelectedDay={setSelectedDay}
      setCurrentMonth={setCurrentMonth}
      nextAppointment={nextAppointment}
      eveningAppointments={eveningAppointments}
      morningAppointments={morningAppointments}
      providerMonthAvailabilityDates={providerMonthAvailabilityDates}
    />
  );
};

export default withBusinessHourRange(DashboardContainer);
