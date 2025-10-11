"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Input from "@/components/common/input/Input";
import Button from "@/components/common/button";

export default function SignupUi() {
  const router = useRouter();

  // 폼 상태 관리
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userType: "employee" as "employee" | "employer",
  });

  // 에러 상태 관리
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // 폼 입력 핸들러
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

  // 유저 타입 선택
  const handleUserTypeChange = (type: "employee" | "employer") => {
    setFormData(prev => ({
      ...prev,
      userType: type,
    }));
  };

  // 폼 제출
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 에러 상태 초기화
    setErrors({ email: "", password: "", confirmPassword: "" });

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

    // 비밀번호 미일치는 모달 완성되면 가져와서 모달창 사용
    if (!formData.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: "비밀번호 확인을 입력해주세요." }));
      hasError = true;
    } else if (formData.password !== formData.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: "비밀번호가 일치하지 않습니다." }));
      hasError = true;
    }

    if (hasError) return;

    // 피그마는 알레트지만 모달로 회원가입 완료 보여주기
    console.log("회원가입 데이터:", formData);
    alert("회원가입이 완료되었습니다");

    // 로그인 페이지로 이동
    router.push("/login");
  };

  // 로그인 페이지로 이동
  const handleLoginClick = () => {
    router.push("/login");
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

          <Input
            label="비밀번호 확인"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="입력"
            error={errors.confirmPassword}
            onChange={handleInputChange}
          />

          <div>
            <label className="block text-sm font-medium text-black mb-3">회원 유형</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleUserTypeChange("employee")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full border-2 transition-all ${
                  formData.userType === "employee"
                    ? "border-red-40 bg-white text-black"
                    : "border-gray-20 bg-white text-gray-50"
                }`}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  {formData.userType === "employee" ? (
                    <Image src="/check.svg" alt="체크됨" width={24} height={24} />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-30"></div>
                  )}
                </div>
                <span className="font-medium">알바님</span>
              </button>

              <button
                type="button"
                onClick={() => handleUserTypeChange("employer")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full border-2 transition-all ${
                  formData.userType === "employer"
                    ? "border-red-40 bg-white text-black"
                    : "border-gray-20 bg-white text-gray-50"
                }`}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  {formData.userType === "employer" ? (
                    <Image src="/check.svg" alt="체크됨" width={24} height={24} />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-30"></div>
                  )}
                </div>
                <span className="font-medium">사장님</span>
              </button>
            </div>
          </div>

          <Button type="submit" variant="primary" size="large" className="w-full">
            가입하기
          </Button>
        </form>

        <div className="text-center mt-6">
          <span className="text-black">이미 가입하셨나요? </span>
          <button onClick={handleLoginClick} className="text-blue-20 underline hover:text-blue-20/80 font-medium">
            로그인하기
          </button>
        </div>
      </div>
    </div>
  );
}
