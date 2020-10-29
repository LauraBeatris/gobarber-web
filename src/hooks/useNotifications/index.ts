import { useMemo } from "react";
import {
  useQueryCache,
  useMutation,
  useQuery,
} from "react-query";
import { AxiosError } from "axios";
import { formatDistance, parseISO } from "date-fns";

import { useToastsDispatch } from "contexts/toasts/ToastsContext";
import { Notification } from "shared/types/apiSchema";
import api from "settings/api";

import { FormattedNotification, UseNotificationsPayload } from "./types";

const now = new Date();

const fetchNotifications = (): Promise<FormattedNotification[]> => (
  api.get<FormattedNotification[], {
    data: FormattedNotification[];
  }>("/notifications")
    .then(response => (
      response.data.filter(notification => !notification.read).map(notification => ({
        ...notification,
        createdAtDistance: formatDistance(parseISO(notification.created_at), now, {
          addSuffix: true,
        }),
      }))
    ))
);

const markNotificationsAsReadMutation = (
  unreadNotifications: FormattedNotification[],
): Promise<Notification[][]> => {
  const promises = (unreadNotifications ?? []).map(unreadNotification => (
    api.patch<FormattedNotification[], {
      data: Notification[];
    }>(`/notifications/${unreadNotification.id}`)
      .then(response => response.data)
  ));

  return Promise.all(promises);
};

/**
 * Handle the queries and mutations related to notifications
 */
const useNotifications = (): UseNotificationsPayload => {
  const queryCache = useQueryCache();

  const {
    data: unreadNotifications,
    isLoading: isQueryLoading,
    refetch,
  } = useQuery<FormattedNotification[], AxiosError>("notifications", fetchNotifications);

  const { addToast } = useToastsDispatch();

  const [
    mutate,
    { isLoading: isMutationLoading },
  ] = useMutation<Notification[][], AxiosError, FormattedNotification[]>(
    markNotificationsAsReadMutation, {
      onSuccess: () => {
        queryCache.setQueryData("notifications", []);
      },
      onError: (error) => {
        addToast({
          title: error.response?.data.message,
          type: "error",
        });
      },
    },
  );

  const payload = useMemo<UseNotificationsPayload>(() => ({
    markNotificationsAsRead: () => mutate(unreadNotifications),
    unreadNotifications: unreadNotifications ?? [],
    isLoading: isQueryLoading || isMutationLoading,
    refetch,
  }), [
    unreadNotifications,
    isMutationLoading,
    isQueryLoading,
    refetch,
    mutate,
  ]);

  return payload;
};

export default useNotifications;
