"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/common/button";
import instance from "@/api/axios";

export default function ProfilePage() {
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setHasProfile(false);
          return;
        }

        const res = await instance.get(`/users/${userId}`);
        setHasProfile(!!res.data);
      } catch (err) {
        console.error("프로필 불러오기 실패:", err);
        setHasProfile(false);
      }
    };

    checkProfile();
  }, []);

  if (hasProfile === null) return <p className="text-center mt-10">프로필 정보를 불러오는 중...</p>;

  return (
    <main className="min-h-screen w-full max-w-[957px] mx-auto px-5 pt-[24px] pb-[96px]">
      <h1 className="text-h2 font-bold mb-[16px]">내 프로필</h1>

      {hasProfile ? (
        <Link href="/profile/detail">
          <Button variant="primary" size="large" className="w-[240px] h-[47px] mx-auto block">
            내 프로필 보기
          </Button>
        </Link>
      ) : (
        <section className="border border-gray-20 rounded-[8px] bg-white py-[56px] px-[24px] text-center shadow">
          <p className="text-body-1-regular text-gray-50 mb-[28px]">
            내 프로필을 등록하고 원하는 가게에 지원해 보세요.
          </p>
          <Link href="/profile/register">
            <Button variant="primary" size="large" className="w-[240px] h-[47px] mx-auto">
              내 프로필 등록하기
            </Button>
          </Link>
        </section>
      )}
    </main>
  );
}
