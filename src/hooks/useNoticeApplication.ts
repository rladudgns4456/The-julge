"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { NoticeDetailItem } from "@/types/notice";
import { ApplicationStatus } from "@/types/application";
import { postNoticeApplications } from "@/api/application/ApplicationApi";

interface UseNoticeApplicationReturn {
  isApplying: boolean;
  applicationError: string | null;
  hasApplied: boolean;
  applicationStatus: ApplicationStatus | null;
  applyForNotice: () => Promise<void>;
}

/** ✅ 공고 신청 관련 훅 */
export const useNoticeApplication = (noticeDetail: NoticeDetailItem | null): UseNoticeApplicationReturn => {
  const { user } = useAuth();
  const router = useRouter();

  const [isApplying, setIsApplying] = useState(false);
  const [applicationError, setApplicationError] = useState<string | null>(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus | null>(null);

  // ✅ 기존 신청 상태 체크
  useEffect(() => {
    if (noticeDetail?.currentUserApplication) {
      setHasApplied(true);
      setApplicationStatus(noticeDetail.currentUserApplication.item.status);
    } else {
      setHasApplied(false);
      setApplicationStatus(null);
    }
  }, [noticeDetail]);

  // ✅ 공고 신청 함수
  const applyForNotice = useCallback(async () => {
    if (!noticeDetail || !user) {
      setApplicationError("로그인이 필요합니다.");
      return;
    }

    if (user.type !== "employee") {
      setApplicationError("알바 계정만 신청할 수 있습니다.");
      return;
    }

    if (noticeDetail.closed) {
      setApplicationError("마감된 공고입니다.");
      return;
    }

    if (hasApplied) {
      setApplicationError("이미 신청한 공고입니다.");
      return;
    }

    setIsApplying(true);
    setApplicationError(null);

    try {
      // ✅ userId 포함해 신청
      const response = await postNoticeApplications(
        noticeDetail.shop.item.id,
        noticeDetail.id,
        user.id, // ✅ 핵심 추가
      );

      if (response) {
        setHasApplied(true);
        setApplicationStatus("pending");
        alert("신청이 완료되었습니다!");

        // ✅ 신청 성공 후 약간의 딜레이 후 프로필로 이동
        setTimeout(() => {
          router.push("/profile");
        }, 700);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "신청에 실패했습니다.";
      setApplicationError(errorMessage);
      alert(errorMessage);
    } finally {
      setIsApplying(false);
    }
  }, [noticeDetail, user, hasApplied, router]);

  return {
    isApplying,
    applicationError,
    hasApplied,
    applicationStatus,
    applyForNotice,
  };
};
