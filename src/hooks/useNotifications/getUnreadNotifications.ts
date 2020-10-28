
import { Notification } from "shared/types/apiSchema";

/**
 * Receives a list of notifications and return the unread ones
 */
const getUnreadNotifications = (notifications: Notification[]): Notification[] => (
  notifications.filter(notification => !notification.read)
);

export default getUnreadNotifications;
