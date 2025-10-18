import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { NotificationItem } from "@/types/notification";
import { useInfinitePagination } from "@/hooks/useInfinitePagination";
import { getAlerts, putAlerts } from "@/api/alert/AlertsApi";

const ITEMS_LIMIT = 10;

export const useNotifications = () => {
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState<number>(0);

  //   알림 목록 조회
  const fetchNotifications = useCallback(
    async (offset: number, limit: number) => {
      if (!user) {
        return { items: [], hasNext: false };
      }

      const response = await getAlerts(user.id, offset, limit);
      return {
        items: response.items,
        hasNext: response.hasNext,
      };
    },
    [user],
  );

  // 무한 페이지네이션 훅
  const {
    items: notifications,
    isLoading,
    hasNext,
    error,
    loadMore,
    refresh,
    reset,
  } = useInfinitePagination<NotificationItem>({
    fetchFunction: fetchNotifications,
    limit: ITEMS_LIMIT,
  });

  // 읽지 않은 알림 개수 계산

  useEffect(() => {
    const unread = notifications.filter(n => !n.item.read).length;
    setUnreadCount(unread);
  }, [notifications]);

  /**
   * 알림 읽음 처리
   *
   * @param alertsId - 읽음 처리할 알림 ID
   */

  const markAsRead = useCallback(
    async (alertsId: string) => {
      if (!user) {
        throw new Error("로그인이 필요합니다.");
      }

      try {
        await putAlerts(user.id, alertsId);

        refresh();
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "읽음 처리에 실패했습니다.";
        throw new Error(errorMessage);
      }
    },
    [user, refresh],
  );

  useEffect(() => {
    if (user) {
      refresh();
    } else {
      reset();
      setUnreadCount(0);
    }
  }, [user?.id]);

  return {
    notifications,
    unreadCount,
    isLoading,
    hasNext,
    error,
    loadMore,
    refresh,
    markAsRead,
  };
};
