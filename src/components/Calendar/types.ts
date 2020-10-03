import { DayPickerProps } from "react-day-picker";

export interface CalendarProps extends DayPickerProps {
  selectedDay?: Date;
}
