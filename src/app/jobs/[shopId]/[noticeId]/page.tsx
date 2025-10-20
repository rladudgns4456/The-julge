"use client";

import { useParams, useRouter } from "next/navigation";
import { NoticeInfo } from "@/components/owner/notice/NoticeInfo";
import { useShopNoticeDetail } from "@/hooks/useShopNoticeDetail";
import { useAuth } from "@/hooks/useAuth";
import { useNoticeApplication } from "@/hooks/useNoticeApplication";
import { PostData } from "@/types/post";
import { LatestNotice } from "@/components/owner/notice/LatestNotice";
import { useEffect } from "react";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const shopId = typeof params.shopId === "string" ? params.shopId : null;
  const noticeId = typeof params.noticeId === "string" ? params.noticeId : null;

  const { noticeDetail, isLoading, error } = useShopNoticeDetail(shopId, noticeId);

  const { isApplying, applicationError, hasApplied, applicationStatus, applyForNotice } =
    useNoticeApplication(noticeDetail);

  useEffect(() => {
    if (!isLoading && !error && noticeDetail && noticeId && shopId) {
      // PostCar가 필요로 하는 PostData 형식으로 현재 공고 데이터로 변환
      const currentNotice: PostData = {
        id: noticeId,
        hourlyPay: noticeDetail.hourlyPay,
        startsAt: noticeDetail.startsAt,
        workhour: noticeDetail.workhour,
        closed: noticeDetail.closed,
        shop: {
          id: shopId,
          name: noticeDetail.shop.item.name,
          address1: noticeDetail.shop.item.address1,
          imageUrl: noticeDetail.shop.item.imageUrl,
          originalHourlyPay: noticeDetail.shop.item.originalHourlyPay,
        },
      };

      // localStorage에서 기존 목록 읽기
      const storage = localStorage.getItem("latest");
      let latestList: PostData[] = storage ? JSON.parse(storage) : [];

      // 현재 공고가 이미 목록에 있는지 확인하고, 있다면 제거(최신순 유지)
      latestList = latestList.filter(item => item.id !== currentNotice.id);

      // 현재 공고를 목록 맨 앞에 추가
      latestList.unshift(currentNotice);

      // 목록을 6개로 제한
      const limitedList = latestList.slice(0, 7);

      // localStorage에 다시 저장
      localStorage.setItem("latest", JSON.stringify(limitedList));

      // 현재 탭의 LatestNotice 컴포넌트도 바로 갱신 (수동 이벤트 발생)
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "latest",
          newValue: JSON.stringify(limitedList),
        }),
      );
    }
  }, [isLoading, error, noticeDetail, noticeId, shopId]);

  // 로딩 중
  if (isLoading) {
    return (
      <main className="w-full min-h-screen bg-gray-5 flex items-center justify-center">
        <div className="text-body-1-regular text-gray-40">로딩 중...</div>
      </main>
    );
  }

  // 에러 발생
  if (error || !noticeDetail) {
    return (
      <main className="w-full min-h-screen bg-gray-5 flex items-center justify-center">
        <div className="text-center">
          <p className="text-body-1-regular text-red-40 mb-4">{error || "공고를 찾을 수 없습니다."}</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-primary-20 text-white rounded hover:bg-primary-30"
          >
            돌아가기
          </button>
        </div>
      </main>
    );
  }

  // 신청하기 핸들러
  const handleApply = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    if (user.type !== "employee") {
      alert("알바 계정만 신청할 수 있습니다.");
      return;
    }

    await applyForNotice();
  };

  return (
    <main className="w-full min-h-screen bg-gray-5 flex flex-col items-center">
      {/* 공고 상세 정보 */}
      <section className="max-w-[964px] w-full py-[60px]">
        <div className="mb-6">
          <span className="text-primary-20 text-body-1-bold mb-2 block">{noticeDetail.shop.item.category}</span>
          <h1 className="text-h1">{noticeDetail.shop.item.name}</h1>
        </div>
        <NoticeInfo
          noticeDetail={noticeDetail}
          userRole="employee"
          onApply={handleApply}
          hasApplied={hasApplied}
          applicationStatus={applicationStatus}
          isApplying={isApplying}
          applicationError={applicationError}
        />
      </section>

      {/* 최근에 본 공고 목록 */}
      <section className="max-w-[964px] w-full py-[60px]">
        <h2 className="text-h1 mb-8">최근에 본 공고</h2>
        <LatestNotice />
      </section>
    </main>
  );
}
