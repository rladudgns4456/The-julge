"use client";

import Image from "next/image";
import Button from "@/components/common/button/index";
import Input from "@/components/common/input/Input";
import { useAuth } from "@/hooks/useAuth";
import { useUserData } from "@/hooks/useUserData";
import { useNoticeForm } from "@/hooks/useNoticeForm";

export default function NoticeRegisterPage() {
  const { user } = useAuth();
  const { userData } = useUserData(user?.id);
  const shopId = userData?.shop?.item?.id ?? null;

  const {
    formData,
    validationErrors,
    dateInputType,
    isLoading,
    error,
    handleInputChange,
    handleInputBlur,
    handleDateFocus,
    handleDateBlur,
    handleSubmit,
    handleClose,
  } = useNoticeForm({ shopId });

  if (error) {
    return <div className="w-full mb-4 p-4 bg-red-10 border border-red-40 rounded-lg text-red-40">{error}</div>;
  }

  return (
    <main className="w-full max-w-[964px] mx-auto my-[3.75rem] px-8 flex flex-col items-center">
      {/* 헤더 */}
      <div className="w-full flex justify-between mb-8">
        <h1 className="text-h1">공고 등록</h1>
        <button type="button" onClick={handleClose}>
          <Image src="/close.svg" width={32} height={32} alt="닫기 아이콘" />
        </button>
      </div>

      {/* 폼 */}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="w-full grid grid-cols-3 gap-5">
          {/* 시급 */}
          <div className="flex flex-col">
            <Input
              name="hourlyPay"
              type="number"
              label="시급"
              unit="원"
              placeholder="10,030"
              value={formData.hourlyPay}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              required={true}
            />
            {validationErrors.hourlyPay && (
              <span className="mt-2 text-body-2-regular text-red-40">{validationErrors.hourlyPay}</span>
            )}
          </div>

          {/* 시작 일시 */}
          <div className="flex flex-col">
            <Input
              name="startsAt"
              type={dateInputType}
              label="시작 일시"
              placeholder="시작 일을 입력해주세요"
              value={formData.startsAt}
              onChange={handleInputChange}
              onFocus={handleDateFocus}
              onBlur={handleDateBlur}
              required={true}
            />
            {validationErrors.startsAt && (
              <span className="mt-2 text-body-2-regular text-red-40">{validationErrors.startsAt}</span>
            )}
          </div>

          {/* 근무 시간 */}
          <div className="flex flex-col">
            <Input
              name="workhour"
              type="number"
              label="근무 시간"
              placeholder="8"
              unit="시간"
              value={formData.workhour}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              required={true}
            />
            {validationErrors.workhour && (
              <span className="mt-2 text-body-2-regular text-red-40">{validationErrors.workhour}</span>
            )}
          </div>

          {/* 공고 설명 */}
          <div className="w-full mt-1 flex flex-col col-span-3 text-body-2-regular">
            <label htmlFor="description" className="mb-2 text-gray-40">
              공고 설명
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="공고에 대한 설명을 작성해주세요 (선택사항)"
              className="w-full h-[153px] text-body-1-regular p-4 border-solid border-gray-30 border rounded-md"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          {/* 제출 버튼 */}
          <div className="col-start-2">
            <Button variant="primary" className="w-full" size="large" type="submit" disabled={isLoading}>
              {isLoading ? "등록 중..." : "등록하기"}
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
}
