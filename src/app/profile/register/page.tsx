"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/button";
import Modal from "@/components/common/modal/CommonModal";
import { REGION_OPTIONS } from "@/constants/options";
import { AuthLoginApi } from "@/contexts/AuthLoginApi";
import { saveProfile } from "@/api/profile/profileApi";

export default function ProfileRegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", phone: "", region: "", intro: "" });
  const [userId, setUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const user = AuthLoginApi.getCurrentUser() ?? AuthLoginApi.restoreUserFromStorage();
    if (!user?.id) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }
    setUserId(user.id);
  }, [router]);

  const handleChange = (e: any) => {
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
      alert("등록 실패, 다시 시도해주세요.");
    }
  };

  return (
    <main className="max-w-[957px] mx-auto px-5 pt-[40px] pb-[120px]">
      <h1 className="text-h2 font-bold mb-[40px]">내 프로필 등록</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[32px]">
        <div className="grid grid-cols-1 tablet:grid-cols-3 gap-[24px]">
          <div>
            <label className="text-body-1-regular mb-[8px] block">이름*</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="입력"
              className="border border-gray-20 rounded-[6px] px-[16px] h-[52px] w-full"
            />
          </div>

          <div>
            <label className="text-body-1-regular mb-[8px] block">연락처*</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="입력"
              className="border border-gray-20 rounded-[6px] px-[16px] h-[52px] w-full"
            />
          </div>

          <div>
            <label className="text-body-1-regular mb-[8px] block">선호 지역</label>
            <select
              name="region"
              value={form.region}
              onChange={handleChange}
              className="border border-gray-20 rounded-[6px] px-[16px] h-[52px] bg-white w-full"
            >
              <option value="">선택</option>
              {REGION_OPTIONS.map(r => (
                <option key={r.value} value={r.label}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-body-1-regular mb-[8px] block">소개</label>
          <textarea
            name="intro"
            value={form.intro}
            onChange={handleChange}
            placeholder="입력"
            className="border border-gray-20 rounded-[6px] w-full p-[16px] resize-none h-[160px]"
          />
        </div>

        <div className="text-center">
          <Button type="submit" variant="primary" size="large" className="w-[240px] h-[47px] mx-auto">
            등록하기
          </Button>
        </div>
      </form>

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
