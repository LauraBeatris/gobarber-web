import * as Yup from "yup";

import i18n from "../../translations/i18n";

const forgotPasswordSchema = Yup.object().shape({
  email: Yup
    .string()
    .email()
    .required()
    .label(i18n.t("account_form.email")),
});

export default forgotPasswordSchema;
