import { useCallback, useEffect, useState } from "react";
import instance from "@/api/axios";
import { useAuth } from "@/hooks/useAuth";
import { NotificationItem, NotificationListResponse } from "@/types/notification";
import { useInfinitePagination } from "@/hooks/useInfinitePagination";

const ITEMS_PER_PAGE = 10;

export const useNotifications = () => {
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState<number>(0);

  //   알림 목록 조회
  const fetchNotifications = useCallback(
    async (offset: number, limit: number) => {
      if (!user) {
        return { items: [], hasNext: false };
      }

      const response = await instance.get<NotificationListResponse>(
        `/users/${user.id}/alerts?offset=${offset}&limit=${limit}`,
      );
      return {
        items: response.data.items,
        hasNext: response.data.hasNext,
      };
    },
    [user],
  );

  // 무한 페이지네이션 훅
  const {
    items: notifications,
    isLoading,
    isLoadingMore,
    hasMore,
    error,
    loadInitial,
    loadMore,
    refresh,
    reset,
  } = useInfinitePagination<NotificationItem>({
    fetchFunction: fetchNotifications,
    itemsPerPage: ITEMS_PER_PAGE,
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
        const updatedNotifications = notifications.map(notif =>
          notif.item.id === alertsId ? { ...notif, item: { ...notif.item, read: true } } : notif,
        );

        await instance.put(`/users/${user.id}/alerts/${alertsId}`);

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
      loadInitial();
    } else {
      reset();
      setUnreadCount(0);
    }
  }, [user?.id]);

  return {
    notifications,
    unreadCount,
    isLoading,
    isLoadingMore,
    hasMore,
    error,
    loadMore,
    refresh,
    markAsRead,
  };
};
