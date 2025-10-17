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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await instance.get("/users/me");
        setProfile(res.data);
      } catch (err) {
        console.error("프로필 불러오기 실패:", err);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <p className="text-center mt-10">불러오는 중...</p>;

  return (
    <main className="w-full max-w-[957px] mx-auto px-5 pt-[40px] pb-[120px]">
      <h1 className="text-h2 font-bold mb-[24px]">내 프로필</h1>

      <div className="bg-[#FFF1EE] rounded-[8px] p-[32px] shadow mb-[40px]">
        <Field label="이름">{profile.name}</Field>
        <Field label="연락처">{profile.phone}</Field>
        <Field label="선호 지역">{profile.region}</Field>
        <Field label="소개">{profile.intro}</Field>
      </div>
    </main>
  );
}

/* ✅ 타입 명시된 Field 컴포넌트 */
type FieldProps = {
  label: string;
  children: React.ReactNode;
};

function Field({ label, children }: FieldProps) {
  return (
    <div className="mb-[12px]">
      <p className="text-body-1-regular text-primary-20 mb-[4px]">{label}</p>
      <p className="text-body-2 text-gray-70">{children}</p>
    </div>
  );
}
