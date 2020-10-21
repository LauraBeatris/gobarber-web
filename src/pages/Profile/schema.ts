import { WhenOptions } from "yup";

import Yup from "settings/yup";
import oldPasswordTest from "shared/tests/oldPasswordTest";

const passwordValidation: WhenOptions<string> = {
  is: (value: string) => value.length > 0,
  then: Yup.string().required(),
  otherwise: Yup.string().notRequired(),
};

const updateProfileSchema = Yup.object().shape({
  name: Yup
    .string()
    .required(),
  email: Yup
    .string()
    .email()
    .required(),
  old_password: Yup
    .string()
    .test(oldPasswordTest)
    .nullable()
    .default(null),
  password: Yup
    .string()
    .nullable()
    .when("old_password", passwordValidation)
    .default(null),
  password_confirmation: Yup
    .string()
    .oneOf([Yup.ref("password")])
    .when("password", passwordValidation),
});

export default updateProfileSchema;
