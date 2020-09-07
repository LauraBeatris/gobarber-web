import React, { useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { Helmet } from "react-helmet";
import { FiLogIn, FiMail } from "react-icons/fi";
import { ValidationError } from "yup";

import { useAuthDispatch } from "../../contexts/auth/AuthContext";
import { AnimationContainer } from "./styles";
import AuthLayout from "../../layouts/Auth";
import Input from "../../components/Input";
import Button from "../../components/Button";
import getValidationErrors from "../../utils/getValidationErrors";
import logo from "../../assets/images/logo.svg";
import signInBackground from "../../assets/images/sign-in-background.png";
import schema from "./schema";
import { SIGN_IN_PAGE_PATH } from "../../constants/routesPaths";

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [t] = useTranslation();

  const { signIn } = useAuthDispatch();

  const handleSubmit = useCallback(
    async (data): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn(data);
      } catch (error) {
        if (error instanceof ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [signIn],
  );

  return (
    <AuthLayout backgroundImage={signInBackground} backgroundPosition="right">
      <AnimationContainer>
        <Helmet>
          <title>GoBarber | Forgot Password</title>
        </Helmet>

        <img
          src={logo}
          aria-label="GoBarber"
          alt="GoBarber"
        />

        <Form
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <h1>{t("forgot_password.title")}</h1>

          <p>{t("forgot_password.enter_your_email_below")}</p>

          <Input
            name="email"
            type="email"
            autoCapitalize="none"
            placeholder={t("account_form.email")}
            icon={FiMail}
          />

          <Button type="submit">{t("buttons.confirm")}</Button>
        </Form>

        <Link to={SIGN_IN_PAGE_PATH}>
          <FiLogIn />

          {t("forgot_password.go_back_to_sign_in")}
        </Link>
      </AnimationContainer>
    </AuthLayout>
  );
};

export default ForgotPassword;
