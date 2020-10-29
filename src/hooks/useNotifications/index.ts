import { useMemo, useCallback } from "react";
import {
  useInfiniteQuery,
  useQueryCache,
  useMutation,
} from "react-query";
import { AxiosError } from "axios";
import { formatDistance, parseISO } from "date-fns";
import flatten from "lodash.flatten";

import { Notification } from "shared/types/apiSchema";
import api from "settings/api";

import { PaginatedNotifications, FormattedNotification, UseNotificationsPayload } from "./types";

const now = new Date();

const fetchNotifications = async (_key: string, page = 1): Promise<PaginatedNotifications> => {
  const notifications = await (
    api.get<FormattedNotification[], {
      data: FormattedNotification[];
    }>(`/notifications?page=${page}`)
      .then(response => (
        response.data
          .map(notification => ({
            ...notification,
            createdAtDistance: formatDistance(parseISO(notification.created_at), now, {
              addSuffix: true,
            }),
          }))
      ))
  );

  return {
    notifications,
    page: page + 1,
  };
};

const markNotificationsAsReadMutation = async (
  notifications: PaginatedNotifications[],
): Promise<Notification[][]> => {
  const flattenNotifications = flatten(notifications.map(
    notification => notification.notifications,
  ));

  const promises = (flattenNotifications).map(unreadNotification => (
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
    data: notifications,
    refetch,
    isLoading: isQueryLoading,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery<PaginatedNotifications, AxiosError>("notifications", fetchNotifications, {
    getFetchMore: (lastGroup, _allGroups) => (
      lastGroup?.page ?? 1
    ),
  });

  const handleFetchMore = useCallback(() => {
    fetchMore();
  }, [fetchMore]);

  const [
    mutate,
    { isLoading: isMutationLoading },
  ] = useMutation<Notification[][], AxiosError, PaginatedNotifications[], PaginatedNotifications[]>(
    markNotificationsAsReadMutation, {
      onMutate: (_variables: PaginatedNotifications[]) => {
        queryCache.cancelQueries("notifications");

        const previousNotifications = queryCache.getQueryData<PaginatedNotifications[]>(
          ["notifications"],
        );

        queryCache.setQueryData(["notifications"], []);

        return previousNotifications ?? [];
      },
      onError: (_error, _variables, previousValue) => {
        queryCache.setQueryData(["notifications"], previousValue);
      },
      throwOnError: false,
    },
  );

  const coalescingNotifications = notifications ?? [];

  const flattenNotifications = flatten(
    (coalescingNotifications ?? [])?.map(notification => notification.notifications),
  );

  const payload = useMemo<UseNotificationsPayload>(() => ({
    markNotificationsAsRead: () => mutate(notifications),
    notifications: flattenNotifications ?? [],
    handleFetchMore,
    canFetchMore,
    isLoading: isQueryLoading || isMutationLoading,
    refetch,
  }), [
    flattenNotifications,
    isMutationLoading,
    handleFetchMore,
    isQueryLoading,
    notifications,
    canFetchMore,
    refetch,
    mutate,
  ]);

  return payload;
};

export default useNotifications;
