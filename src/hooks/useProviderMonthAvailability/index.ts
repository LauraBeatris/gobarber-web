import { useMemo } from "react";
import { parseISO, getYear } from "date-fns";
import { useQuery } from "react-query";

import api from "settings/api";
import getMonth from "utils/months";
import { ProviderMonthAvailability } from "shared/types/apiSchema";
import { useAuthState } from "contexts/auth/AuthContext";
import { getProviderMonthAvailableDates, getProviderMonthUnavailableDates } from "utils/providerMonthAvailability";
import useFilter from "hooks/useFilter";
import { filters } from "hooks/useFilter/filters";

import { UseProviderMonthAvailabilityPayload } from "./types";

const fetchProviderMonthAvailability = (
  _queryKey: string,
  currentMonth: string,
  userId: string,
): Promise<ProviderMonthAvailability[]> => {
  const parseCurrentMonth = parseISO(currentMonth);

  return (
    api.get(`/providers/${userId}/month-availability`, {
      params: {
        year: getYear(parseCurrentMonth),
        month: getMonth(parseCurrentMonth),
      },
    }).then(response => response.data)
  );
};

/**
 * Handles the queries related to the provider month availability
 */
export const useProviderMonthAvailability = (): UseProviderMonthAvailabilityPayload => {
  const [currentMonth] = useFilter<Date>(filters.currentMonth);

  const { user } = useAuthState();

  const {
    data: providerMonthAvailability,
    isFetching,
  } = useQuery<ProviderMonthAvailability[]>([
    "providerMonthAvailability",
    currentMonth,
    user.id,
  ], fetchProviderMonthAvailability);

  const providerMonthAvailabilityDates = useMemo(() => ({
    unavailable: getProviderMonthUnavailableDates({
      providerMonthAvailability: providerMonthAvailability ?? [],
      currentMonth,
    }),
    available: getProviderMonthAvailableDates({
      providerMonthAvailability: providerMonthAvailability ?? [],
      currentMonth,
    }),
  }), [
    providerMonthAvailability,
    currentMonth,
  ]);

  const payload = useMemo<UseProviderMonthAvailabilityPayload>(() => ({
    providerMonthAvailabilityDates,
    isFetching,
  }), [
    providerMonthAvailabilityDates,
    isFetching,
  ]);

  return payload;
};
