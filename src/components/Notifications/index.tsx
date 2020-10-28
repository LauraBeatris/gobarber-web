import React, {
  useRef,
  useState,
  useCallback,
} from "react";
import { IoIosNotifications, IoIosRefresh } from "react-icons/io";
import useOnClickOutside from "use-onclickoutside";
import { useTranslation } from "react-i18next";

import useNotifications from "hooks/useNotifications";

import {
  NotificationsList,
  NotificationsButton,
  NotificationListItem,
  NotificationsContainer,
} from "./styles";

const Notifications: React.FC = () => {
  const notificationsContainerRef = useRef<HTMLDivElement>(null);

  const [t] = useTranslation();
  const [showNotifications, setShowNotifications] = useState(false);
  const {
    refetch,
    unreadNotifications,
    markNotificationsAsRead,
  } = useNotifications();

  const toggleShowNotifications = useCallback(() => {
    setShowNotifications(prev => !prev);
  }, []);

  useOnClickOutside(notificationsContainerRef, () => {
    setShowNotifications(false);
  });

  const showBadge = unreadNotifications.length > 0;

  return (
    <NotificationsContainer ref={notificationsContainerRef}>
      <NotificationsButton
        type="button"
        onClick={toggleShowNotifications}
        showBadge={showBadge}
        showNotifications={showNotifications}
      >
        <IoIosNotifications />
      </NotificationsButton>

      {
        showNotifications && (
          <NotificationsList>
            <header>
              <p>Notifications</p>

              <div>
                <button type="button" onClick={markNotificationsAsRead}>
                  {t("notifications.mark_all_as_read")}
                </button>

                <button type="button" onClick={refetch}>
                  <IoIosRefresh />
                </button>
              </div>
            </header>

            {
              unreadNotifications.map(notification => (
                <NotificationListItem key={notification.id}>
                  <span>{notification.content}</span>

                  <small>{notification.createdAtDistance}</small>
                </NotificationListItem>
              ))
            }

            {
              unreadNotifications.length === 0 && (
                <h4>{t("notifications.there_are_no_notifications")}</h4>
              )
            }
          </NotificationsList>
        )
      }
    </NotificationsContainer>
  );
};

export default Notifications;
