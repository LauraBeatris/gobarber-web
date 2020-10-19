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

const noonDate = new Date(
  getYear(new Date()),
  getMonth(new Date()) - 1,
  getDate(new Date()), 12, 0, 0,
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
    (appointments ?? []).filter(appointment => (
      isBefore(parseISO(appointment?.date), noonDate)
    ))
  ), [appointments]);

  const eveningAppointments = useMemo(() => (
    (appointments ?? []).filter(appointment => (
      isAfter(parseISO(appointment?.date), noonDate)
      || isEqual(parseISO(appointment?.date), noonDate)
    ))
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
