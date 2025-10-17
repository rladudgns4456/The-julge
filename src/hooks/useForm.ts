import { BaseFormData, SignupFormData } from "@/hooks/useFormData";
import { BaseErrors } from "@/hooks/useFormValidation";
import { useFormData } from "@/hooks/useFormData";
import { useFormValidation } from "@/hooks/useFormValidation";

// 타입 가드: formData가 SignupFormData인지 확인
const isSignupFormData = (formData: BaseFormData): formData is SignupFormData => {
  return "confirmPassword" in formData;
};

// 통합 폼 관리
export const useForm = <T extends BaseFormData, E extends BaseErrors>(initialFormData: T, initialErrors: E) => {
  const { formData, setFormData, updateFormData, updateField, resetFormData } = useFormData(initialFormData);

  // 에러 검증
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

  // 폼 초기화
  const resetForm = () => {
    resetFormData();
    clearAllErrors();
  };

  return {
    formData,
    setFormData,
    updateFormData,
    updateField,

    errors,
    setErrors,
    clearFieldError,
    clearAllErrors,

    // 통합 기능
    handleInputChange,
    validateLoginForm: () => validateLoginForm(formData.email, formData.password),
    validateSignupForm: () => {
      if (isSignupFormData(formData)) {
        return validateSignupForm(formData.email, formData.password, formData.confirmPassword);
      }
      return validateSignupForm(formData.email, formData.password);
    },
    resetForm,
  };
};
