import React, { useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { FormHandles } from "@unform/core";
import { useTimer } from "react-timer-hook";

import AuthLayout from "layouts/Auth";
import barberBackground from "assets/images/barber-background.png";
import api from "settings/api";
import getExpiryConfirmationTimestamp from "utils/getExpiryConfirmationTimestamp";
import { useToastsDispatch } from "contexts/toasts/ToastsContext";
import { appearFromLeft } from "styles/animations";

import { Content } from "./styles";

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
      title={t("request_reset_password_success.title")}
      animation={appearFromLeft}
      backgroundImage={barberBackground}
      backgroundPosition="right"
    >
      <Content>
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
      </Content>
    </AuthLayout>
  );
};

export default RequestPasswordResetSuccess;
