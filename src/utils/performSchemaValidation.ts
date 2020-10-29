/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormHandles } from "@unform/core";

import Yup from "settings/yup";

import getValidationErrors from "./getValidationErrors";

export interface PerformSchemaValidationParameters {
  formRef: React.RefObject<FormHandles>;
  schema: Yup.ObjectSchema<Yup.Shape<any, any>>;
  data: Record<string, unknown>;
}

/**
 * Performs schema validation based on a given form ref
 * and data
 */
const performSchemaValidation = async ({
  formRef,
  schema,
  data,
}: PerformSchemaValidationParameters): Promise<void> => {
  formRef.current?.setErrors({});

  try {
    await schema.validate(data, {
      abortEarly: false,
    });
  } catch (error) {
    const errors = getValidationErrors(error);

    formRef.current?.setErrors(errors);

    throw error;
  }
};

export default performSchemaValidation;
