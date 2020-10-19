import { DateParam } from "use-query-params";

export const filters = {
  currentMonth: {
    name: "currentMonth",
    type: DateParam,
  },
  selectedDay: {
    name: "selectedDay",
    type: DateParam,
  },
};
