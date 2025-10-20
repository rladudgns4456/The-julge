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
  hourlyPay?: number;
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
        name: profileRes?.name ?? "",
        phone: profileRes?.phone ?? "",
        address: profileRes?.address ?? "",
        bio: profileRes?.bio ?? "",
      });

      // ✅ 다양한 응답 형태 대응
      const apps = Array.isArray(appRes)
        ? appRes
        : Array.isArray(appRes?.applications)
          ? appRes.applications
          : Array.isArray(appRes?.data)
            ? appRes.data
            : Array.isArray(appRes?.items)
              ? appRes.items
              : Array.isArray(appRes?.result)
                ? appRes.result
                : [];

      console.log("📦 신청 내역 응답:", appRes);
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

      {/* 신청 내역 (테이블 형식) */}
      <section>
        <h2 className="text-h3 font-bold mb-[24px] text-black">신청 내역</h2>

        {applications.length > 0 ? (
          <div className="border border-gray-20 rounded-[8px] bg-white shadow-sm overflow-hidden">
            <table className="w-full border-collapse text-center">
              <thead className="bg-[#FFF5F5]">
                <tr className="text-body-2-semibold text-gray-800">
                  <th className="py-4 px-6 text-left">가게</th>
                  <th className="py-4 px-6">일자</th>
                  <th className="py-4 px-6">시급</th>
                  <th className="py-4 px-6">상태</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(app => (
                  <tr key={app.id} className="border-t border-gray-10 hover:bg-gray-50 transition">
                    <td className="py-4 px-6 text-left text-gray-900 text-body-1-regular">{app.shopName}</td>
                    <td className="py-4 px-6 text-gray-700 text-body-2-regular">
                      {new Date(app.createdAt).toLocaleDateString("ko-KR")} 10:00 ~ 12:00 (2시간)
                    </td>
                    <td className="py-4 px-6 text-gray-900 text-body-2-semibold">
                      {(app.hourlyPay ?? 15000).toLocaleString()}원
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          app.status === "accepted"
                            ? "bg-blue-100 text-blue-700"
                            : app.status === "pending"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {app.status === "accepted" ? "승인 완료" : app.status === "pending" ? "대기중" : "거절"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
