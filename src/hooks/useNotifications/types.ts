import { Notification } from "shared/types/apiSchema";

export interface FormattedNotification extends Notification {
  createdAtDistance: string;
}

export interface PaginatedNotifications {
  page: number;
  notifications: FormattedNotification[];
}

export interface UseNotificationsPayload {
  markNotificationsAsRead: () => void;
  notifications: FormattedNotification[];
  handleFetchMore: () => void;
  canFetchMore?: boolean;
  isLoading: boolean;
  refetch: () => void;
}
