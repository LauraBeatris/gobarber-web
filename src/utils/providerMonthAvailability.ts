import { getMonth, getYear } from "date-fns/esm";

import { ProviderMonthAvailability } from "shared/types/apiSchema";

export interface GetProviderMonthAvailabilityDates {
  providerMonthAvailability: ProviderMonthAvailability[];
  currentMonth: Date;
}

/**
 * Returns the availability date
 *
 * @param currentMonth The current month
 * @param availabilityMonth The availability month
 */
const getAvailabilityDate = (
  currentMonth: GetProviderMonthAvailabilityDates["currentMonth"],
  day: number,
): Date => (
  new Date(
    getYear(currentMonth),
    getMonth(currentMonth),
    day,
  )
);

/**
 * Returns the available dates on the month provider schedule
 */
export const getProviderMonthAvailableDates = ({
  providerMonthAvailability,
  currentMonth,
}: GetProviderMonthAvailabilityDates): Date[] => {
  const monthAvailableDates = providerMonthAvailability
    .filter((availability) => (
      !availability.isPast
    )).map(availability => (
      getAvailabilityDate(currentMonth, availability.day)
    ));

  return monthAvailableDates;
};

/**
 * Returns the unavailable dates on the month provider schedule
 */
export const getProviderMonthUnavailableDates = ({
  providerMonthAvailability,
  currentMonth,
}: GetProviderMonthAvailabilityDates): Date[] => {
  const monthUnavailableDates = providerMonthAvailability
    .filter((availability) => (
      !availability.available
      && availability.isPast
    )).map(availability => (
      getAvailabilityDate(currentMonth, availability.day)
    ));

  return monthUnavailableDates;
};
