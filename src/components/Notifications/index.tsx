import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { IoIosNotifications, IoIosRefresh } from "react-icons/io";
import useOnClickOutside from "use-onclickoutside";
import { useTranslation } from "react-i18next";

import api from "settings/api";
import { Notification } from "shared/types/apiSchema";
import { useToastsDispatch } from "contexts/toasts/ToastsContext";

import {
  NotificationsList,
  NotificationsButton,
  NotificationListItem,
  NotificationsContainer,
} from "./styles";
import { FormattedNotification } from "./types";
import formatNotifications from "./formatNotifications";

const Notifications: React.FC = () => {
  const notificationsContainerRef = useRef<HTMLDivElement>(null);

  const [t] = useTranslation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState<FormattedNotification[]>([]);

  const { addToast } = useToastsDispatch();

  const toggleShowNotifications = useCallback(() => {
    setShowNotifications(prev => !prev);
  }, []);

  const markNotificationsAsRead = useCallback(() => {
    const promises = unreadNotifications.map(unreadNotification => (
      api.patch(`/notifications/${unreadNotification.id}`)
    ));

    Promise.all(promises)
      .then(() => {
        setUnreadNotifications([]);
      })
      .catch(error => {
        addToast({
          type: "error",
          title: error.response?.data.message,
        });
      });
  }, [
    addToast,
    unreadNotifications,
  ]);

  const fetchNotifications = useCallback(() => {
    api.get<Notification[]>("/notifications")
      .then((response) => {
        if (!response.data) {
          return;
        }

        setUnreadNotifications(formatNotifications(response.data));
      });
  }, []);

  useOnClickOutside(notificationsContainerRef, () => {
    setShowNotifications(false);
  });

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

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

                <button type="button" onClick={fetchNotifications}>
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
