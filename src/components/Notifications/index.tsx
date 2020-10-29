import React, {
  useRef,
  useState,
  useCallback,
} from "react";
import { IoIosNotifications, IoIosRefresh } from "react-icons/io";
import useOnClickOutside from "use-onclickoutside";
import { useTranslation } from "react-i18next";

import useNotifications from "hooks/useNotifications";
import Loading from "components/Loading";

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
    isLoading,
    canFetchMore,
    notifications,
    handleFetchMore,
    markNotificationsAsRead,
  } = useNotifications();

  const toggleShowNotifications = useCallback(() => {
    setShowNotifications(prev => !prev);
  }, []);

  useOnClickOutside(notificationsContainerRef, () => {
    setShowNotifications(false);
  });

  const isEmptyList = notifications.length === 0;
  const showEmptyMessage = !isLoading && notifications.length === 0;

  return (
    <NotificationsContainer ref={notificationsContainerRef}>
      <NotificationsButton
        type="button"
        onClick={toggleShowNotifications}
        showBadge={!isEmptyList}
        showNotifications={showNotifications}
      >
        <IoIosNotifications />
      </NotificationsButton>

      {
        showNotifications && (
          <NotificationsList>
            <header>
              <p>{t("notifications.title")}</p>

              <div>
                <button
                  type="button"
                  onClick={markNotificationsAsRead}
                  disabled={isEmptyList || isLoading}
                >
                  {t("notifications.mark_all_as_read")}
                </button>

                <button
                  type="button"
                  onClick={refetch}
                  disabled={isLoading}
                >
                  <IoIosRefresh />
                </button>
              </div>
            </header>

            {
              notifications.map(notification => (
                <NotificationListItem key={notification.id}>
                  <span>{notification.content}</span>

                  <small>{notification.createdAtDistance}</small>
                </NotificationListItem>
              ))
            }

            {
              showEmptyMessage && (
                <h4>{t("notifications.there_are_no_notifications")}</h4>
              )
            }

            {
              !isEmptyList && canFetchMore && (
                <button type="button" onClick={handleFetchMore}>
                  {t("buttons.load_more")}
                </button>
              )
            }

            {
              isLoading && (
                <Loading />
              )
            }
          </NotificationsList>
        )
      }
    </NotificationsContainer>
  );
};

export default Notifications;
