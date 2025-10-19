"use client";

import { getShopNotices } from "@/api/notice/NoticeApi";
import { Notice } from "@/types/notice";
import { PostData } from "@/types/post";
import { ShopItem } from "@/types/shop";
import { useCallback, useEffect, useState } from "react";

interface UseNoticeDataReturn {
  notices: PostData[];
  isLoading: boolean;
  error: string | null;
  hasNext: boolean;
  count: number;
  loadMore: () => void;
  refetch: () => Promise<void>;
}

interface UseNoticeDataOptions {
  limit?: number;
}

export const useNoticeData = (shop: ShopItem | null, options: UseNoticeDataOptions = {}): UseNoticeDataReturn => {
  const [notices, setNotices] = useState<PostData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(false);
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState<number>(0);

  const { limit = 6 } = options;

  // ✅ useCallback으로 감싸서 불필요한 재생성 방지
  const fetchNotices = useCallback(
    async (currentOffset: number, shouldAppend: boolean = false) => {
      // shop 없으면 공고 조회 X
      if (!shop) {
        setNotices([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await getShopNotices(shop.id, { offset: currentOffset, limit });

        // Notice 추출 - map으로 item 추출
        const noticeItems: Notice[] = response.items.map(noticeInfo => noticeInfo.item);

        // Notice -> PostData 변환
        const postDataList: PostData[] = noticeItems.map(notice => ({
          id: notice.id,
          shop: {
            id: shop.id,
            name: shop.name,
            address1: shop.address1,
            imageUrl: shop.imageUrl,
            originalHourlyPay: shop.originalHourlyPay,
          },
          hourlyPay: notice.hourlyPay,
          startsAt: notice.startsAt,
          workhour: notice.workhour,
          closed: notice.closed,
        }));

        if (shouldAppend) {
          setNotices(prev => [...prev, ...postDataList]);
        } else {
          setNotices(postDataList);
        }

        // 상태 업데이트
        setHasNext(response.hasNext);
        setCount(response.count);
      } catch (err) {
        const message = err instanceof Error ? err.message : "공고 목록을 불러오는데 실패했습니다.";
        setError(message);

        if (currentOffset === 0) {
          setNotices([]);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [shop, limit],
  );

  const loadMore = useCallback(() => {
    if (!hasNext || isLoading) return;

    const nextOffset = offset + limit;
    setOffset(nextOffset);
    fetchNotices(nextOffset, true);
  }, [hasNext, isLoading, offset, limit, fetchNotices]);

  useEffect(() => {
    setOffset(0);
    fetchNotices(0, false);
  }, [shop?.id, fetchNotices]);

  const refetch = async () => {
    setOffset(0);
    await fetchNotices(0, false);
  };

  return {
    notices,
    isLoading,
    error,
    hasNext,
    count,
    loadMore,
    refetch,
  };
};
