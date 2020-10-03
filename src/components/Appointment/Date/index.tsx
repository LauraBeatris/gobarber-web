import React from "react";
import { FiClock } from "react-icons/fi";

import { AppointmentDateContainer } from "./styles";
import { AppointmentDateProps } from "./types";

const AppointmentDate: React.FC<AppointmentDateProps> = () => (
  <AppointmentDateContainer>
    <FiClock />

    {/**
     * TODO -> Format date prop with the data from API
     */}
    08:00
  </AppointmentDateContainer>
);

export default AppointmentDate;
