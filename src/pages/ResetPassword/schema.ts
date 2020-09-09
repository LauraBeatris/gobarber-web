import { PASSWORD_MIN_LENGTH } from "constants/authentication";
import Yup from "settings/yup";

const resetPasswordSchema = Yup.object().shape({
  password: Yup
    .string()
    .min(PASSWORD_MIN_LENGTH)
    .required(),
  confirm_password: Yup
    .string()
    .min(PASSWORD_MIN_LENGTH)
    .oneOf([Yup.ref("password")])
    .required(),
});

export default resetPasswordSchema;
