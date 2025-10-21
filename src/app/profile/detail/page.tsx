"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/button";
import { AuthLoginApi } from "@/contexts/AuthLoginApi";
import { getProfile, getApplications } from "@/api/profile/profileApi";
import { MapPin, Phone } from "lucide-react";

interface ProfileData {
  name: string;
  phone: string;
  address: string;
  bio: string;
}

interface ApplicationData {
  id: number;
  shopName: string;
  startsAt: string;
  workhour: number;
  hourlyPay?: number; // ✅ 옵셔널로 수정
  status: "pending" | "accepted" | "rejected";
}

export default function ProfileDetailPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    const restoredUser = AuthLoginApi.restoreUserFromStorage();
    if (!restoredUser?.id) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }
    fetchData(restoredUser.id);
  }, [router]);

  const fetchData = async (id: string) => {
    try {
      const [profileRes, appRes] = await Promise.all([getProfile(id), getApplications(id)]);
      setProfile(profileRes);
      setApplications(appRes ?? []);
    } catch (error) {
      console.error("❌ 데이터 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (startsAt: string, workhour: number) => {
    const start = new Date(startsAt);
    if (isNaN(start.getTime())) return "-";

    const end = new Date(start.getTime() + workhour * 60 * 60 * 1000);
    const date = start.toISOString().split("T")[0];
    const startTime = start.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false });
    const endTime = end.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false });

    return `${date} ${startTime} ~ ${endTime} (${workhour}시간)`;
  };

  const totalPages = Math.ceil(applications.length / ITEMS_PER_PAGE);
  const paginatedApps = applications.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (loading) return <p className="text-center mt-10">불러오는 중...</p>;

  return (
    <main className="min-h-screen w-full max-w-[957px] mx-auto px-5 pt-[40px] pb-[120px]">
      {/* 🧾 내 프로필 */}
      <h1 className="text-h2 font-bold mb-[24px] text-black">내 프로필</h1>

      {profile && (
        <section className="border border-gray-20 rounded-[12px] bg-[#FFF5F5] py-[32px] px-[24px] mb-[80px] shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-[6px]">
              <p className="text-red-500 text-body-2-semibold">이름</p>
              <h2 className="text-h3 font-bold text-black">{profile.name}</h2>
              <p className="flex items-center gap-2 text-gray-500 text-body-2-regular mt-2">
                <Phone className="w-4 h-4 text-gray-400" />
                {profile.phone}
              </p>
              <p className="flex items-center gap-2 text-gray-500 text-body-2-regular">
                <MapPin className="w-4 h-4 text-gray-400" />
                {profile.address}
              </p>
              <p className="text-gray-800 text-body-2-regular mt-2">{profile.bio}</p>
            </div>

            <Button
              variant="outlined"
              size="small"
              onClick={() => router.push("/profile/edit")}
              className="px-[16px] py-[6px] text-red-500 border-red-500 hover:bg-red-50"
            >
              편집하기
            </Button>
          </div>
        </section>
      )}

      {/* 📄 신청 내역 */}
      <h2 className="text-h2 font-bold mb-[24px] text-black">신청 내역</h2>

      {applications.length > 0 ? (
        <div className="border border-gray-20 rounded-[8px] bg-white shadow-sm overflow-hidden">
          <table className="w-full border-collapse text-center">
            <thead className="bg-[#FFF5F5]">
              <tr className="text-body-2-semibold text-gray-800">
                <th className="py-4 px-6 text-left">가게</th>
                <th className="py-4 px-6">근무일자</th>
                <th className="py-4 px-6">시급</th>
                <th className="py-4 px-6">상태</th>
              </tr>
            </thead>
            <tbody>
              {paginatedApps.map(app => (
                <tr key={app.id} className="border-t border-gray-10 hover:bg-gray-50 transition">
                  <td className="py-4 px-6 text-left text-gray-900 font-medium">{app.shopName}</td>
                  <td className="py-4 px-6 text-gray-700">{formatDateTime(app.startsAt, app.workhour)}</td>
                  <td className="py-4 px-6 text-gray-900">
                    {app?.hourlyPay != null ? `${app.hourlyPay.toLocaleString()}원` : "-"}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        app.status === "accepted"
                          ? "bg-[#E5F1FF] text-[#2186FF]" // 승인 완료
                          : app.status === "pending"
                            ? "bg-[#E7F6E7] text-[#2EB62C]" // 대기중
                            : "bg-[#FFE7E7] text-[#F04438]" // 거절
                      }`}
                    >
                      {app.status === "accepted" ? "승인 완료" : app.status === "pending" ? "대기중" : "거절"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 페이지네이션 */}
          <div className="flex justify-center items-center gap-2 py-5 bg-white">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-gray-500 disabled:text-gray-300"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 rounded-md font-medium ${
                  currentPage === page ? "bg-[#EA3C12] text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-gray-500 disabled:text-gray-300"
            >
              &gt;
            </button>
          </div>
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
    </main>
  );
}
