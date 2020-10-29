import React, { useCallback, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { FiLogIn, FiMail } from "react-icons/fi";
import noop from "lodash.noop";

import Button from "components/Button";
import Input from "components/Input";
import barberBackground from "assets/images/barber-background.png";
import { REQUEST_PASSWORD_REQUEST_SUCCESS, SIGN_IN_PAGE_PATH } from "constants/routesPaths";
import AuthLayout from "layouts/Auth";
import { appearFromLeft } from "styles/animations";
import useSendRecoverPasswordRequest from "hooks/auth/useSendRecoverPasswordRequest";
import performSchemaValidation from "utils/performSchemaValidation";
import { SendRecoverPasswordRequestData } from "hooks/auth/useSendRecoverPasswordRequest/types";

import schema from "./schema";

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const [t] = useTranslation();
  const [sendRecoverPasswordRequest, isLoading] = useSendRecoverPasswordRequest();

  const handleSendRecoverPasswordRequest = useCallback((data: SendRecoverPasswordRequestData) => {
    sendRecoverPasswordRequest({
      email: data.email,
    }).then(() => {
      history.push({
        pathname: REQUEST_PASSWORD_REQUEST_SUCCESS,
        search: `?email=${data.email}`,
      });
    });
  }, [history, sendRecoverPasswordRequest]);

  const handleSubmit = useCallback(
    (data) => {
      performSchemaValidation({
        data,
        schema,
        formRef,
      })
        .then(() => handleSendRecoverPasswordRequest(data))
        .catch(noop);
    },
    [handleSendRecoverPasswordRequest],
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
          disabled={isLoading}
          loading={isLoading}
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
