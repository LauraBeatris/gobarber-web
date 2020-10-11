import React from "react";

import { DashboardSectionProps } from "components/DashboardSection/types";
import { DashboardSectionContainer, DashboardSectionItem } from "components/DashboardSection/styles";
import Appointment from "components/Appointment";
import AppointmentDate from "components/Appointment/Date";

const DashboardSection: React.FC<DashboardSectionProps> = ({
  title,
  appointments,
}) => (
  <DashboardSectionContainer>
    <strong>{title}</strong>

    {
      (appointments ?? []).map((appointment) => (
        <DashboardSectionItem key={appointment.id}>
          <AppointmentDate date={appointment.date} />

          <Appointment
            name={appointment.customer.name}
            avatar_url={appointment.customer.avatar_url}
          />
        </DashboardSectionItem>
      ))
    }
  </DashboardSectionContainer>
);

export default DashboardSection;
