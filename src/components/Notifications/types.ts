import { Notification } from "shared/types/apiSchema";

export interface NotificationsButtonProps {
  showBadge: boolean;
  showNotifications: boolean;
}

export interface FormattedNotification extends Notification {
  createdAtDistance: string;
}
