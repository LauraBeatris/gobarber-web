import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { DayModifiers } from "react-day-picker";

import AppLayout from "layouts/App";
import Appointment from "components/Appointment";
import DashboardSection from "components/DashboardSection";
import Calendar from "components/Calendar";

import {
  Content,
  Schedule,
  NextAppointment,
  CalendarContainer,
} from "./styles";

const availability = {
  available: { daysOfWeek: [0, 1, 2] },
};

const Dashboard: React.FC = () => {
  const [t] = useTranslation();

  const [selectedDay, setSelectedDay] = useState(new Date());

  const handleDayClick = useCallback((day: Date, modifiers: DayModifiers) => {
    const isValidDay = !modifiers.disabled && modifiers.available;

    if (!isValidDay) {
      return;
    }

    setSelectedDay(day);
  }, []);

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

        <CalendarContainer>
          <Calendar
            /**
              TODO -> Create an utility function to return the availability
              calendar modifiers according to the API data
            */
            modifiers={availability}
            onDayClick={handleDayClick}
            selectedDays={selectedDay}
          />
        </CalendarContainer>
      </Content>
    </AppLayout>
  );
};

export default Dashboard;
