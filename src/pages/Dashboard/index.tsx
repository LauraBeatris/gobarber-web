import React from "react";
import { useTranslation } from "react-i18next";

import AppLayout from "layouts/App";
import Appointment from "components/Appointment";
import DashboardSection from "components/DashboardSection";

import {
  Content,
  Schedule,
  Calendar,
  NextAppointment,
} from "./styles";

const Dashboard: React.FC = () => {
  const [t] = useTranslation();

  return (
    <AppLayout>
      <Content>
        <Schedule>
          <h1>{t("dashboard.schedule")}</h1>

          <p>
            <span>Hoje</span>

            <span>Dia 06</span>

            <span>Segunda-feira</span>
          </p>

          {/* TODO -> Do not show if there is a next appointment */}
          <NextAppointment>
            <h4>{t("dashboard.next_appointment")}</h4>

            <Appointment
              name="Laura Beatris"
              date={new Date()}
              avatar_url="https://avatars0.githubusercontent.com/u/48022589?s=460&u=6e0093b40a2ad5e8384ca214ee835859d03ebe2e&v=4"
              showLateralBorder
            />
          </NextAppointment>

          <DashboardSection
            title="Manhã"
            appointments={[
              {
                date: new Date(),
                name: "Laura",
                avatar_url: "https://avatars0.githubusercontent.com/u/48022589?s=460&u=6e0093b40a2ad5e8384ca214ee835859d03ebe2e&v=4",
              },
            ]}
          />

          <DashboardSection
            title="Tarde"
            appointments={[
              {
                date: new Date(),
                name: "Laura",
                avatar_url: "https://avatars0.githubusercontent.com/u/48022589?s=460&u=6e0093b40a2ad5e8384ca214ee835859d03ebe2e&v=4",
              },
            ]}
          />
        </Schedule>

        <Calendar />
      </Content>
    </AppLayout>
  );
};

export default Dashboard;
