"use client";

import { useParams, useRouter } from "next/navigation";
import { NoticeInfo } from "@/components/owner/notice/NoticeInfo";
import { ApplicationList } from "@/components/owner/notice/ApplicationList";
import { useShopNoticeDetail } from "@/hooks/useShopNoticeDetail";

export default function NoticeDetailPage() {
  const params = useParams();
  const router = useRouter();

  const shopId = typeof params.shopId === "string" ? params.shopId : null;
  const noticeId = typeof params.noticeId === "string" ? params.noticeId : null;

  const { noticeDetail, isLoading, error } = useShopNoticeDetail(shopId, noticeId);

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

  return (
    <main className="w-full h-full bg-gray-5 flex flex-col items-center">
      {/* 공고 상세 정보 */}
      <section className="max-w-[964px] w-full py-[60px] tablet:px-8 mobile:px-3">
        <div className="mb-6">
          <span className="text-primary-20 text-body-1-bold mb-2 block">{noticeDetail.shop.item.category}</span>
          <h1 className="text-h1">{noticeDetail.shop.item.name}</h1>
        </div>
        <NoticeInfo noticeDetail={noticeDetail} userRole="employer" />
      </section>
      {/* 신청자 목록 */}
      <section className="max-w-[964px] w-full py-[60px] tablet:px-8 mobile:px-3">
        <h2 className="text-h1 mb-8">신청자 목록</h2>
        {shopId && noticeId ? (
          <ApplicationList shopId={shopId} noticeId={noticeId} />
        ) : (
          <div className="text-body-1-regular text-gray-40">유효한 공고 정보가 없습니다.</div>
        )}
      </section>
    </main>
  );
}
