import React, { useCallback } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useTimer } from "react-timer-hook";
import { useQueryParam } from "use-query-params";

import AuthLayout from "layouts/Auth";
import barberBackground from "assets/images/barber-background.png";
import getExpiryConfirmationTimestamp from "utils/getExpiryConfirmationTimestamp";
import { appearFromLeft } from "styles/animations";
import useSendRecoverPasswordRequest from "hooks/auth/useSendRecoverPasswordRequest";
import noop from "utils/noop";

import { Content } from "./styles";

const messageComponents = [
  <span className="bold" />,
];

const RequestPasswordResetSuccess: React.FC = () => {
  const [t] = useTranslation();
  const [email] = useQueryParam<string>("email");
  const [sendRecoverPasswordRequest] = useSendRecoverPasswordRequest();

  const {
    restart,
    seconds,
  } = useTimer({
    expiryTimestamp: getExpiryConfirmationTimestamp(),
  });

  const resendResetPasswordRequest = useCallback(
    async (): Promise<void> => {
      restart(getExpiryConfirmationTimestamp());

      sendRecoverPasswordRequest({
        email,
      })
        .catch(noop);
    },
    [
      sendRecoverPasswordRequest,
      restart,
      email,
    ],
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
