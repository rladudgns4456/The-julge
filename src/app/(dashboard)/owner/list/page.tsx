"use client";

import { useEffect, useState } from "react";
import instance from "@/api/axios";
import { ShopInfo } from "@/components/owner/ShopInfo";
import { NoticeList } from "@/components/owner/NoticeList";
import Link from "next/link";
import Button from "@/components/common/button";
import { parsePostsResponse } from "@/utils/api";
import { PostData } from "@/types/post";
import { ShopInfomation } from "@/types/shop";

export default function OwnerNoticeListPage() {
  const [loading, setLoading] = useState(true);
  const [shop, setShop] = useState<ShopInfomation | null>(null);
  const [notices, setNotices] = useState<PostData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOwnerData = async () => {
      try {
        const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
        if (!userId) {
          setShop(null);
          setLoading(false);
          return;
        }

        // 사용자 + 가게 정보 조회
        const res = await instance.get(`/users/${userId}`);
        const userData = (res as any).data?.item || (res as any).data;
        const shopInfo: ShopInfomation | null = userData?.shop || null;
        setShop(shopInfo);

        // 공고 목록 조회 후 해당 가게 ID로 필터링
        if (shopInfo?.item?.id) {
          const params = new URLSearchParams();
          params.append("offset", "0");
          params.append("limit", "100");
          params.append("sort", "time");

          const noticesRes = await instance.get(`/notices?${params.toString()}`);
          const allPosts = parsePostsResponse(noticesRes.data);
          const shopPosts = allPosts.filter(p => p.shop.id === shopInfo.item.id);
          setNotices(shopPosts);
        }
      } catch (err) {
        console.error("오너 리스트 페이지 불러오기 실패:", err);
        setError("데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    loadOwnerData();
  }, []);

  if (loading) return <p className="text-center mt-10">불러오는 중...</p>;

  return (
    <main className="min-h-screen w-full max-w-[964px] mx-auto px-5 pt-[24px] pb-[96px]">
      {/* 상단: 내 가게 카드 */}
      {shop ? (
        <ShopInfo shop={shop as any} />
      ) : (
        <section className="border border-gray-20 rounded-[8px] bg-white py-[56px] px-[24px] text-center shadow">
          <p className="text-body-1-regular text-gray-50 mb-[28px]">내 가게를 소개하고 공고도 등록해 보세요.</p>
          <Link href="/owner/register_Info">
            <Button variant="primary" size="large" className="w-[240px] h-[47px] mx-auto">
              내 가게 등록하기
            </Button>
          </Link>
        </section>
      )}

      {/* 하단: 내가 등록한 공고 섹션 */}
      <section className="w-full max-w-[964px] mx-auto mt-[40px]">
        <h2 className="text-h2 font-bold mb-[16px]">내가 등록한 공고</h2>
        {error ? (
          <div className="border border-red-200 bg-red-50 text-red-600 rounded p-4">{error}</div>
        ) : notices.length > 0 ? (
          <NoticeList notices={notices} />
        ) : (
          <div className="w-full border border-gray-20 rounded-xl">
            <div className="flex flex-col items-center gap-6 py-[60px]">
              <span className="text-body-1-regular">공고를 등록해 보세요.</span>
              <Link href={"/owner/register_Notice"} className="max-w-[346px] w-full">
                <Button variant="primary" className="w-full" size="large">
                  공고 등록하기
                </Button>
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}