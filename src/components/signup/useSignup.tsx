"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupUser, SignupRequest } from "@/api/signup/SignupApi";
import { useForm } from "@/hooks/useForm";
import { SignupFormData } from "@/hooks/useFormData";
import { SignupErrors } from "@/hooks/useFormValidation";

// 각 상태 공통 타입
export type FormData = SignupFormData;
export type Errors = SignupErrors;

export interface ModalState {
  isOpen: boolean;
  type: "duplicateEmail" | "success" | null;
}

export const useSignupLogic = () => {
  const router = useRouter();

  // 통합 폼 관리 훅
  const { formData, errors, setFormData, handleInputChange, validateSignupForm } = useForm<FormData, Errors>(
    {
      email: "",
      password: "",
      confirmPassword: "",
      userType: "employee",
    },
    {
      email: "",
      password: "",
      confirmPassword: "",
    },
  );

  // 로딩, 모달 관리
  const [isLoading, setIsLoading] = useState(false);

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    type: null,
  });

  // 유저 타입 알바/사장
  const handleUserTypeChange = (type: "employee" | "employer") => {
    setFormData(prev => ({
      ...prev,
      userType: type,
    }));
  };

  // 모달 닫기
  const handleModalClose = () => {
    setModalState({ isOpen: false, type: null });
  };

  // 중복 이메일 모달
  const handleDuplicateEmailConfirm = () => {
    setModalState({ isOpen: false, type: null });
    void performSignup();
  };

  // 회원가입 성공 모달
  const handleSuccessConfirm = () => {
    setModalState({ isOpen: false, type: null });
    router.push("/login");
  };

  // 회원가입 실행 공통 함수
  const performSignup = async () => {
    setIsLoading(true);

    try {
      // API 호출데이터
      const signupData: SignupRequest = {
        email: formData.email,
        password: formData.password,
        type: formData.userType,
      };

      // 회원가입 API
      await signupUser(signupData);

      // 성공 모달 표시
      setModalState({ isOpen: true, type: "success" });
    } catch (error: unknown) {
      let statusCode = "unknown";
      let message = "알 수 없는 오류";

      // 에러 타입 가드 및 메시지 파싱
      if (error instanceof Error) {
        if (error.message && error.message.includes(":")) {
          const [parsedStatusCode, parsedMessage] = error.message.split(":");
          statusCode = parsedStatusCode?.trim() || "unknown";
          message = parsedMessage?.trim() || error.message;
        } else {
          message = error.message || "알 수 없는 오류";
        }
      } else if (typeof error === "string") {
        message = error;
      } else {
        message = "예상치 못한 오류가 발생했습니다.";
      }

      handleSignupError(statusCode, message);
    } finally {
      setIsLoading(false);
    }
  };

  // 서버에러시
  const handleSignupError = (statusCode: string, message: string) => {
    switch (statusCode) {
      case "400":
        alert("입력 정보를 다시 확인해주세요.");
        break;
      case "409":
        setModalState({ isOpen: true, type: "duplicateEmail" });
        break;
      default:
        alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
        break;
    }
  };

  // 폼 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 폼 유효성 검사
    if (!validateSignupForm()) return;

    // 회원가입 실행
    await performSignup();
  };

  // 로그인 페이지로 이동
  const handleLoginClick = () => {
    router.push("/login");
  };

  return {
    // 상태
    formData,
    errors,
    isLoading,
    modalState,

    // 핸들러
    handleInputChange,
    handleUserTypeChange,
    handleModalClose,
    handleDuplicateEmailConfirm,
    handleSuccessConfirm,
    handleSubmit,
    handleLoginClick,
  };
};
