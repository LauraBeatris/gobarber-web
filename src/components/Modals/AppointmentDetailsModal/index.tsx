import React from "react";
import { useTranslation } from "react-i18next";

import { AppointmentDetailsModalProps } from "./types";
import { Container } from "./styles";

const AppointmentDetailsModal: React.FC<AppointmentDetailsModalProps> = ({
  title,
  componentProps: {
    customerName,
  } = {},
}) => {
  const [t] = useTranslation();

  const customerNameText = `${t("appointment_details_modal.customer_name")}: ${customerName}`;

  return (
    <Container>
      <h1>{title}</h1>

      <h4>{customerNameText}</h4>
    </Container>
  );
};

export default AppointmentDetailsModal;
