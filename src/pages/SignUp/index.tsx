import React, { useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import {
  FiLogIn, FiLock, FiMail, FiUser,
} from "react-icons/fi";
import { ValidationError } from "yup";

import { appearFromRight } from "styles/animations";
import { useToastsDispatch } from "contexts/toasts/ToastsContext";
import { SIGN_IN_PAGE_PATH } from "constants/routesPaths";
import AuthLayout from "layouts/Auth";
import Input from "components/Input";
import Button from "components/Button";
import roomBackground from "assets/images/room-background.png";
import getValidationErrors from "utils/getValidationErrors";
import api from "settings/api";
import { useAuthDispatch } from "contexts/auth/AuthContext";
import ShowPasswordInput from "components/Input/ShowPasswordInput";

import schema from "./schema";

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToastsDispatch();

  const { signIn } = useAuthDispatch();

  const [t] = useTranslation();

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data): Promise<void> => {
      setLoading(true);

      try {
        formRef.current?.setErrors({});

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post("/users", data);

        await signIn({
          ...data,
          isProvider: true,
        });

        addToast({
          title: t("toasts.signup.success.title"),
          description: t("toasts.signup.success.description"),
          type: "success",
        });
      } catch (error) {
        if (error instanceof ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          title: error.response?.data.message,
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, signIn, t],
  );

  return (
    <AuthLayout
      title={t("signup.create_an_account")}
      animation={appearFromRight}
      backgroundPosition="left"
      backgroundImage={roomBackground}
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="name"
          type="text"
          autoCapitalize="none"
          placeholder={t("auth_form.full_name")}
          icon={FiUser}
        />

        <Input
          name="email"
          type="email"
          autoCapitalize="none"
          placeholder={t("auth_form.email")}
          icon={FiMail}
        />

        <ShowPasswordInput
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
      </Form>

      <Link to={SIGN_IN_PAGE_PATH}>
        <FiLogIn />
        {t("signup.already_have_an_account")}
      </Link>
    </AuthLayout>
  );
};

export default SignUp;
