import Yup from "settings/yup";

const resetPasswordSchema = Yup.object().shape({
  password: Yup
    .string()
    .min(5)
    .required(),
  confirm_password: Yup
    .string()
    .oneOf([Yup.ref("password")])
    .required(),
});

export default resetPasswordSchema;
