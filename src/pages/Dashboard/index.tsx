import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
} from "react";
import { useTranslation } from "react-i18next";
import { DayModifiers } from "react-day-picker";
import {
  format,
  getMonth,
  getYear,
  isToday,
  startOfTomorrow,
} from "date-fns";
import Lottie from "react-lottie";
import { FiArrowRight } from "react-icons/fi";

import getDateFnsLocale from "translations/dateFns";
import animationData from "assets/lotties/closed.json";
import api from "settings/api";
import DashboardSection from "components/DashboardSection";
import Appointment from "components/Appointment";
import AppLayout from "layouts/App";
import Calendar from "components/Calendar";
import { useAuthState } from "contexts/auth/AuthContext";
import { useToastsDispatch } from "contexts/toasts/ToastsContext";
import { ProviderMonthAvailability } from "shared/types/apiSchema";
import { getProviderMonthAvailableDates, getProviderMonthUnavailableDates } from "utils/providerMonthAvailability";
import { getLottieDefaultOptions } from "settings/lottie";
import getIsBusinessOpen from "utils/getIsBusinessOpen";

import {
  Content,
  Schedule,
  NextAppointment,
  BusinessClosedContainer,
  CalendarContainer,
} from "./styles";

const lottieOptions = getLottieDefaultOptions(animationData);

const Dashboard: React.FC = () => {
  const [t] = useTranslation();
  const [isBusinessOpen, setIsBusinessOpen] = useState(() => getIsBusinessOpen());

  const [selectedDay, setSelectedDay] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [
    providerMonthAvailability,
    setProviderMonthAvailability,
  ] = useState<ProviderMonthAvailability[]>([]);

  const { user } = useAuthState();
  const { addToast } = useToastsDispatch();

  const handleDayClick = useCallback((day: Date, modifiers: DayModifiers) => {
    const isValidDay = !modifiers.disabled && modifiers.available;

    if (!isValidDay) {
      return;
    }

    setSelectedDay(day);
  }, []);

  const unavailableDates = useMemo(() => (
    getProviderMonthUnavailableDates({
      providerMonthAvailability,
      currentMonth,
    })
  ), [
    providerMonthAvailability,
    currentMonth,
  ]);

  const calendarModifiers = useMemo(() => ({
    available: getProviderMonthAvailableDates({
      providerMonthAvailability,
      currentMonth,
    }),
    unavailable: unavailableDates,
  }), [
    providerMonthAvailability,
    unavailableDates,
    currentMonth,
  ]);

  const fetchMonthAvailability = useCallback(() => {
    api.get(`/providers/${user.id}/month-availability`, {
      params: {
        year: getYear(currentMonth),
        month: getMonth(currentMonth) + 1,
      },
    }).then((response) => setProviderMonthAvailability(response?.data))
      .catch((error) => {
        addToast({
          type: "error",
          title: error?.message,
        });
      });
  }, [
    user.id,
    addToast,
    currentMonth,
  ]);

  const handleTomorrowAppointments = useCallback(() => {
    setSelectedDay(startOfTomorrow());

    setIsBusinessOpen(true);
  }, []);

  const calendarResult = useMemo(() => {
    const today = isToday(selectedDay) && t("dashboard.today");

    const day = format(selectedDay, "do MMMM", {
      locale: getDateFnsLocale(),
    });

    const weekDay = format(selectedDay, "EEEE", {
      locale: getDateFnsLocale(),
    });

    return {
      day,
      today,
      weekDay,
    };
  }, [selectedDay, t]);

  useEffect(() => {
    fetchMonthAvailability();
  }, [fetchMonthAvailability]);

  return (
    <AppLayout>
      <Content>
        {
          isBusinessOpen ? (
            <>
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
                  month={currentMonth}
                  modifiers={calendarModifiers}
                  onDayClick={handleDayClick}
                  disabledDays={unavailableDates}
                  selectedDays={selectedDay}
                  onMonthChange={setCurrentMonth}
                />
              </CalendarContainer>
            </>
          ) : (
            <BusinessClosedContainer>
              <h1>The business is closed</h1>
              <button
                type="button"
                onClick={handleTomorrowAppointments}
              >
                {t("dashboard.click_here_to_see_the_appointments_for_tomorrow")}

                <FiArrowRight />
              </button>

              <Lottie options={lottieOptions} />
            </BusinessClosedContainer>
          )
        }
      </Content>
    </AppLayout>
  );
};

export default Dashboard;
