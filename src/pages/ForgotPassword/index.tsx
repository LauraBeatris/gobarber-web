import React, { useCallback, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { Helmet } from "react-helmet";
import { FiLogIn, FiMail } from "react-icons/fi";
import { ValidationError } from "yup";

import { AnimationContainer } from "./styles";
import AuthLayout from "../../layouts/Auth";
import Input from "../../components/Input";
import Button from "../../components/Button";
import getValidationErrors from "../../utils/getValidationErrors";
import logo from "../../assets/images/logo.svg";
import signInBackground from "../../assets/images/sign-in-background.png";
import schema from "./schema";
import { REQUEST_PASSWORD_REQUEST_SUCCESS, SIGN_IN_PAGE_PATH } from "../../constants/routesPaths";
import api from "../../settings/api";

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
    <AuthLayout backgroundImage={signInBackground} backgroundPosition="right">
      <AnimationContainer>
        <Helmet>
          <title>
            GoBarber |
            {" "}
            {t("forgot_password.title")}
          </title>
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
      </AnimationContainer>
    </AuthLayout>
  );
};

export default ForgotPassword;
