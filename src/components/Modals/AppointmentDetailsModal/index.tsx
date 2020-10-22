import React from "react";

import { AppointmentDetailsModalProps } from "./types";
import { Container } from "./styles";

const AppointmentDetailsModal: React.FC<AppointmentDetailsModalProps> = ({
  componentProps: {
    name,
  } = {},
}) => (
  <Container>
    <h1>{name}</h1>
  </Container>
);

export default AppointmentDetailsModal;
