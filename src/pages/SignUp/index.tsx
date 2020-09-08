import React, { useRef, useState, useCallback } from "react";
import { useHistory, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { Helmet } from "react-helmet";
import {
  FiLogIn, FiLock, FiMail, FiUser,
} from "react-icons/fi";
import { ValidationError } from "yup";

import { useToastsDispatch } from "../../contexts/toasts/ToastsContext";
import { SIGN_IN_PAGE_PATH } from "../../constants/routesPaths";
import { AnimationContainer } from "./styles";
import AuthLayout from "../../layouts/Auth";
import Input from "../../components/Input";
import Button from "../../components/Button";
import logo from "../../assets/images/logo.svg";
import signUpBackground from "../../assets/images/sign-up-background.png";
import getValidationErrors from "../../utils/getValidationErrors";
import api from "../../settings/api";
import schema from "./schema";

const SignUp: React.FC = () => {
  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToastsDispatch();

  const [t] = useTranslation();

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data): Promise<void> => {
      setLoading(true);

      try {
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post("/users", data);

        addToast({
          title: t("toasts.signup.success.title"),
          description: t("toasts.signup.success.description"),
          type: "success",
        });

        history.push(SIGN_IN_PAGE_PATH);
      } catch (error) {
        if (error instanceof ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          title: t("toasts.signup.error.title"),
          description: t("toasts.signup.error.description"),
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    },
    [
      addToast,
      history,
      t,
    ],
  );

  return (
    <AuthLayout
      backgroundPosition="right"
      backgroundImage={signUpBackground}
    >
      <AnimationContainer>
        <Helmet>
          <title>
            GoBarber |
            {" "}
            {t("signup.create_an_account")}
          </title>
        </Helmet>

        <img src={logo} aria-label="GoBarber" alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>{t("signup.create_an_account")}</h1>

          <Input
            name="name"
            type="text"
            autoCapitalize="none"
            placeholder={t("account_form.full_name")}
            icon={FiUser}
          />

          <Input
            name="email"
            type="email"
            autoCapitalize="none"
            placeholder={t("account_form.email")}
            icon={FiMail}
          />

          <Input
            name="password"
            type="password"
            placeholder={t("account_form.password")}
            icon={FiLock}
          />

          <Button
            type="submit"
            loading={loading}
            disabled={loading}
          >
            {t("buttons.confirm")}
          </Button>
        </Form>

        <Link to={SIGN_IN_PAGE_PATH}>
          <FiLogIn />
          {t("signup.already_have_an_account")}
        </Link>
      </AnimationContainer>
    </AuthLayout>
  );
};

export default SignUp;
