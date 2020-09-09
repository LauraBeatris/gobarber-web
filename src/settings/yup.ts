import * as Yup from "yup";

import i18n from "translations/i18n";

const locale = {
  mixed: {
    default: i18n.t("yup.mixed_invalid_field"),
    required: i18n.t("yup.mixed_required_field"),
    notType: i18n.t("yup.mixed_not_type"),
    oneOf: i18n.t("yup.mixed_one_of"),
    max: i18n.t("yup.mixed_max"),
    min: i18n.t("yup.mixed_min"),
  },
  string: {
    email: i18n.t("yup.string_email"),
    max: i18n.t("yup.string_max"),
    min: i18n.t("yup.string_min"),
  },
  number: {
    max: i18n.t("yup.number_max"),
    min: i18n.t("yup.number_min"),
  },
};

Yup.setLocale(locale);

export default Yup;
