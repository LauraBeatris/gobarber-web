export interface ProviderMonthAvailabilityDates {
  available: Date[];
  unavailable: Date[];
}

export interface UseProviderMonthAvailabilityPayload {
  providerMonthAvailabilityDates: ProviderMonthAvailabilityDates;
  isFetching: boolean;
}
