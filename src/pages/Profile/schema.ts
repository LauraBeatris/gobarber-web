import Yup from "settings/yup";

const updateProfileSchema = Yup.object().shape({
  email: Yup
    .string()
    .email()
    .required(),
  password: Yup
    .string()
    .required()
    .min(5),
});

export default updateProfileSchema;
