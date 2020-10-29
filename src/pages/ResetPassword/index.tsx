import React, { useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { FiLock } from "react-icons/fi";
import { StringParam, useQueryParam } from "use-query-params";

import roomBackground from "assets/images/room-background.png";
import Button from "components/Button";
import AuthLayout from "layouts/Auth";
import { SIGN_IN_PAGE_PATH } from "constants/routesPaths";
import { appearFromLeft } from "styles/animations";
import ShowPasswordInput from "components/Input/ShowPasswordInput";
import useResetPassword from "hooks/auth/useResetPassword";
import performSchemaValidation from "utils/performSchemaValidation";
import { ResetPasswordData } from "hooks/auth/useResetPassword/types";
import noop from "utils/noop";

import schema from "./schema";

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const [t] = useTranslation();
  const [token] = useQueryParam("token", StringParam);
  const [resetPassword, isLoading] = useResetPassword();

  const handleResetPassword = useCallback((data: ResetPasswordData) => {
    if (!token) {
      return;
    }

    resetPassword({
      token,
      password: data.password,
      confirm_password: data.confirm_password,
    })
      .then(() => {
        history.push(SIGN_IN_PAGE_PATH);
      })
      .catch(noop);
  }, [
    token,
    history,
    resetPassword,
  ]);

  const handleSubmit = useCallback(
    (data) => {
      performSchemaValidation({
        formRef,
        schema,
        data,
      })
        .then(() => handleResetPassword(data))
        .catch(noop);
    },
    [handleResetPassword],
  );

  return (
    <AuthLayout
      title={t("reset_password.title")}
      animation={appearFromLeft}
      description={t("reset_password.please_type_your_new_password_below")}
      backgroundImage={roomBackground}
      backgroundPosition="left"
    >
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <ShowPasswordInput
          name="password"
          type="password"
          icon={FiLock}
          placeholder={t("auth_form.password")}
        />

        <ShowPasswordInput
          name="confirm_password"
          type="password"
          icon={FiLock}
          placeholder={t("auth_form.confirm_password")}
        />

        <Button
          type="submit"
          disabled={isLoading}
          loading={isLoading}
        >
          {t("buttons.confirm")}
        </Button>
      </Form>
    </AuthLayout>
  );
};

export default ResetPassword;
