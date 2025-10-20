"use client";

import { useCallback, useEffect, useState } from "react";
import { ApplicationNoticeItem } from "@/types/application";
import { getNoticeApplications, putNoticeApplications } from "@/api/application/ApplicationApi";

const ITEMS_PER_PAGE = 5;

interface UseApplicationsData {
  applications: ApplicationNoticeItem[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  refetch: () => Promise<void>;
  handlePageChange: (page: number) => void;
  approveApplication: (applicationId: string) => Promise<void>;
  rejectApplication: (applicationId: string) => Promise<void>;
}

export const useApplications = (shopId: string | null, noticeId: string | null): UseApplicationsData => {
  const [applications, setApplications] = useState<ApplicationNoticeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // 총 페이지 수 계싼
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // offset 계산
  const calculateOffset = (page: number): number => {
    return (page - 1) * ITEMS_PER_PAGE;
  };

  // 신청자 목록 패칭
  const fetchApplications = useCallback(async () => {
    if (!shopId || !noticeId) {
      setApplications([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const offset = calculateOffset(currentPage);

      const response = await getNoticeApplications(shopId, noticeId, {
        offset,
        limit: ITEMS_PER_PAGE,
      });

      const applicationItems = response.items.map(info => info.item);

      setApplications(applicationItems);
      setTotalCount(response.count);
    } catch (err) {
      const message = err instanceof Error ? err.message : "신청자 목록을 불러오는데 실패했습니다.";
      setError(message);
      setApplications([]);
      setTotalCount(0);
    } finally {
      setIsLoading(false);
    }
  }, [shopId, noticeId, currentPage]);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalCount) return;
    setCurrentPage(page);
  };

  // 신청 승인
  const approveApplication = async (applicationId: string) => {
    if (!shopId || !noticeId) return;

    try {
      await putNoticeApplications(shopId, noticeId, applicationId, {
        status: "accepted",
      });

      setApplications(prev =>
        prev.map(app => (app.id === applicationId ? { ...app, status: "accepted" as const } : app)),
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : "승인 처리에 실패했습니다.";
      setError(message);
      throw err;
    }
  };

  // 신청 거절

  const rejectApplication = async (applicationId: string) => {
    if (!shopId || !noticeId) return;

    try {
      await putNoticeApplications(shopId, noticeId, applicationId, {
        status: "rejected",
      });

      setApplications(prev =>
        prev.map(app => (app.id === applicationId ? { ...app, status: "rejected" as const } : app)),
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : "거절 처리에 실패했습니다.";
      setError(message);
      throw err;
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return {
    applications,
    isLoading,
    error,
    currentPage,
    totalPages,
    totalCount,
    refetch: fetchApplications,
    handlePageChange,
    approveApplication,
    rejectApplication,
  };
};
