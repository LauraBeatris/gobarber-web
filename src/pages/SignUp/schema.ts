import * as Yup from "yup";

import i18n from "../../translations/i18n";

const signUpSchema = Yup.object().shape({
  name: Yup
    .string()
    .required()
    .label(i18n.t("account_form.full_name")),
  email: Yup
    .string()
    .email()
    .required()
    .label(i18n.t("account_form.email")),
  password: Yup
    .string()
    .required()
    .min(5)
    .label(i18n.t("account_form.password")),
});

export default signUpSchema;
