import React, { useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { FiLogIn, FiLock, FiMail } from "react-icons/fi";
import { ValidationError } from "yup";

import { useAuthDispatch, useAuthState } from "contexts/auth/AuthContext";
import AuthLayout from "layouts/Auth";
import Input from "components/Input";
import Button from "components/Button";
import getValidationErrors from "utils/getValidationErrors";
import barberBackground from "assets/images/barber-background.png";
import { FORGOT_PASSWORD_PATH, SIGN_UP_PAGE_PATH } from "constants/routesPaths";
import { appearFromLeft } from "styles/animations";

import schema from "./schema";

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [t] = useTranslation();

  const { signIn } = useAuthDispatch();

  const { loading } = useAuthState();

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
    <AuthLayout
      title={t("signin.welcome_to_the_platform")}
      backgroundPosition="right"
      animation={appearFromLeft}
      backgroundImage={barberBackground}
    >
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <Input
          name="email"
          type="email"
          autoCapitalize="none"
          placeholder={t("auth_form.email")}
          icon={FiMail}
        />
        <Input
          name="password"
          type="password"
          placeholder={t("auth_form.password")}
          icon={FiLock}
        />

        <Button
          type="submit"
          loading={loading}
          disabled={loading}
        >
          {t("buttons.confirm")}
        </Button>

        <Link to={FORGOT_PASSWORD_PATH}>
          {t("signin.forgot_my_password")}
        </Link>
      </Form>

      <Link to={SIGN_UP_PAGE_PATH}>
        <FiLogIn />
        {t("signin.create_an_account")}
      </Link>
    </AuthLayout>
  );
};

export default SignIn;
