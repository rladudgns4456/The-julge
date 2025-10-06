import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { NotificationItem } from "@/types/notification";
import { getMockNotificationResponse } from "@/lib/MockNotif";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export const useNotifications = () => {
  const { user } = useAuth();

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  //   알림 목록 조회
  const fetchNotifications = async () => {
    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      if (USE_MOCK) {
        const mockData = getMockNotificationResponse();
        setNotifications(mockData.items);
        // 읽지 않은 알림 개수
        const unread = mockData.items.filter(n => !n.item.read).length;
        setUnreadCount(unread);

        setIsLoading(false);
        return;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "알림을 불러오는데 실패했습니다.";
      setError(new Error(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 알림 읽음 처리
   *
   * @param alertsId - 읽음 처리할 알림 ID
   */

  const markAsRead = async (alertsId: string) => {
    try {
      setNotifications(prev =>
        prev.map(notif => (notif.item.id === alertsId ? { ...notif, item: { ...notif.item, read: true } } : notif)),
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
      return;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "읽음 처리에 실패했습니다.";
      throw new Error(errorMessage);
    }
  };

  // 새로고침
  const refresh = () => {
    fetchNotifications();
  };

  // 초기 로드
  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    refresh,
    markAsRead,
  };
};
