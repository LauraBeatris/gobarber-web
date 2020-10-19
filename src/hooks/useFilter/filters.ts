import { DateParam, withDefault } from "use-query-params";

export const filters = {
  currentMonth: {
    name: "currentMonth",
    type: withDefault(DateParam, new Date()),
  },
  selectedDay: {
    name: "selectedDay",
    type: DateParam,
  },
};
