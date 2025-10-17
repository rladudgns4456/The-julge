import { useState } from "react";

// 공통 에러 타입
export interface BaseErrors {
  email: string;
  password: string;
}

export interface SignupErrors extends BaseErrors {
  confirmPassword: string;
}

// 에러 검증 훅
export const useFormValidation = <E extends BaseErrors>(initialErrors: E) => {
  const [errors, setErrors] = useState<E>(initialErrors);

  // 로그인,회원가입 공통 유효성 검사
  const validateEmail = (email: string): string => {
    if (!email) return "이메일을 입력해주세요.";
    if (!/\S+@\S+\.\S+/.test(email)) return "이메일 형식으로 작성해 주세요.";
    return "";
  };

  const validatePassword = (password: string): string => {
    if (!password) return "비밀번호를 입력해주세요.";
    if (password.length < 8) return "8자 이상 입력해 주세요.";
    return "";
  };

  const validateConfirmPassword = (password: string, confirmPassword: string): string => {
    if (!confirmPassword) return "비밀번호 확인을 입력해주세요.";
    if (password !== confirmPassword) return "비밀번호가 일치하지 않습니다.";
    return "";
  };

  // 로그인용 유효성
  const validateLoginForm = (email: string, password: string): boolean => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors(prev => ({
      ...prev,
      email: emailError,
      password: passwordError,
    }));

    return !emailError && !passwordError;
  };

  // 회원가입용 유효성
  const validateSignupForm = (email: string, password: string, confirmPassword?: string): boolean => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    let confirmPasswordError = "";
    if (confirmPassword !== undefined) {
      confirmPasswordError = validateConfirmPassword(password, confirmPassword);
    }

    setErrors(prev => ({
      ...prev,
      email: emailError,
      password: passwordError,
      ...(confirmPasswordError && { confirmPassword: confirmPasswordError }),
    }));

    return !emailError && !passwordError && !confirmPasswordError;
  };

  // 특정 필드 에러 초기화
  const clearFieldError = (field: keyof E) => {
    setErrors(prev => ({
      ...prev,
      [field]: "",
    }));
  };

  // 모든 에러 초기화
  const clearAllErrors = () => {
    setErrors(initialErrors);
  };

  // 실시간 이메일 검사
  const validateEmailRealtime = (email: string) => {
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      setErrors(prev => ({
        ...prev,
        email: "이메일 형식으로 작성해 주세요.",
      }));
    } else {
      clearFieldError("email" as keyof E);
    }
  };

  return {
    errors,
    setErrors,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateLoginForm,
    validateSignupForm,
    clearFieldError,
    clearAllErrors,
    validateEmailRealtime,
  };
};
