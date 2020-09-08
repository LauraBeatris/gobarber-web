import React, { useCallback, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { FormHandles } from "@unform/core";
import { Helmet } from "react-helmet";
import { useTimer } from "react-timer-hook";

import { AnimationContainer } from "./styles";
import AuthLayout from "../../layouts/Auth";
import logo from "../../assets/images/logo.svg";
import signInBackground from "../../assets/images/sign-in-background.png";
import api from "../../settings/api";
import getExpiryConfirmationTimestamp from "../../utils/getExpiryConfirmationTimestamp";
import { useToastsDispatch } from "../../contexts/toasts/ToastsContext";
import { SIGN_IN_PAGE_PATH } from "../../constants/routesPaths";

const messageComponents = [
  <span className="bold" />,
];

interface RequestPasswordResetSuccessHistoryState {
  email: string
}

const RequestPasswordResetSuccess: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [t] = useTranslation();

  const history = useHistory<RequestPasswordResetSuccessHistoryState>();

  const { addToast } = useToastsDispatch();

  const {
    restart,
    seconds,
  } = useTimer({
    expiryTimestamp: getExpiryConfirmationTimestamp(),
  });

  const resendResetPasswordRequest = useCallback(
    async (): Promise<void> => {
      restart(getExpiryConfirmationTimestamp());

      try {
        formRef.current?.setErrors({});

        await api.post("/password/recover-request", {
          email: history.location.state?.email,
        });

        addToast({
          title: t("toasts.request_reset_password_success.email_sent_successfully"),
          type: "success",
        });
      } catch (error) {
        addToast({
          title: t("toasts.something_went_wrong"),
          description: t("toasts.request_reset_password_success.error_while_sending_email"),
          type: "error",
        });
      }
    },
    [restart, history.location.state, addToast, t],
  );

  const canResendLink = seconds <= 0;

  return (
    <AuthLayout
      backgroundImage={signInBackground}
      backgroundPosition="right"
    >
      <AnimationContainer>
        <Helmet>
          <title>
            GoBarber |
            {" "}
            {t("request_reset_password_success.title")}
          </title>
        </Helmet>

        <Link to={SIGN_IN_PAGE_PATH}>
          <img
            src={logo}
            aria-label="GoBarber"
            alt="GoBarber"
          />
        </Link>

        <h1>{t("request_reset_password_success.title")}</h1>

        <h4>
          <Trans
            i18nKey="request_reset_password_success.look_for_an_email"
            components={messageComponents}
          />
        </h4>

        <h4>
          {t("request_reset_password_success.if_you_do_not_see_an_email")}
        </h4>

        <button
          type="button"
          disabled={!canResendLink}
          onClick={resendResetPasswordRequest}
        >
          {
            canResendLink ? (
              t("buttons.resend_link")
            )
              : (
                t("request_reset_password_success.wait_n_seconds_to_resend_the_email", {
                  seconds,
                })
              )
          }
        </button>
      </AnimationContainer>
    </AuthLayout>
  );
};

export default RequestPasswordResetSuccess;
