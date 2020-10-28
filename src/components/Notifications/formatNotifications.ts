import { formatDistance, parseISO } from "date-fns";

import { Notification } from "shared/types/apiSchema";

import getUnreadNotifications from "./getUnreadNotifications";
import { FormattedNotification } from "./types";

const now = new Date();

/**
 * Formats a list of notifications, by adding a new date property
 * to show the relative time since it was created and also filtering
 * the unread ones
 */
const formatNotifications = (notifications: Notification[]): FormattedNotification[] => {
  const unreadNotifications = getUnreadNotifications(notifications);

  return unreadNotifications.map(unreadNotification => ({
    ...unreadNotification,
    createdAtDistance: formatDistance(parseISO(unreadNotification.created_at), now, {
      addSuffix: true,
    }),
  }));
};

export default formatNotifications;
