import {
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getYear } from "date-fns";

import api from "settings/api";
import getMonth from "utils/months";
import { ProviderMonthAvailability } from "shared/types/apiSchema";
import { useAuthState } from "contexts/auth/AuthContext";
import { useToastsDispatch } from "contexts/toasts/ToastsContext";
import { getProviderMonthAvailableDates, getProviderMonthUnavailableDates } from "utils/providerMonthAvailability";
import useFilter from "hooks/useFilter";
import { filters } from "hooks/useFilter/filters";

import { UseProviderMonthAvailabilityPayload } from "./types";

/**
 * Returns the provider month availability
 */
export const useProviderMonthAvailability = (): UseProviderMonthAvailabilityPayload => {
  const [currentMonth] = useFilter<Date>(filters.currentMonth);

  const [
    loadingProviderMonthAvailability,
    setLoadingProviderMonthAvailability,
  ] = useState(false);

  const [
    providerMonthAvailability,
    setProviderMonthAvailability,
  ] = useState<ProviderMonthAvailability[]>([]);

  const { user } = useAuthState();

  const { addToast } = useToastsDispatch();

  const fetchProviderMonthAvailability = useCallback(() => {
    setLoadingProviderMonthAvailability(true);

    api.get(`/providers/${user.id}/month-availability`, {
      params: {
        year: getYear(currentMonth),
        month: getMonth(currentMonth),
      },
    })
      .then((response) => {
        setProviderMonthAvailability(response?.data);
      })
      .catch((error) => {
        addToast({
          type: "error",
          title: error?.message,
        });
      })
      .finally(() => {
        setLoadingProviderMonthAvailability(false);
      });
  }, [
    user.id,
    addToast,
    currentMonth,
  ]);

  const providerMonthAvailabilityDates = useMemo(() => ({
    unavailable: getProviderMonthUnavailableDates({
      providerMonthAvailability,
      currentMonth,
    }),
    available: getProviderMonthAvailableDates({
      providerMonthAvailability,
      currentMonth,
    }),
  }), [
    providerMonthAvailability,
    currentMonth,
  ]);

  useEffect(() => {
    fetchProviderMonthAvailability();
  }, [fetchProviderMonthAvailability]);

  const payload = useMemo<UseProviderMonthAvailabilityPayload>(() => ({
    providerMonthAvailabilityDates,
    loadingProviderMonthAvailability,
  }), [
    providerMonthAvailabilityDates,
    loadingProviderMonthAvailability,
  ]);

  return payload;
};
