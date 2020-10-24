import React from "react";

import Appointment from "components/Appointment";

import { Container } from "./styles";

export default {
  title: "Appointment",
  component: Appointment,
};

export const AppointmentWithoutDate: React.FC = () => (
  <Container>
    <Appointment
      avatarUrl="https://avatars0.githubusercontent.com/u/48022589?s=460&u=6e0093b40a2ad5e8384ca214ee835859d03ebe2e&v=4"
      customerName="Laura Beatris"
    />
  </Container>
);

export const AppointmentWithLateralBorder: React.FC = () => (
  <Container>
    <Appointment
      avatarUrl="https://avatars0.githubusercontent.com/u/48022589?s=460&u=6e0093b40a2ad5e8384ca214ee835859d03ebe2e&v=4"
      customerName="Laura Beatris"
      showLateralBorder
    />
  </Container>
);

export const AppointmentWithDate: React.FC = () => (
  <Container>
    <Appointment
      date="2020-10-22T12:00:00.000Z"
      avatarUrl="https://avatars0.githubusercontent.com/u/48022589?s=460&u=6e0093b40a2ad5e8384ca214ee835859d03ebe2e&v=4"
      customerName="Laura Beatris"
      showLateralBorder
    />
  </Container>
);

export const AppointmentOnAPastDate: React.FC = () => (
  <Container>
    <Appointment
      date="2020-10-22T12:00:00.000Z"
      isPast
      avatarUrl="https://avatars0.githubusercontent.com/u/48022589?s=460&u=6e0093b40a2ad5e8384ca214ee835859d03ebe2e&v=4"
      customerName="Laura Beatris"
      showLateralBorder
    />
  </Container>
);
