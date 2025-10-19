import { useState, ChangeEvent, FocusEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { postShopNotice } from "@/api/notice/NoticeApi";
import {
  NoticeFormData,
  NoticeValidationErrors,
  validateNoticeForm,
  validateHourlyPay,
  validateStartsAt,
  validateWorkhour,
  hasValidationErrors,
} from "@/hooks/useNoticeValidation";

interface UseNoticeFormProps {
  shopId: string | null;
}

export const useNoticeForm = ({ shopId }: UseNoticeFormProps) => {
  const router = useRouter();

  const [formData, setFormData] = useState<NoticeFormData>({
    hourlyPay: "",
    startsAt: "",
    workhour: "",
    description: "",
  });

  const [validationErrors, setValidationErrors] = useState<NoticeValidationErrors>({
    hourlyPay: "",
    startsAt: "",
    workhour: "",
    description: "",
  });

  const [dateInputType, setDateInputType] = useState<"text" | "datetime-local">("text");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 입력값 변경 핸들러
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // 입력 시 해당 필드의 에러 초기화
    setValidationErrors(prev => ({
      ...prev,
      [name]: "",
    }));
  };

  /**
   * 입력 필드 블러 시 개별 유효성 검사
   */
  const handleInputBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let errorMessage = "";

    switch (name) {
      case "hourlyPay":
        errorMessage = validateHourlyPay(value);
        break;
      case "startsAt":
        errorMessage = validateStartsAt(value);
        break;
      case "workhour":
        errorMessage = validateWorkhour(value);
        break;
    }

    setValidationErrors(prev => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  /**
   * 날짜 입력 포커스 핸들러
   */
  const handleDateFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.target.type = "datetime-local";
    setDateInputType("datetime-local");
  };

  /**
   * 날짜 입력 블러 핸들러
   */
  const handleDateBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      e.target.type = "text";
      setDateInputType("text");
    }

    handleInputBlur(e);
  };

  /**
   * 폼 제출 핸들러
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 전체 유효성 검사
    const errors = validateNoticeForm(formData);
    setValidationErrors(errors);

    if (hasValidationErrors(errors)) {
      return;
    }

    if (!shopId) {
      setError("가게 정보를 찾을 수 없습니다.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formattedStartsAt = new Date(formData.startsAt).toISOString();

      await postShopNotice(shopId, {
        hourlyPay: Number(formData.hourlyPay),
        startsAt: formattedStartsAt,
        workhour: Number(formData.workhour),
        description: formData.description || "공고 설명이 없습니다.",
      });

      router.push("/owner");
    } catch (err) {
      setError(err instanceof Error ? err.message : "공고 등록에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 닫기 핸들러
   */
  const handleClose = () => {
    router.back();
  };

  return {
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
  };
};
