import React from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import MomentLocaleUtils from "react-day-picker/moment";

import i18n from "translations/i18n";

import { CalendarProps } from "./types";
import { DayPickerContainer } from "./styles";

import "moment/locale/en-au";
import "moment/locale/pt-br";

const calendarDisabledDays = { daysOfWeek: [0, 6] };

const Calendar: React.FC<CalendarProps> = ({
  disabledDays,
  ...rest
}) => {
  const mergeDisabledDays = {
    ...calendarDisabledDays,
    ...disabledDays,
  };

  return (
    <DayPickerContainer>
      <DayPicker
        locale={i18n.language}
        fromMonth={new Date()}
        localeUtils={MomentLocaleUtils}
        disabledDays={mergeDisabledDays}
        {...rest}
      />
    </DayPickerContainer>
  );
};

export default Calendar;
