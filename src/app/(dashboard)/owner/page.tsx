"use client";

import { useAuth } from "@/hooks/useAuth";
import { useUserData } from "@/hooks/useUserData";
import { useNoticeData } from "@/hooks/useNoticeData";

import { EmptyShop } from "@/components/owner/EmptyShop";
import { ShopInfo } from "@/components/owner/ShopInfo";
import { EmptyNotice } from "@/components/owner/EmptyNotice";
import { NoticeList } from "@/components/owner/NoticeList";

export default function OwnerPage() {
  const { user } = useAuth();
  const { userData, isLoading: isUserLoading, error: userError } = useUserData(user?.id);

  // 가게 정보 가져오기
  const shop = userData?.shop?.item || null;

  // 공고 목록 가져오기
  const {
    notices,
    isLoading: isNoticesLoading,
    error: noticesError,
    hasNext,
    count,
    loadMore,
  } = useNoticeData(shop, { limit: 6 });

  // 가게 로딩
  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>로딩 중...</div>
      </div>
    );
  }

  // 가게 에러
  if (userError) {
    return (
      <main className="w-full max-w-[964px] mx-auto px-8 py-[60px]">
        <div className="text-red-500">에러: {userError}</div>
      </main>
    );
  }

  // 조건 1: 가게가 등록되지 않은 경우
  if (!shop) {
    return (
      <main className="w-full h-screen max-w-[964px] mx-auto px-8">
        <section className="mt-[60px]">
          <h1 className="text-h1 mb-6">내 가게</h1>
          <EmptyShop />
        </section>
      </main>
    );
  }

  // 조건 2 & 3: 가게는 등록되어 있는 경우
  return (
    <main className="w-full flex flex-col items-center">
      {/* 가게 정보 섹션 */}
      <ShopInfo shop={shop} />

      {/* 공고 섹션 */}
      <section className="w-full h-full pt-[60] pb-[120px] bg-gray-5">
        <div className="max-w-[964px] w-full mx-auto">
          <h2 className="text-h1 mb-6 ">{count > 0 ? "내가 등록한 공고" : "등록한 공고"}</h2>

          {noticesError ? (
            <div className="text-red-500 p-4 border border-red-500 rounded">
              공고 목록을 불러오는데 실패했습니다: {noticesError}
            </div>
          ) : notices.length === 0 && !isNoticesLoading ? (
            <EmptyNotice />
          ) : (
            <NoticeList notices={notices} hasNext={hasNext} isLoading={isNoticesLoading} loadMore={loadMore} />
          )}
        </div>
      </section>
    </main>
  );
}
