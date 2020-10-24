import React from "react";
import { FiClock } from "react-icons/fi";
import { format, parseISO } from "date-fns";

import { AppointmentDateContainer } from "./styles";
import { AppointmentDateProps } from "./types";

const AppointmentDate: React.FC<AppointmentDateProps> = ({ date, isPast }) => {
  const formattedAppointmentDate = format(parseISO(date), "hh':'mm");

  return (
    <AppointmentDateContainer isPast={isPast}>
      <FiClock />

      {formattedAppointmentDate}
    </AppointmentDateContainer>
  );
};

export default AppointmentDate;
