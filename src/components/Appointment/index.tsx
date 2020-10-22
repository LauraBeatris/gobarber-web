import React from "react";

import getUserImagePlaceholder from "utils/getUserImagePlaceholder";
import Image from "components/Image";
import { useModal } from "contexts/modal/ModalContext";
import { AppointmentDetailsModalProps } from "components/Modals/AppointmentDetailsModal/types";
import AppointmentDetailsModal from "components/Modals/AppointmentDetailsModal";

import { AppointmentProps } from "./types";
import { AppointmentContainer } from "./styles";
import AppointmentDate from "./Date";

const Appointment: React.FC<AppointmentProps> = ({
  name,
  date,
  avatar_url,
  showLateralBorder,
}) => {
  const [showModal] = useModal<AppointmentDetailsModalProps>();

  const handleClick = (): void => {
    showModal({
      component: AppointmentDetailsModal,
      componentProps: {
        name,
        date,
        avatar_url,
      },
    });
  };

  return (
    <AppointmentContainer
      type="button"
      onClick={handleClick}
      showLateralBorder={!!showLateralBorder}
    >
      <Image
        src={avatar_url}
        fallbackSrc={getUserImagePlaceholder("Laura")}
      />

      <strong>{name}</strong>

      {
        date && (
          <AppointmentDate date={date} />
        )
      }
    </AppointmentContainer>
  );
};

export default Appointment;
