import React from "react";
import { useTranslation } from "react-i18next";
import { parseISO, formatDistance } from "date-fns";

import Avatar from "components/Avatar";
import { MAP_APPOINTMENT_TYPE } from "constants/appointments";

import { AppointmentDetailsModalProps } from "./types";
import { Container } from "./styles";

const AppointmentDetailsModal: React.FC<AppointmentDetailsModalProps> = ({
  title,
  componentProps: {
    customerName,
    avatarUrl,
    date,
    type,
  } = {},
}) => {
  const [t] = useTranslation();

  if (!date || !type) {
    return null;
  }

  const appointmentTypeText = MAP_APPOINTMENT_TYPE[type];
  const appontmentDateFormatted = formatDistance(parseISO(date), new Date(), {
    addSuffix: true,
  });

  return (
    <Container>
      <h1>{title}</h1>

      {
        !!customerName && (
          <Avatar name={customerName} avatarUrl={avatarUrl} />
        )
      }

      <h4>
        <strong>
          {t("appointment_details_modal.customer_name")}
          :
        </strong>
        {" "}
        {customerName}
      </h4>

      <h4>
        <strong>
          {t("appointment_details_modal.appointment_type")}
          :
        </strong>
        {" "}
        {appointmentTypeText}
      </h4>

      <h4>{appontmentDateFormatted}</h4>
    </Container>
  );
};

export default AppointmentDetailsModal;
