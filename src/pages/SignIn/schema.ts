import * as Yup from "yup";

import i18n from "../../translations/i18n";

const signInSchema = Yup.object().shape({
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

export default signInSchema;
