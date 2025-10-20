"use client";

import { useEffect, useState } from "react";
import { getShopNotice } from "@/api/notice/NoticeApi";
import { NoticeDetailItem } from "@/types/notice";

interface useShopNoticeDetailData {
  noticeDetail: NoticeDetailItem | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useShopNoticeDetail = (shopId: string | null, noticeId: string | null): useShopNoticeDetailData => {
  const [noticeDetail, setNoticeDetail] = useState<NoticeDetailItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 공고 상세 정보 함수
  const fetchNoticeDetail = async () => {
    if (!shopId || !noticeId) {
      setNoticeDetail(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await getShopNotice(shopId, noticeId);

      setNoticeDetail(response.item);
    } catch (err) {
      const message = err instanceof Error ? err.message : "공고 정보를 불러오는데 실패했습니다.";
      setError(message);
      setNoticeDetail(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNoticeDetail();
  }, [shopId, noticeId]);

  return {
    noticeDetail,
    isLoading,
    error,
    refetch: fetchNoticeDetail,
  };
};
