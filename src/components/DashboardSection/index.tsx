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
      (appointments ?? []).map((_value, index: number) => (
        <DashboardSectionItem key={String(index)}>
          <AppointmentDate date={new Date()} />

          <Appointment
            name="Laura Beatris"
            avatar_url="https://avatars0.githubusercontent.com/u/48022589?s=460&u=6e0093b40a2ad5e8384ca214ee835859d03ebe2e&v=4"
          />
        </DashboardSectionItem>
      ))
    }
  </DashboardSectionContainer>
);

export default DashboardSection;
