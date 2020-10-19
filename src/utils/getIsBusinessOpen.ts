import {
  isSaturday,
  isBefore,
  isAfter,
  getYear,
  isSunday,
} from "date-fns";
import { getMonth } from "date-fns/esm";

/**
 * Returns a boolean that determines if the business is open
 */
const getIsBusinessOpen = (): boolean => {
  const now = Date.now();
  const year = getYear(now);
  const month = getMonth(now);

  const beginBusinessHours = new Date(year, month, 8, 0, 0);
  const endBusinessHours = new Date(year, month, 23, 0, 0);

  return (
    isAfter(now, beginBusinessHours)
    && isBefore(now, endBusinessHours)
    && !isSunday(now)
    && !isSaturday(now)
  );
};

export default getIsBusinessOpen;
