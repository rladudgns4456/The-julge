"use client";

import { useState } from "react";
import Button from "@/components/common/button";
import Modal from "@/components/common/modal/CommonModal";
import { REGION_OPTIONS } from "@/constants/options";

export default function ProfileEditPage() {
  const [form, setForm] = useState({
    name: "김승우",
    phone: "010-1234-4321",
    region: "songpa",
    intro: "열심히 일하겠습니다.",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <main className="flex-1 max-w-[60.25rem] mx-auto px-5 tablet:px-8 mt-[80px] mb-[100px]">
      <h1 className="text-h2 text-black mb-[40px] text-left">내 프로필 수정</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full border border-gray-20 rounded-[12px] bg-white py-[60px] px-[24px] tablet:px-[60px] flex flex-col gap-[24px]"
      >
        <div className="grid mobile:grid-cols-1 tablet:grid-cols-3 gap-[24px]">
          <div className="flex flex-col">
            <label className="text-body-1-bold text-black mb-2">이름*</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="border border-gray-20 rounded-md p-3 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-body-1-bold text-black mb-2">연락처*</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="border border-gray-20 rounded-md p-3 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-body-1-bold text-black mb-2">선호 지역</label>
            <select
              name="region"
              value={form.region}
              onChange={handleChange}
              className="border border-gray-20 rounded-md p-3 bg-white"
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

        <div>
          <label className="text-body-1-bold text-black mb-2 block">소개</label>
          <textarea
            name="intro"
            value={form.intro}
            onChange={handleChange}
            rows={4}
            className="border border-gray-20 rounded-md p-3 w-full resize-none focus:outline-none"
          />
        </div>

        <Button type="submit" variant="primary" size="large" className="w-full tablet:w-[346px] h-[47px] mx-auto">
          수정 완료
        </Button>
      </form>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <p className="text-lg font-semibold mb-6">수정이 완료되었습니다.</p>
          <Button
            variant="primary"
            size="medium"
            className="w-full"
            onClick={() => (window.location.href = "/profile")}
          >
            확인
          </Button>
        </Modal>
      )}
    </main>
  );
}
