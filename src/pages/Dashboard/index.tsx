import React from "react";
import { useTranslation } from "react-i18next";
import { FiClock } from "react-icons/fi";

import AppLayout from "layouts/App";

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

          {/* TODO -> Do not show if there aren't next appointments */}
          <NextAppointment>
            <h4>{t("dashboard.next_appointments")}</h4>

            <div>
              <img src="https://avatars0.githubusercontent.com/u/48022589?s=460&u=6e0093b40a2ad5e8384ca214ee835859d03ebe2e&v=4" alt="Laura" />
              <strong>Laura Beatris</strong>

              <span>
                <FiClock />

                08:00
              </span>
            </div>
          </NextAppointment>
        </Schedule>

        <Calendar />
      </Content>
    </AppLayout>
  );
};

export default Dashboard;
