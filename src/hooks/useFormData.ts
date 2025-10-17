import { useState } from "react";

// 공통 폼 데이터 타입
export interface BaseFormData {
  email: string;
  password: string;
}

// 사장|알바 폼
export interface SignupFormData extends BaseFormData {
  confirmPassword: string;
  userType: "employee" | "employer";
}

// 폼 데이터 관리 전용 훅
export const useFormData = <T extends BaseFormData>(initialFormData: T) => {
  const [formData, setFormData] = useState<T>(initialFormData);
  const updateFormData = (updates: Partial<T>) => {
    setFormData(prev => ({
      ...prev,
      ...updates,
    }));
  };

  // 특정 필드 업데이트
  const updateField = (field: keyof T, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // 폼 데이터 초기화
  const resetFormData = () => {
    setFormData(initialFormData);
  };

  return {
    formData,
    setFormData,
    updateFormData,
    updateField,
    resetFormData,
  };
};
