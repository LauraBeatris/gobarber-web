import React, {
  useCallback,
  useState,
  useMemo,
} from "react";
import { useTranslation } from "react-i18next";
import { DayModifiers } from "react-day-picker";
import { format, isToday } from "date-fns";

import getDateFnsLocale from "translations/dateFns";
import DashboardSection from "components/DashboardSection";
import Appointment from "components/Appointment";
import AppLayout from "layouts/App";
import Calendar from "components/Calendar";
import useAppointments from "hooks/useAppointments";
import { useProviderMonthAvailability } from "hooks/useProviderMonthAvailability";
import { DAY_MONTH, WEEK_DAY } from "constants/dateFormats";
import withBusinessHourRange from "hocs/withBusinessHourRange";

import {
  Content,
  Schedule,
  NextAppointment,
  CalendarContainer,
} from "./styles";

const Dashboard: React.FC = () => {
  const [t] = useTranslation();

  const [selectedDay, setSelectedDay] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { providerMonthAvailabilityDates } = useProviderMonthAvailability(currentMonth);
  const {
    nextAppointment,
    eveningAppointments,
    morningAppointments,
  } = useAppointments(selectedDay);

  const handleDayClick = useCallback((day: Date, modifiers: DayModifiers) => {
    const isValidDay = !modifiers.disabled && modifiers.available;

    if (!isValidDay) {
      return;
    }

    setSelectedDay(day);
  }, []);

  const calendarModifiers = useMemo(() => ({
    available: providerMonthAvailabilityDates.available,
    unavailable: providerMonthAvailabilityDates.unavailable,
  }), [providerMonthAvailabilityDates]);

  const calendarResult = useMemo(() => {
    const today = isToday(selectedDay) && t("dashboard.today");

    const day = format(selectedDay, DAY_MONTH, {
      locale: getDateFnsLocale(),
    });

    const weekDay = format(selectedDay, WEEK_DAY, {
      locale: getDateFnsLocale(),
    });

    return {
      day,
      today,
      weekDay,
    };
  }, [
    t,
    selectedDay,
  ]);

  return (
    <AppLayout>
      <Content>
        <Schedule>
          <h1>{t("dashboard.schedule")}</h1>

          <p>
            {
              calendarResult.today && (
                <span>{calendarResult.today}</span>
              )
            }

            <span>{calendarResult.day}</span>

            <span>{calendarResult.weekDay}</span>
          </p>

          {
            nextAppointment && isToday(selectedDay) && (
              <NextAppointment>
                <h4>{t("dashboard.next_appointment")}</h4>

                <Appointment
                  name={nextAppointment?.customer?.name}
                  date={nextAppointment?.date}
                  avatar_url={nextAppointment?.customer?.avatar_url}
                  showLateralBorder
                />
              </NextAppointment>
            )
          }

          <DashboardSection
            title={t("dashboard.morning")}
            appointments={morningAppointments}
          />

          <DashboardSection
            title={t("dashboard.evening")}
            appointments={eveningAppointments}
          />
        </Schedule>

        <CalendarContainer>
          <Calendar
            month={currentMonth}
            modifiers={calendarModifiers}
            onDayClick={handleDayClick}
            disabledDays={providerMonthAvailabilityDates?.unavailable}
            selectedDays={selectedDay}
            onMonthChange={setCurrentMonth}
          />
        </CalendarContainer>
      </Content>
    </AppLayout>
  );
};

export default withBusinessHourRange(Dashboard);
