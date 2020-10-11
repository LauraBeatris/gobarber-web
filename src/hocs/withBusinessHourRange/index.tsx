import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiArrowRight } from "react-icons/fi";
import Lottie from "react-lottie";

import { getLottieDefaultOptions } from "settings/lottie";
import getIsBusinessOpen from "utils/getIsBusinessOpen";
import animationData from "assets/lotties/closed.json";
import AppLayout from "layouts/App";

import { BusinessClosedContainer } from "./styles";

const lottieOptions = getLottieDefaultOptions(animationData);

const withBusinessHourRange = (BaseComponent: React.FC) => (): JSX.Element => {
  const [t] = useTranslation();

  const [showBusiness, setShowBusiness] = useState(() => getIsBusinessOpen());

  const handleClick = useCallback(() => {
    setShowBusiness(true);
  }, []);

  if (!showBusiness) {
    return (
      <AppLayout>
        <BusinessClosedContainer>
          <h1>{t("dashboard.the_business_is_closed")}</h1>
          <button
            type="button"
            onClick={handleClick}
          >
            {t("dashboard.click_here_to_see_the_next_appointments")}

            <FiArrowRight />
          </button>

          <Lottie options={lottieOptions} />
        </BusinessClosedContainer>
      </AppLayout>
    );
  }

  return <BaseComponent />;
};

export default withBusinessHourRange;
