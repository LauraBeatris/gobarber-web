import { useMemo } from "react";
import {
  isEqual,
  isAfter,
  getYear,
  getDate,
  isBefore,
  parseISO,
} from "date-fns";
import { useQuery } from "react-query";
import { AxiosError } from "axios";

import { Appointment } from "shared/types/apiSchema";
import api from "settings/api";
import getMonth from "utils/months";

import { UseAppointmentsPayload } from "./types";

const getNoonDate = (appointmentDate: Date): Date => (
  new Date(
    getYear(appointmentDate),
    getMonth(appointmentDate) - 1,
    getDate(appointmentDate), 12, 0, 0,
  )
);

const fetchAppointments = (
  _queryKey: string,
  selectedDate: string,
): Promise<Appointment[]> => {
  const parsedSelectedDate = parseISO(selectedDate);

  return (
    api.get<Appointment[], {
      data: Appointment[];
    }>("/appointments/me", {
      params: {
        day: getDate(parsedSelectedDate),
        year: getYear(parsedSelectedDate),
        month: getMonth(parsedSelectedDate),
      },
    }).then(response => response.data)
  );
};

/**
 * Handles the queries and mutations related to appointments
 */
const useAppointments = (selectedDate: Date): UseAppointmentsPayload => {
  const { data: appointments, isLoading } = useQuery<Appointment[], AxiosError>(["appointments", selectedDate], fetchAppointments);

  const nextAppointment = useMemo(() => (
    (appointments ?? []).find(appointment => (
      isAfter(parseISO(appointment?.date), new Date())
    ))
  ), [appointments]);

  const morningAppointments = useMemo(() => (
    (appointments ?? []).filter(appointment => {
      const appointmentDate = parseISO(appointment.date);

      return (
        isBefore(appointmentDate, getNoonDate(appointmentDate))
      );
    })
  ), [appointments]);

  const eveningAppointments = useMemo(() => (
    (appointments ?? []).filter(appointment => {
      const appointmentDate = parseISO(appointment.date);

      return (
        isAfter(appointmentDate, getNoonDate(appointmentDate))
        || isEqual(appointmentDate, getNoonDate(appointmentDate))
      );
    })
  ), [appointments]);

  const payload = useMemo<UseAppointmentsPayload>(() => ({
    isLoading,
    nextAppointment,
    morningAppointments,
    eveningAppointments,
  }), [
    isLoading,
    nextAppointment,
    morningAppointments,
    eveningAppointments,
  ]);

  return payload;
};

export default useAppointments;
