// src/app/page.tsx
"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import CommonModal from "@/components/common/modal/NegageModal";
import formStyles from "@/components/common/styles/NegageModal.module.css";

// 음식점 데이터 타입 정의
interface StoreData {
  storeName: string;
  category: string;
  address: string;
  phone?: string;
}

export default function Home() {
  // 모달이 열렸는지 닫혔는지 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 폼 데이터 관리
  const [formData, setFormData] = useState<StoreData>({
    storeName: "",
    category: "",
    address: "",
    phone: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("입점 등록 정보:", formData);
    alert(`${formData.storeName} 가게 등록이 완료되었습니다.`);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center p-8">
        <h1 className="text-h2 text-black mb-8">가맹점 관리 페이지</h1>

        {/* 가게 등록 버튼 */}
        <div className="flex justify-center w-full my-8">
          <button onClick={() => setIsModalOpen(true)} className={`${formStyles.submitButton} w-[346px]`}>
            내 가게 등록하기
          </button>
        </div>

        {/* CommonModal 컴포넌트를 사용 */}
        <CommonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="내 가게 등록">
          <form onSubmit={handleSubmit}>
            <div className={formStyles.formGroup}>
              <label htmlFor="storeName">가게 이름</label>
              <input
                type="text"
                id="storeName"
                name="storeName"
                value={formData.storeName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={formStyles.formGroup}>
              <label htmlFor="category">카테고리</label>
              <input
                type="text"
                id="category"
                name="category"
                placeholder="예: 한식, 양식, 중식, 일식, 카페 등"
                value={formData.category}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={formStyles.formGroup}>
              <label htmlFor="address">가게 주소</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={formStyles.formGroup}>
              <label htmlFor="phone">연락처</label>
              <input type="tel" id="phone" name="phone" onChange={handleInputChange} />
            </div>
            {/* 버튼 텍스트 */}
            <div className="flex justify-center w-full mt-6">
              <button type="submit" variant="primary" size="large" className={`${formStyles.submitButton} w-full`}>
                등록 완료
              </button>
            </div>
          </form>
        </CommonModal>
      </main>
    </div>
  );
}
