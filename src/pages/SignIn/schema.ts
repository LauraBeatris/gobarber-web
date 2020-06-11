import * as Yup from 'yup';

const signInSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
});

export default signInSchema;
