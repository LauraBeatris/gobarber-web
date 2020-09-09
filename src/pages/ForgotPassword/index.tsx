import React, { useCallback, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { FiLogIn, FiMail } from "react-icons/fi";
import { ValidationError } from "yup";

import Button from "components/Button";
import Input from "components/Input";
import getValidationErrors from "utils/getValidationErrors";
import barberBackground from "assets/images/barber-background.png";
import { REQUEST_PASSWORD_REQUEST_SUCCESS, SIGN_IN_PAGE_PATH } from "constants/routesPaths";
import api from "settings/api";
import AuthLayout from "layouts/Auth";
import { appearFromLeft } from "styles/animations";

import schema from "./schema";

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [t] = useTranslation();

  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data): Promise<void> => {
      setLoading(true);

      try {
        formRef.current?.setErrors({});

        await schema.validate(data, {
          abortEarly: false,
        });

        const email = data?.email;

        await api.post("/password/recover-request", {
          email,
        });

        history.push(REQUEST_PASSWORD_REQUEST_SUCCESS, {
          email,
        });
      } catch (error) {
        if (error instanceof ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
        }
      } finally {
        setLoading(false);
      }
    },
    [history],
  );

  return (
    <AuthLayout
      title={t("forgot_password.title")}
      description={t("forgot_password.enter_your_email_below")}
      animation={appearFromLeft}
      backgroundImage={barberBackground}
      backgroundPosition="right"
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

        <Button
          type="submit"
          disabled={loading}
          loading={loading}
        >
          {t("buttons.confirm")}
        </Button>
      </Form>

      <Link to={SIGN_IN_PAGE_PATH}>
        <FiLogIn />

        {t("forgot_password.go_back_to_sign_in")}
      </Link>
    </AuthLayout>
  );
};

export default ForgotPassword;
