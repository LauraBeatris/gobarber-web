import { AppointmentType } from "shared/types/apiSchema";
import i18n from "translations/i18n";

export const MAP_APPOINTMENT_TYPE = {
  [AppointmentType.CLASSIC_SHAVING]: i18n.t("appointment_type.classic_shaving"),
  [AppointmentType.HAIR_WASHING]: i18n.t("appointment_type.hair_washing"),
  [AppointmentType.HAIR_CARE]: i18n.t("appointment_type.hair_care"),
};
