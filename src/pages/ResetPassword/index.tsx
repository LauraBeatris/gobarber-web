import React, { useCallback, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { Helmet } from "react-helmet";
import { FiLock } from "react-icons/fi";
import { ValidationError } from "yup";
import { StringParam, useQueryParam } from "use-query-params";

import Button from "components/Button";
import Input from "components/Input";
import getValidationErrors from "utils/getValidationErrors";
import logo from "assets/images/logo.svg";
import signInBackground from "assets/images/sign-in-background.png";
import { SIGN_IN_PAGE_PATH } from "constants/routesPaths";
import api from "settings/api";
import AuthLayout from "layouts/Auth";
import AuthAnimationContainer from "styles/components/AuthAnimationContainer";
import { appearFromLeft } from "styles/animations";

import schema from "./schema";

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [t] = useTranslation();

  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const [token] = useQueryParam("token", StringParam);

  const handleSubmit = useCallback(
    async (data): Promise<void> => {
      setLoading(true);

      try {
        formRef.current?.setErrors({});

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.patch("/password/reset", {
          token,
          password: data.password,
          confirm_password: data.confirm_password,
        });

        history.push(SIGN_IN_PAGE_PATH);
      } catch (error) {
        if (error instanceof ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
        }
      } finally {
        setLoading(false);
      }
    },
    [history, token],
  );

  return (
    <AuthLayout backgroundImage={signInBackground} backgroundPosition="left">
      <AuthAnimationContainer animation={appearFromLeft}>
        <Helmet>
          <title>
            GoBarber |
            {" "}
            {t("reset_password.title")}
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
          <h1>{t("reset_password.title")}</h1>

          <p>{t("reset_password.please_type_your_new_password_below")}</p>

          <Input
            name="password"
            type="password"
            icon={FiLock}
            placeholder={t("auth_form.password")}
          />

          <Input
            name="confirm_password"
            type="password"
            icon={FiLock}
            placeholder={t("auth_form.confirm_password")}
          />

          <Button
            type="submit"
            disabled={loading}
            loading={loading}
          >
            {t("buttons.confirm")}
          </Button>
        </Form>
      </AuthAnimationContainer>
    </AuthLayout>
  );
};

export default ResetPassword;
