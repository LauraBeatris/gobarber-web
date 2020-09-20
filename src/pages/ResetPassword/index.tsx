import React, { useCallback, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { FiLock } from "react-icons/fi";
import { ValidationError } from "yup";
import { StringParam, useQueryParam } from "use-query-params";

import roomBackground from "assets/images/room-background.png";
import Button from "components/Button";
import Input from "components/Input";
import getValidationErrors from "utils/getValidationErrors";
import api from "settings/api";
import AuthLayout from "layouts/Auth";
import { SIGN_IN_PAGE_PATH } from "constants/routesPaths";
import { appearFromLeft } from "styles/animations";
import { useToastsDispatch } from "contexts/toasts/ToastsContext";

import schema from "./schema";

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const [t] = useTranslation();

  const [token] = useQueryParam("token", StringParam);

  const [loading, setLoading] = useState(false);

  const { addToast } = useToastsDispatch();

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

          return;
        }

        addToast({
          title: error?.message,
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, history, token],
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
    </AuthLayout>
  );
};

export default ResetPassword;
