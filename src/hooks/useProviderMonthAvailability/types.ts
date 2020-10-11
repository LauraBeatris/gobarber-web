export interface ProviderMonthAvailabilityDates {
  available: Date[];
  unavailable: Date[];
}

export interface UseProviderMonthAvailability {
  loading: boolean;
  providerMonthAvailabilityDates: ProviderMonthAvailabilityDates,
}
