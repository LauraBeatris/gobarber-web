import React, { useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import {
  FiLogIn,
  FiLock,
  FiMail,
  FiUser,
} from "react-icons/fi";

import { appearFromRight } from "styles/animations";
import { SIGN_IN_PAGE_PATH } from "constants/routesPaths";
import AuthLayout from "layouts/Auth";
import Input from "components/Input";
import Button from "components/Button";
import roomBackground from "assets/images/room-background.png";
import { useAuthDispatch, useAuthState } from "contexts/auth/AuthContext";
import ShowPasswordInput from "components/Input/ShowPasswordInput";
import useSignUp from "hooks/auth/useSignUp";
import performSchemaValidation from "utils/performSchemaValidation";
import { SignUpData } from "hooks/auth/useSignUp/types";
import noop from "utils/noop";

import schema from "./schema";

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuthDispatch();
  const { loading: isSignInLoading } = useAuthState();

  const [t] = useTranslation();

  const [signUp, isSignUpLoading] = useSignUp();

  const handleSignUp = useCallback((data: SignUpData) => {
    signUp(data)
      .then(() => signIn({
        ...data,
      }))
      .catch(noop);
  }, [
    signIn,
    signUp,
  ]);

  const handleSubmit = useCallback(
    (data) => {
      performSchemaValidation({
        formRef,
        schema,
        data,
      })
        .then(() => handleSignUp(data))
        .catch(noop);
    },
    [handleSignUp],
  );

  const loading = isSignUpLoading || isSignInLoading;

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
