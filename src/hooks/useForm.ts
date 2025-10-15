import { BaseFormData } from "@/hooks/useFormData";
import { BaseErrors } from "@/hooks/useFormValidation";
import { useFormData } from "@/hooks/useFormData";
import { useFormValidation } from "@/hooks/useFormValidation";

// 통합 폼 관리
export const useForm = <T extends BaseFormData, E extends BaseErrors>(initialFormData: T, initialErrors: E) => {
  const { formData, setFormData, updateFormData, updateField, resetFormData } = useFormData(initialFormData);

  // 에러 검증 관리
  const {
    errors,
    setErrors,
    validateLoginForm,
    validateSignupForm,
    clearFieldError,
    clearAllErrors,
    validateEmailRealtime,
  } = useFormValidation(initialErrors);

  // 통합 입력 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // 폼 데이터 업데이트
    updateField(name as keyof T, value);

    // 필드 에러 초기화
    if (errors[name as keyof E]) {
      clearFieldError(name as keyof E);
    }

    // 이메일 검사
    if (name === "email") {
      validateEmailRealtime(value);
    }
  };

  // 폼 초기화용용
  const resetForm = () => {
    resetFormData();
    clearAllErrors();
  };

  return {
    // 폼 데이터
    formData,
    setFormData,
    updateFormData,
    updateField,

    // 에러 관리
    errors,
    setErrors,
    clearFieldError,
    clearAllErrors,

    // 통합 기능
    handleInputChange,
    validateLoginForm: () => validateLoginForm(formData.email, formData.password),
    validateSignupForm: () => {
      if ("confirmPassword" in formData) {
        return validateSignupForm(formData.email, formData.password, (formData as any).confirmPassword);
      }
      return validateSignupForm(formData.email, formData.password);
    },
    resetForm,
  };
};
