import React from "react";

import getUserImagePlaceholder from "utils/getUserImagePlaceholder";
import Image from "components/Image";

import { AppointmentProps } from "./types";
import { AppointmentContainer } from "./styles";
import AppointmentDate from "./Date";

const Appointment: React.FC<AppointmentProps> = ({
  name,
  date,
  avatar_url,
  showLateralBorder,
}) => (
  <AppointmentContainer showLateralBorder={!!showLateralBorder}>
    <Image
      src={avatar_url}
      fallbackSrc={getUserImagePlaceholder("Laura")}
    />

    <strong>{name}</strong>

    {
      date && (
        <AppointmentDate date={date} />
      )
    }
  </AppointmentContainer>
);

export default Appointment;
