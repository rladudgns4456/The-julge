"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupUser, SignupRequest } from "@/api/signup/SignupApi";

// 각 상태 타입들
export interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  userType: "employee" | "employer";
}

export interface Errors {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ModalState {
  isOpen: boolean;
  type: "duplicateEmail" | "success" | null;
}

// SignupLogic 커스텀 훅
export const useSignupLogic = () => {
  const router = useRouter();

  // 폼, 에러 관리
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    userType: "employee",
  });

  const [errors, setErrors] = useState<Errors>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // 로딩, 모달 관리
  const [isLoading, setIsLoading] = useState(false);

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    type: null,
  });

  // 폼 입력 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // 에러 초기화
    if (errors[name as keyof Errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
      }));
    }

    // 이메일 검사 정규식
    if (name === "email" && value) {
      if (!/\S+@\S+\.\S+/.test(value)) {
        setErrors(prev => ({
          ...prev,
          email: "이메일 형식으로 작성해 주세요.",
        }));
      }
    }
  };

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
    handleSubmitAfterDuplicateEmail();
  };

  // 회원가입 성공 모달
  const handleSuccessConfirm = () => {
    setModalState({ isOpen: false, type: null });
    router.push("/login");
  };

  // 중복모달 닫아도 회원가입 내용 남아있게
  const handleSubmitAfterDuplicateEmail = async () => {
    await performSignup();
  };

  // 회원가입 실행 공통 함수
  const performSignup = async () => {
    setIsLoading(true);

    try {
      // API 호출을 위한 데이터 준비
      const signupData: SignupRequest = {
        email: formData.email,
        password: formData.password,
        type: formData.userType,
      };

      // 회원가입 API 호출
      await signupUser(signupData);

      // 성공 모달 표시
      setModalState({ isOpen: true, type: "success" });
    } catch (error: any) {
      // 에러 메시지
      const errorMessage = error.message;
      const [statusCode, message] = errorMessage.split(":");

      handleSignupError(statusCode, message);
    } finally {
      // 로딩 상태 종료
      setIsLoading(false);
    }
  };

  // 서버에서 에서 발생시
  const handleSignupError = (statusCode: string, message: string) => {
    switch (statusCode) {
      case "400":
        console.warn(`잘못된 요청 형식: ${message}`, {
          email: formData.email,
          action: "showing_input_error_alert",
        });
        alert("입력 정보를 다시 확인해주세요.");
        break;
      case "409":
        console.info(`중복 이메일 시도: ${formData.email}`, {
          action: "showing_duplicate_email_modal",
        });
        setModalState({ isOpen: true, type: "duplicateEmail" });
        break;
      default:
        console.error("예상치 못한 회원가입 에러:", {
          statusCode,
          message,
          email: formData.email,
        });
        alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
        break;
    }
  };

  // 브라우저에서 사용자가 입력하는 데이터 검사
  const validateForm = (): boolean => {
    // 에러 상태 초기화
    setErrors({ email: "", password: "", confirmPassword: "" });

    let hasError = false;

    if (!formData.email) {
      setErrors(prev => ({ ...prev, email: "이메일을 입력해주세요." }));
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors(prev => ({ ...prev, email: "이메일 형식으로 작성해 주세요." }));
      hasError = true;
    }

    if (!formData.password) {
      setErrors(prev => ({ ...prev, password: "비밀번호를 입력해주세요." }));
      hasError = true;
    } else if (formData.password.length < 8) {
      setErrors(prev => ({ ...prev, password: "8자 이상 입력해 주세요." }));
      hasError = true;
    }

    if (!formData.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: "비밀번호 확인을 입력해주세요." }));
      hasError = true;
    } else if (formData.password !== formData.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: "비밀번호가 일치하지 않습니다." }));
      hasError = true;
    }

    return !hasError;
  };

  // 폼 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 폼 유효성 검사
    if (!validateForm()) return;

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
