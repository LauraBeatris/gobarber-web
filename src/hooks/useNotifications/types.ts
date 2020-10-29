import { Notification } from "shared/types/apiSchema";

export interface FormattedNotification extends Notification {
  createdAtDistance: string;
}

export interface UseNotificationsPayload {
  markNotificationsAsRead: () => void;
  unreadNotifications: FormattedNotification[];
  isLoading: boolean;
  refetch: () => void;
}
