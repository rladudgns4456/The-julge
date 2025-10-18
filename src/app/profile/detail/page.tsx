"use client";

import { useEffect, useState } from "react";
import instance from "@/api/axios";

interface ProfileData {
  name: string;
  phone: string;
  region: string;
  intro: string;
}

export default function ProfileDetailPage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
        return;
      }

      try {
        const res = await instance.get(`/users/${userId}`);
        setProfile(res.data);
      } catch (err) {
        console.error("프로필 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) return <p className="text-center mt-10">불러오는 중...</p>;
  if (!profile) return <p className="text-center mt-10">프로필 정보를 불러오지 못했습니다.</p>;

  return (
    <main
      className="
        w-full max-w-[957px] mx-auto
        px-5 tablet:px-6
        pt-[40px] pb-[120px]
        min-h-screen
      "
    >
      <h1 className="text-h2 font-bold mb-[40px]">내 프로필</h1>

      <div className="border border-gray-10 rounded-[12px] bg-gray-0 p-[32px]">
        <p className="text-body-1-semibold mb-2">이름: {profile.name}</p>
        <p className="text-body-1-semibold mb-2">연락처: {profile.phone}</p>
        <p className="text-body-1-semibold mb-2">선호 지역: {profile.region}</p>
        <p className="text-body-1-regular">소개: {profile.intro}</p>
      </div>
    </main>
  );
}
