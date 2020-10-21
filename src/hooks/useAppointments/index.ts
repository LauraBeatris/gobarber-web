import {
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  isAfter,
  getYear,
  getDate,
  isBefore,
  parseISO,
} from "date-fns";
import { isEqual } from "date-fns/esm";

import { useToastsDispatch } from "contexts/toasts/ToastsContext";
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

/**
 * Handles the logic to fetch and format appointments
 */
const useAppointments = (selectedDate: Date): UseAppointmentsPayload => {
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const { addToast } = useToastsDispatch();

  const fetchAppointments = useCallback(() => {
    setLoading(true);

    if (!selectedDate) {
      return;
    }

    api.get<Appointment[]>("/appointments/me", {
      params: {
        day: getDate(selectedDate),
        year: getYear(selectedDate),
        month: getMonth(selectedDate),
      },
    })
      .then(response => {
        setAppointments(response?.data);
      })
      .catch(error => {
        addToast({
          type: "error",
          title: error?.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [addToast, selectedDate]);

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

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const payload = useMemo<UseAppointmentsPayload>(() => ({
    loading,
    nextAppointment,
    morningAppointments,
    eveningAppointments,
  }), [
    loading,
    nextAppointment,
    morningAppointments,
    eveningAppointments,
  ]);

  return payload;
};

export default useAppointments;
