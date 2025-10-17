"use client";

import { useState } from "react";
import Button from "@/components/common/button";
import Modal from "@/components/common/modal/CommonModal";
import instance from "@/api/axios";
import { REGION_OPTIONS } from "@/constants/options";

// 🔸 폼 데이터 타입 정의
interface ProfileForm {
  name: string;
  phone: string;
  region: string;
  intro: string;
}

export default function ProfileRegisterPage() {
  const [form, setForm] = useState<ProfileForm>({
    name: "",
    phone: "",
    region: "",
    intro: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔸 공용 핸들러 (input/select/textarea)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // 🔸 등록 API 호출
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await instance.post("/users/me", form);
      console.log("등록 성공:", res.data);
      setIsModalOpen(true);
    } catch (err) {
      console.error("프로필 등록 실패:", err);
      alert("등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <main
      className="
        w-full max-w-[957px] mx-auto
        px-5 tablet:px-6
        pt-[40px] pb-[120px]
      "
    >
      {/* 상단 타이틀 + 닫기 버튼 */}
      <div className="relative mb-[40px]">
        <h1 className="text-h2 text-black font-bold">내 프로필</h1>
        <button
          onClick={() => (window.location.href = "/profile")}
          className="
            absolute right-0 top-0
            text-h2 text-gray-50 hover:text-black
          "
        >
          ✕
        </button>
      </div>

      {/* 입력 폼 */}
      <form
        onSubmit={handleSubmit}
        className="
          flex flex-col gap-[32px]
        "
      >
        {/* 이름/연락처/선호 지역 */}
        <div className="grid grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-3 gap-[24px]">
          {/* 이름 */}
          <div className="flex flex-col">
            <label className="text-body-1-regular text-black mb-[8px]">이름*</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="입력"
              className="
                border border-gray-20 rounded-[6px]
                px-[16px] h-[52px]
                focus:outline-none
              "
            />
          </div>

          {/* 연락처 */}
          <div className="flex flex-col">
            <label className="text-body-1-regular text-black mb-[8px]">연락처*</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="입력"
              className="
                border border-gray-20 rounded-[6px]
                px-[16px] h-[52px]
                focus:outline-none
              "
            />
          </div>

          {/* 선호 지역 */}
          <div className="flex flex-col">
            <label className="text-body-1-regular text-black mb-[8px]">선호 지역</label>
            <select
              name="region"
              value={form.region}
              onChange={handleChange}
              className="
                border border-gray-20 rounded-[6px]
                px-[16px] h-[52px]
                bg-white
                focus:outline-none
              "
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

        {/* 소개 */}
        <div>
          <label className="text-body-1-regular text-black mb-[8px] block">소개</label>
          <textarea
            name="intro"
            value={form.intro}
            onChange={handleChange}
            placeholder="입력"
            className="
              border border-gray-20 rounded-[6px]
              w-full p-[16px] resize-none
              h-[160px]
              focus:outline-none
            "
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
          <Button
            variant="primary"
            size="medium"
            className="w-full"
            onClick={() => (window.location.href = "/profile/detail")}
          >
            확인
          </Button>
        </Modal>
      )}
    </main>
  );
}
