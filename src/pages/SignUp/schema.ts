import { PASSWORD_MIN_LENGTH } from "constants/authentication";
import Yup from "settings/yup";

const signUpSchema = Yup.object().shape({
  name: Yup
    .string()
    .required(),
  email: Yup
    .string()
    .email()
    .required(),
  password: Yup
    .string()
    .required()
    .min(PASSWORD_MIN_LENGTH),
});

export default signUpSchema;
