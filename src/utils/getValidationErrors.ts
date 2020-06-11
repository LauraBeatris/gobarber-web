import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

const getValidationErrors = (validationError: ValidationError): Errors => {
  return validationError.inner.reduce(
    (errorsAccumulator, error) => ({
      ...errorsAccumulator,
      [error.path]: error.message,
    }),
    {},
  );
};

export default getValidationErrors;
