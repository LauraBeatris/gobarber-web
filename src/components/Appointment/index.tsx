import React from "react";
import { useTranslation } from "react-i18next";

import { useModal } from "contexts/modal/ModalContext";
import { AppointmentDetailsProps } from "components/Modals/AppointmentDetailsModal/types";
import AppointmentDetailsModal from "components/Modals/AppointmentDetailsModal";
import Avatar from "components/Avatar";

import { AppointmentProps } from "./types";
import { AppointmentContainer } from "./styles";
import AppointmentDate from "./Date";

const Appointment: React.FC<AppointmentProps> = ({
  date,
  avatar_url,
  customerName,
  showLateralBorder,
}) => {
  const [t] = useTranslation();
  const [showModal] = useModal<AppointmentDetailsProps>();

  const handleClick = (): void => {
    showModal({
      title: t("appointment_details_modal.title"),
      component: AppointmentDetailsModal,
      componentProps: {
        date,
        avatar_url,
        customerName,
      },
    });
  };

  return (
    <AppointmentContainer
      type="button"
      onClick={handleClick}
      showLateralBorder={!!showLateralBorder}
    >
      <Avatar
        name={customerName}
        avatarUrl={avatar_url}
      />

      <strong>{customerName}</strong>

      {
        date && (
          <AppointmentDate date={date} />
        )
      }
    </AppointmentContainer>
  );
};

export default Appointment;
