import {
  useCallback,
  useEffect,
  useState,
  useMemo,
} from "react";

import { useToastsDispatch } from "contexts/toasts/ToastsContext";
import { Notification } from "shared/types/apiSchema";
import api from "settings/api";

import formatNotifications from "./formatNotifications";
import { FormattedNotification, UseNotificationsPayload } from "./types";

/**
 * Handle the queries and mutations related to notifications
 */
const useNotifications = (): UseNotificationsPayload => {
  const [unreadNotifications, setUnreadNotifications] = useState<FormattedNotification[]>([]);

  const { addToast } = useToastsDispatch();

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

  const refetch = useCallback(() => {
    api.get<Notification[]>("/notifications")
      .then((response) => {
        if (!response.data) {
          return;
        }

        setUnreadNotifications(formatNotifications(response.data));
      });
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const payload = useMemo<UseNotificationsPayload>(() => ({
    markNotificationsAsRead,
    unreadNotifications,
    refetch,
  }), [
    markNotificationsAsRead,
    unreadNotifications,
    refetch,
  ]);

  return payload;
};

export default useNotifications;
