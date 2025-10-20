"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfile } from "@/api/profile/profileApi";
import { AuthLoginApi } from "@/contexts/AuthLoginApi";

export default function ProfilePage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const user = AuthLoginApi.getCurrentUser() ?? AuthLoginApi.restoreUserFromStorage();

    if (!user?.id) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    const checkProfile = async () => {
      try {
        const profileRes = await getProfile(user.id);

        const hasProfile = profileRes && (profileRes.name || profileRes.phone || profileRes.address || profileRes.bio);

        if (hasProfile) {
          router.replace("/profile/detail"); // ✅ 프로필 있으면 상세페이지로
        } else {
          router.replace("/profile/register"); // ✅ 없으면 등록페이지로
        }
      } catch (err) {
        console.error("프로필 확인 실패:", err);
        router.replace("/profile/register");
      } finally {
        setChecking(false);
      }
    };

    checkProfile();
  }, [router]);

  if (checking)
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-500">
        프로필 정보를 확인 중입니다...
      </main>
    );

  return null;
}
