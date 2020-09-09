import React, { useRef, useCallback } from "react";
import { FiLock, FiMail } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";

import Input from "components/Input";
import Button from "components/Button";
import i18n from "translations/i18n";
import getValidationErrors from "utils/getValidationErrors";

import { Container } from "./styles";

export default {
  title: "Input",
  component: Input,
};

const signInSchema = Yup.object().shape({
  email: Yup
    .string()
    .email()
    .required()
    .label(i18n.t("auth_form.email")),
  password: Yup
    .string()
    .required()
    .min(5)
    .label(i18n.t("auth_form.password")),
});

const FormWrapper: React.FC = ({ children }) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        await signInSchema.validate(data, {
          abortEarly: false,
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [],
  );

  return (
    <Form onSubmit={handleSubmit} ref={formRef}>
      {children}
    </Form>
  );
};

export const withLabel: React.FC = () => (
  <Container>
    <FormWrapper>
      <Input
        name="email"
        type="email"
        autoCapitalize="none"
        placeholder={i18n.t("auth_form.email")}
      />
      <Input
        name="password"
        type="password"
        placeholder={i18n.t("auth_form.password")}
      />
    </FormWrapper>
  </Container>
);

export const withIcon: React.FC = () => (
  <Container>
    <FormWrapper>
      <Input
        name="email"
        type="email"
        autoCapitalize="none"
        placeholder={i18n.t("auth_form.email")}
        icon={FiMail}
      />
      <Input
        name="password"
        type="password"
        placeholder={i18n.t("auth_form.password")}
        icon={FiLock}
      />
    </FormWrapper>
  </Container>
);

export const withValidationErrors: React.FC = () => (
  <Container>
    <FormWrapper>
      <Input
        name="email"
        type="email"
        autoCapitalize="none"
        placeholder={i18n.t("auth_form.email")}
        icon={FiMail}
      />
      <Input
        name="password"
        type="password"
        placeholder={i18n.t("auth_form.password")}
        icon={FiLock}
      />
      <Button type="submit">Validate</Button>
    </FormWrapper>
  </Container>
);
