"use client";

import { useState } from "react";
import Button from "@/components/common/button";
import Modal from "@/components/common/modal/CommonModal";
import { REGION_OPTIONS } from "@/constants/options";

export default function ProfileRegisterPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    region: "",
    intro: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 max-w-[60.25rem] mx-auto px-5 tablet:px-8 mt-[116px] mb-[118px]">
        <h1 className="text-h2 text-black mb-[40px] text-left">내 프로필</h1>

        <form
          onSubmit={handleSubmit}
          className="w-[964px] mx-auto border border-gray-20 rounded-[12px] py-[60px] px-[24px] flex flex-col gap-[24px] bg-white"
        >
          {/* 이름 / 연락처 / 지역 */}
          <div className="grid grid-cols-3 gap-[24px]">
            <div className="flex flex-col">
              <label className="text-body-1-bold text-black mb-2">이름*</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="입력"
                required
                className="border border-gray-20 rounded-md p-3 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-body-1-bold text-black mb-2">연락처*</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="입력"
                required
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
                {REGION_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 소개 */}
          <div>
            <label className="text-body-1-bold text-black mb-2 block">소개</label>
            <textarea
              name="intro"
              value={form.intro}
              onChange={handleChange}
              placeholder="입력"
              rows={4}
              className="border border-gray-20 rounded-md p-3 w-full resize-none focus:outline-none"
            />
          </div>

          {/* 등록 버튼 */}
          <Button type="submit" variant="primary" size="large" className="w-[346px] h-[47px] rounded-[6px] mx-auto">
            등록하기
          </Button>
        </form>
      </main>

      {/* 등록 완료 모달 */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <p className="text-lg font-semibold mb-6">등록이 완료되었습니다.</p>
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
    </div>
  );
}
