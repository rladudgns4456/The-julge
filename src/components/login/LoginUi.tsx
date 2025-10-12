"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Input from "@/components/common/input/Input";
import Button from "@/components/common/button";

export default function LoginUi() {
  const router = useRouter();

  // 폼 상태 관리
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // 에러 상태 관리
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // 폼 입력
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // 에러 상태 초기화
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // 폼 제출
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 에러 상태 초기화
    setErrors({ email: "", password: "" });

    let hasError = false;

    // 이메일 유효성 검사
    if (!formData.email) {
      setErrors(prev => ({ ...prev, email: "이메일을 입력해주세요." }));
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors(prev => ({ ...prev, email: "이메일 형식으로 작성해 주세요." }));
      hasError = true;
    }

    // 비밀번호 유효성 검사
    if (!formData.password) {
      setErrors(prev => ({ ...prev, password: "비밀번호를 입력해주세요." }));
      hasError = true;
    } else if (formData.password.length < 8) {
      setErrors(prev => ({ ...prev, password: "8자 이상 입력해 주세요." }));
      hasError = true;
    }

    if (hasError) return;

    //API 연동하고 로그인 성공시 공고리스트 화면으로 넘기기
    console.log("로그인 데이터:", formData);
    alert("로그인 되었습니다");

    // 메인 페이지 이동
    router.push("/");
  };

  const handleSignupClick = () => {
    router.push("/signup");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image src="/logo.svg" alt="THE JULGE 로고" width={248} height={45} className="mx-auto" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="이메일"
            type="email"
            name="email"
            value={formData.email}
            placeholder="입력"
            error={errors.email}
            onChange={handleInputChange}
          />

          <Input
            label="비밀번호"
            type="password"
            name="password"
            value={formData.password}
            placeholder="입력"
            error={errors.password}
            onChange={handleInputChange}
          />

          <Button type="submit" variant="primary" size="large" className="w-full">
            로그인 하기
          </Button>
        </form>

        <div className="text-center mt-6">
          <span className="text-black text-sm">회원이 아니신가요? </span>
          <button
            onClick={handleSignupClick}
            className="text-blue-20 hover:text-blue-20/80 underline font-medium text-sm"
          >
            회원가입 하기
          </button>
        </div>
      </div>
    </div>
  );
}
