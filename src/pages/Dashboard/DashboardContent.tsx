import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DayModifiers } from "react-day-picker";
import { format, isToday } from "date-fns";
import { GrCopy } from "react-icons/gr";

import getDateFnsLocale from "translations/dateFns";
import DashboardSection from "components/DashboardSection";
import Appointment from "components/Appointment";
import Calendar from "components/Calendar";
import { DAY_MONTH, WEEK_DAY } from "constants/dateFormats";
import colors from "styles/theme/colors";
import useShare from "hooks/useShare";
import AppLayout from "layouts/App";

import {
  Content,
  Schedule,
  NextAppointment,
  CalendarContainer,
} from "./styles";
import { DashboardContentProps } from "./types";

const DashboardContent: React.FC<DashboardContentProps> = ({
  selectedDay,
  currentMonth,
  setSelectedDay,
  setCurrentMonth,
  nextAppointment,
  eveningAppointments,
  morningAppointments,
  providerMonthAvailabilityDates,
}) => {
  const [t] = useTranslation();

  const share = useShare();

  const shareSchedule = useCallback(() => {
    share({
      url: window.location.href,
    });
  }, [share]);

  const handleDayClick = useCallback((day: Date, modifiers: DayModifiers) => {
    const isValidDay = !modifiers.disabled && modifiers.available;

    if (!isValidDay) {
      return;
    }

    setSelectedDay(day);
  }, [setSelectedDay]);

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
          <div>
            <h1>{t("dashboard.schedule")}</h1>

            <button
              title={t("buttons.copy")}
              type="button"
              onClick={shareSchedule}
            >
              <GrCopy color={colors.background} />
            </button>
          </div>

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

export default DashboardContent;
