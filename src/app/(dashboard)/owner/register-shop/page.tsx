"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Button from "@/components/common/button";
import Input from "@/components/common/input/Input";
import { ShopImageUpload } from "@/components/owner/shop/shopImageUpload";
import { useShopForm } from "@/hooks/useShopForm";
import { getShop } from "@/api/shop/ShopApi";
import { ShopItem } from "@/types/shop";
import { CATEGORY_OPTIONS, REGION_OPTIONS } from "@/constants/options";

export default function NoticeRegisterPage() {
  const searchParams = useSearchParams();

  // 쿼리 파라미터에서 mode 확인
  const mode = searchParams.get("mode") === "edit" ? "edit" : "new";
  const shopIdFromQuery = searchParams.get("shopId");

  const [shopData, setShopData] = useState<ShopItem | null>(null);
  const [isLoadingShop, setIsLoadinngShop] = useState(false);
  const [shopError, setShopError] = useState<string | null>(null);

  useEffect(() => {
    if (mode === "edit" && shopIdFromQuery) {
      setIsLoadinngShop(true);
      getShop(shopIdFromQuery)
        .then(response => {
          setShopData(response.item);
        })
        .catch(err => {
          setShopError(err.message || "가게 정보를 불러오는데 실패했습니다.");
        })
        .finally(() => {
          setIsLoadinngShop(false);
        });
    }
  }, [mode, shopIdFromQuery]);

  // 폼 로직
  const {
    formData,
    validationErrors,
    isLoading,
    error,
    handleInputChange,
    handleInputBlur,
    handleImageUpload,
    handleSubmit,
    handleClose,
  } = useShopForm({
    mode,
    shopId: shopIdFromQuery,
    initialData: mode === "edit" ? shopData : null,
  });

  // 편집 모드에서 가게 정보 로딩 중
  if (mode === "edit" && isLoadingShop) {
    return (
      <main className="w-full max-w-[680px] mx-auto my-[3.75rem] px-8 flex items-center justify-center">
        <p className="text-body-1-regular text-gray-40">가게 정보를 불러오는 중...</p>
      </main>
    );
  }

  // 편집 모드에서 가게 정보 로딩 실패
  if (mode === "edit" && (shopError || !shopData)) {
    return (
      <main className="w-full max-w-[680px] mx-auto my-[3.75rem] px-8">
        <div className="w-full mb-4 p-4 bg-red-10 border border-red-40 rounded-lg text-red-40">
          {shopError || "가게 정보를 찾을 수 없습니다."}
        </div>
        <Button onClick={handleClose} variant="primary">
          돌아가기
        </Button>
      </main>
    );
  }

  return (
    <main className="w-full max-w-[968px] mx-auto my-6 tablet:my-[3.75rem] px-4 tablet:px-8">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-4 tablet:mb-6">
        <h1 className="text-h2 tablet:text-h1">가게 정보</h1>
        <button type="button" onClick={handleClose} aria-label="닫기">
          <Image src="/close.svg" width={32} height={32} alt="닫기 아이콘" />
        </button>
      </div>

      {/* 폼 */}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col gap-4 tablet:gap-5">
          {/* 가게 이름 */}
          <Input
            name="name"
            type="text"
            label="가게 이름"
            placeholder="입력"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={validationErrors.name}
            required
          />

          {/* 분류와 주소 (반응형 1열 → 2열) */}
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 tablet:gap-5">
            {/* 분류 */}
            <div className="flex flex-col gap-1">
              <label htmlFor="category" className="text-body-2-regular text-gray-50">
                분류 <span className="text-red-40 ml-0.5">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className={`w-full h-[58px] rounded-lg px-3 text-body-1-regular bg-white border focus:outline-none focus:ring-2
                  ${
                    validationErrors.category
                      ? "border-red-40 bg-red-10 focus:ring-red-30"
                      : "border-gray-30 focus:ring-blue-20"
                  }
                `}
              >
                <option value="">선택</option>
                {CATEGORY_OPTIONS.map(option => (
                  <option key={option.value} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
              {validationErrors.category && <p className="text-caption text-red-40">{validationErrors.category}</p>}
            </div>

            {/* 주소 */}
            <div className="flex flex-col gap-1">
              <label htmlFor="address1" className="text-body-2-regular text-gray-50">
                주소 <span className="text-red-40 ml-0.5">*</span>
              </label>
              <select
                id="address1"
                name="address1"
                value={formData.address1}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className={`w-full h-[58px] rounded-lg px-3 text-body-1-regular bg-white border focus:outline-none focus:ring-2
                  ${
                    validationErrors.address1
                      ? "border-red-40 bg-red-10 focus:ring-red-30"
                      : "border-gray-30 focus:ring-blue-20"
                  }
                `}
              >
                <option value="">선택</option>
                {REGION_OPTIONS.map(option => (
                  <option key={option.value} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
              {validationErrors.address1 && <p className="text-caption text-red-40">{validationErrors.address1}</p>}
            </div>
          </div>

          {/* 상세 주소 */}
          <Input
            name="address2"
            type="text"
            label="상세 주소"
            placeholder="입력"
            value={formData.address2}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={validationErrors.address2}
            required
          />

          {/* 기본 시급 */}
          <Input
            name="originalHourlyPay"
            type="number"
            label="기본 시급"
            unit="원"
            placeholder="입력"
            value={formData.originalHourlyPay}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={validationErrors.originalHourlyPay}
            required
          />

          {/* 가게 이미지 */}
          <ShopImageUpload
            imageUrl={formData.imageUrl}
            onImageUpload={handleImageUpload}
            error={validationErrors.imageUrl}
          />

          {/* 가게 설명 */}
          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="text-body-2-regular text-gray-50">
              가게 설명
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="입력"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full h-[153px] rounded-lg p-4 text-body-1-regular bg-white border border-gray-30 focus:outline-none focus:ring-2 focus:ring-blue-20 resize-none"
            />
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div className="p-4 bg-red-10 border border-red-40 rounded-lg">
              <p className="text-body-2-regular text-red-40">{error}</p>
            </div>
          )}

          {/* 제출 버튼 */}
          <Button variant="primary" size="large" type="submit" disabled={isLoading}>
            {isLoading ? (mode === "edit" ? "수정 중..." : "등록 중...") : mode === "edit" ? "수정하기" : "등록하기"}
          </Button>
        </div>
      </form>
    </main>
  );
}
