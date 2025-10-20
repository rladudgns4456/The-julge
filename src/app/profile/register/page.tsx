"use client";
export const dynamic = "force-static";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/button";
import Modal from "@/components/common/modal/CommonModal";
import { REGION_OPTIONS } from "@/constants/options";
import { AuthLoginApi } from "@/contexts/AuthLoginApi";
import { saveProfile } from "@/api/profile/profileApi";

export default function ProfileRegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    region: "",
    intro: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const user = AuthLoginApi.getCurrentUser() ?? AuthLoginApi.restoreUserFromStorage();
    if (!user?.id) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }
    setUserId(user.id);
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return alert("로그인 정보가 없습니다.");

    try {
      await saveProfile(userId, form);
      setIsModalOpen(true);
    } catch (err) {
      console.error("❌ 프로필 등록 실패:", err);
      alert("등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <main className="w-full max-w-[957px] mx-auto px-5 tablet:px-6 pt-[40px] pb-[120px] min-h-screen">
      {/* 헤더 */}
      <div className="relative mb-[40px]">
        <h1 className="text-h2 text-black font-bold">내 프로필 등록</h1>
        <button
          onClick={() => router.push("/profile")}
          className="absolute right-0 top-0 text-h2 text-gray-50 hover:text-black"
          aria-label="닫기"
        >
          ✕
        </button>
      </div>

      {/* 폼 */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-[32px]">
        {/* 이름 / 연락처 / 선호지역 */}
        <div className="grid grid-cols-1 tablet:grid-cols-3 gap-[24px]">
          {/* 이름 */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-body-1-regular text-black mb-[8px]">
              이름*
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="입력"
              className="border border-gray-20 rounded-[6px] px-[16px] h-[52px] focus:outline-none"
            />
          </div>

          {/* 연락처 */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-body-1-regular text-black mb-[8px]">
              연락처*
            </label>
            <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="입력"
              className="border border-gray-20 rounded-[6px] px-[16px] h-[52px] focus:outline-none"
            />
          </div>

          {/* 선호 지역 */}
          <div className="flex flex-col">
            <label htmlFor="region" className="text-body-1-regular text-black mb-[8px]">
              선호 지역
            </label>
            <select
              id="region"
              name="region"
              value={form.region}
              onChange={handleChange}
              className="border border-gray-20 rounded-[6px] px-[16px] h-[52px] bg-white focus:outline-none"
            >
              <option value="">선택</option>
              {REGION_OPTIONS.map(r => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 자기소개 */}
        <div>
          <label htmlFor="intro" className="text-body-1-regular text-black mb-[8px] block">
            소개
          </label>
          <textarea
            id="intro"
            name="intro"
            value={form.intro}
            onChange={handleChange}
            placeholder="입력"
            className="border border-gray-20 rounded-[6px] w-full p-[16px] resize-none h-[160px] focus:outline-none"
          />
        </div>

        {/* 등록 버튼 */}
        <div className="text-center">
          <Button type="submit" variant="primary" size="large" className="w-[240px] h-[47px] mx-auto">
            등록하기
          </Button>
        </div>
      </form>

      {/* 등록 완료 모달 */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <p className="text-lg font-semibold mb-6">등록이 완료되었습니다.</p>
          <Button variant="primary" size="medium" className="w-full" onClick={() => router.push("/profile/detail")}>
            확인
          </Button>
        </Modal>
      )}
    </main>
  );
}
