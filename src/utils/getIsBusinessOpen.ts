import {
  isSaturday,
  isBefore,
  isMonday,
  isAfter,
  getYear,
} from "date-fns";
import { getMonth } from "date-fns/esm";

/**
 * Returns a boolean that determines if the business is open
 */
const getIsBusinessOpen = (): boolean => {
  const now = Date.now();
  const year = getYear(now);
  const month = getMonth(now);

  const beginBusinessHours = new Date(year, month, 8);
  const endBusinessHours = new Date(year, month, 23);

  return (
    isAfter(beginBusinessHours, now)
    && isBefore(endBusinessHours, now)
    && !isMonday(now)
    && !isSaturday(now)
  );
};

export default getIsBusinessOpen;
