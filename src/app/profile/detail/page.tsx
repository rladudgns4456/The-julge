"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/button";
import { AuthLoginApi } from "@/contexts/AuthLoginApi";
import { getProfile, getApplications } from "@/api/profile/profileApi";

interface ProfileData {
  name: string;
  phone: string;
  address: string;
  bio: string;
}

interface ApplicationData {
  id: number;
  shopName: string;
  noticeTitle: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

export default function ProfileDetailPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoredUser = AuthLoginApi.restoreUserFromStorage();
    if (!restoredUser?.id) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }
    setUserId(restoredUser.id);
    fetchData(restoredUser.id);
  }, [router]);

  const fetchData = async (id: string) => {
    try {
      const [profileRes, appRes] = await Promise.all([getProfile(id), getApplications(id)]);

      setProfile({
        name: profileRes.name || "",
        phone: profileRes.phone || "",
        address: profileRes.address || "",
        bio: profileRes.bio || "",
      });

      const apps = Array.isArray(appRes) ? appRes : Array.isArray(appRes.applications) ? appRes.applications : [];

      setApplications(apps);
    } catch (error) {
      console.error("❌ 데이터 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">불러오는 중...</p>;

  if (!profile)
    return (
      <main className="min-h-screen w-full max-w-[957px] mx-auto px-5 pt-[40px] pb-[120px]">
        <section className="border border-gray-20 rounded-[8px] bg-white py-[56px] px-[24px] text-center shadow">
          <p className="text-body-1-regular text-gray-50 mb-[28px]">
            내 프로필을 등록하고 원하는 가게에 지원해 보세요.
          </p>
          <Button
            variant="primary"
            size="large"
            className="w-[240px] h-[47px] mx-auto"
            onClick={() => router.push("/profile/register")}
          >
            내 프로필 등록하기
          </Button>
        </section>
      </main>
    );

  return (
    <main className="min-h-screen w-full max-w-[957px] mx-auto px-5 pt-[40px] pb-[120px]">
      <h1 className="text-h2 font-bold mb-[24px] text-black">내 프로필</h1>

      {/* 프로필 카드 */}
      <section className="border border-gray-20 rounded-[8px] bg-[#FFF5F5] py-[32px] px-[24px] mb-[80px] relative shadow-sm">
        <div className="flex flex-col gap-[8px] text-gray-900">
          <div className="flex items-center justify-between mb-[8px]">
            <p className="text-h3 font-semibold text-red-500">이름</p>
            <Button
              variant="outlined"
              size="small"
              onClick={() => router.push("/profile/edit")}
              className="px-[12px] py-[4px] text-gray-80 border-gray-30"
            >
              편집하기
            </Button>
          </div>

          <p className="text-body-1-semibold text-black">{profile.name}</p>
          <p className="text-body-2-regular text-gray-70 flex items-center gap-2">📞 {profile.phone}</p>
          <p className="text-body-2-regular text-gray-70 flex items-center gap-2">📍 {profile.address}</p>
          <p className="text-body-1-regular text-gray-80 mt-[8px] leading-relaxed">{profile.bio}</p>
        </div>
      </section>

      {/* 신청 내역 */}
      <section>
        <h2 className="text-h3 font-bold mb-[24px] text-black">신청 내역</h2>

        {applications.length > 0 ? (
          <div className="border border-gray-20 rounded-[8px] bg-white shadow-sm divide-y divide-gray-10">
            {applications.map(app => (
              <div key={app.id} className="flex justify-between items-center p-[20px] hover:bg-gray-50 transition">
                <div>
                  <p className="text-body-1-semibold text-black">{app.noticeTitle}</p>
                  <p className="text-body-2-regular text-gray-60">
                    {app.shopName} • {new Date(app.createdAt).toLocaleDateString("ko-KR")}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    app.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : app.status === "accepted"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {app.status === "pending" ? "대기중" : app.status === "accepted" ? "승인됨" : "거절됨"}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-gray-20 rounded-[8px] bg-gray-0 py-[56px] px-[24px] text-center shadow">
            <p className="text-body-1-regular text-gray-50 mb-[28px]">아직 신청 내역이 없어요.</p>
            <Button
              variant="primary"
              size="large"
              className="w-[240px] h-[47px] mx-auto"
              onClick={() => router.push("/jobs")}
            >
              공고 보러가기
            </Button>
          </div>
        )}
      </section>
    </main>
  );
}
