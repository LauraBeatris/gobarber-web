import React from "react";
import { useTranslation } from "react-i18next";

import { DashboardSectionProps } from "components/DashboardSection/types";
import { DashboardSectionContainer, DashboardSectionItem } from "components/DashboardSection/styles";
import Appointment from "components/Appointment";
import AppointmentDate from "components/Appointment/Date";

const DashboardSection: React.FC<DashboardSectionProps> = ({
  title,
  appointments,
}) => {
  const [t] = useTranslation();

  return (
    <DashboardSectionContainer>
      <strong>{title}</strong>

      {
        (appointments ?? []).length > 0 ? (appointments.map((appointment) => (
          <DashboardSectionItem key={appointment.id}>
            <AppointmentDate date={appointment.date} />

            <Appointment
              type={appointment.type}
              date={appointment.date}
              isPast={appointment.isPast}
              avatarUrl={appointment.customer.avatar_url}
              customerName={appointment.customer.name}
            />
          </DashboardSectionItem>
        ))) : (
          <p>{t("dashboard.there_are_no_appointments_in_that_period")}</p>
        )
      }
    </DashboardSectionContainer>
  );
};

export default DashboardSection;
