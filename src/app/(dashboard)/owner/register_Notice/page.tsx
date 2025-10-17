"use client";

import { useState, FocusEvent, FormEvent } from "react";
import Image from "next/image";
import Button from "@/components/common/button/index";
import Input from "@/components/common/input/Input";

interface CreateNotice {
  hourlyPay: string;
  startsAt: string;
  workhour: string;
  description: string;
}

export default function NoticeRegisterPage() {
  const [formData, setFormData] = useState<CreateNotice>({
    hourlyPay: "",
    startsAt: "",
    workhour: "",
    description: "",
  });

  const [dateInputType, setDateInputType] = useState<"text" | "datetime-local">("text");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // 클릭시 Datetime-local 표시
  const handleDateFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.target.type = "datetime-local";
    setDateInputType("datetime-local");
  };

  // 클릭시 text로 변경
  const handleDateFocusChange = (e: FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      e.target.type = "text";
      setDateInputType("text");
    }
  };

  // 폼 제출
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // 닫기
  const handleClose = () => {
    window.history.back();
  };

  return (
    <main className="w-full max-w-[964px] mx-auto my-[3.75rem] px-8 flex flex-col items-center">
      <div className="w-full flex justify-between mb-8">
        <h1 className="text-h1">공고 등록</h1>
        <button type="button" onClick={handleClose}>
          <Image src="/close.svg" width={32} height={32} alt="닫기 아이콘" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="w-full grid grid-cols-3 gap-5">
          {/* 시급 */}
          <Input
            name="hourlyPay"
            type="number"
            label="시급"
            unit="원"
            placeholder="10,030"
            value={formData.hourlyPay}
            onChange={handleInputChange}
            required={true}
          />
          {/* 시작 일시 */}
          <Input
            name="startsAt"
            type={dateInputType}
            label="시작 일시"
            placeholder="시작 일을 입력해주세요"
            value={formData.startsAt}
            onChange={handleInputChange}
            onFocus={handleDateFocus}
            onBlur={handleDateFocusChange}
            required={true}
          />
          {/* 근무 시간 */}
          <Input
            name="workhour"
            type="number"
            label="근무 시간"
            unit="시간"
            value={formData.workhour}
            onChange={handleInputChange}
            required={true}
          />
          {/* 공고 설명 */}
          <div className="w-full mt-1 flex flex-col col-span-3 text-body-2-regular">
            <label htmlFor="description" className="mb-2 text-gray-40">
              공고 설명
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="공고에 대한 설명을 작성해주세요"
              className="w-full h-[153px] text-body-1-regular p-4 border-solid border-gray-30 border rounded-md"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-start-2">
            <Button variant="primary" className=" w-full" size="large" type="submit">
              등록하기
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
}
