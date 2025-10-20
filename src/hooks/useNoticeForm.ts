import { useState, ChangeEvent, FocusEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { postShopNotice, putShopNotice } from "@/api/notice/NoticeApi";
import {
  NoticeFormData,
  NoticeValidationErrors,
  validateNoticeForm,
  validateHourlyPay,
  validateStartsAt,
  validateWorkhour,
  hasValidationErrors,
} from "@/hooks/useNoticeValidation";
import { NoticeDetailItem } from "@/types/notice";

type FormMode = "new" | "edit";

interface UseNoticeFormProps {
  shopId: string | null;
  mode?: FormMode;
  noticeId?: string | null;
  initialData?: NoticeDetailItem | null;
}

interface UseNoticeFormReturn {
  mode: FormMode;
  formData: NoticeFormData;
  validationErrors: NoticeValidationErrors;
  dateInputType: "text" | "datetime-local";
  isLoading: boolean;
  error: string | null;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleInputBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleDateFocus: (e: FocusEvent<HTMLInputElement>) => void;
  handleDateBlur: (e: FocusEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleClose: () => void;
}

/**
 * 공고 등록 및 편집 통합+
 * @param mode - "new"(등록) or "edit"(편집)
 * @param shopId - 가게 ID
 * @param noticeId - 공고 ID (편집 모드에서만 필요)
 * @param initialData - 초기 데이터 (편집 모드에서만 필요)
 */
export const useNoticeForm = ({
  shopId,
  mode = "new",
  noticeId,
  initialData,
}: UseNoticeFormProps): UseNoticeFormReturn => {
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

  useEffect(() => {
    if (mode === "edit" && initialData) {
      // ISO 문자열을 datetime-local 형식으로 변환
      const formattedDate = initialData.startsAt ? new Date(initialData.startsAt).toISOString().slice(0, 16) : "";

      setFormData({
        hourlyPay: String(initialData.hourlyPay),
        startsAt: formattedDate,
        workhour: String(initialData.workhour),
        description: initialData.description,
      });

      // 날짜가 있으면 datetime-local 타입으로 설정
      if (formattedDate) {
        setDateInputType("datetime-local");
      }
    }
  }, [mode, initialData]);

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

    // 편집 모드일 때 noticeId 확인
    if (mode === "edit" && !noticeId) {
      setError("공고 정보가 없습니다.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formattedStartsAt = new Date(formData.startsAt).toISOString();
      const requestBody = {
        hourlyPay: Number(formData.hourlyPay),
        startsAt: formattedStartsAt,
        workhour: Number(formData.workhour),
        description: formData.description || "공고 설명이 없습니다.",
      };

      if (mode === "edit" && noticeId) {
        // 편집 모드 - PUT 요청
        await putShopNotice(shopId, noticeId, requestBody);
        router.push(`/owner/notice/${shopId}/${noticeId}`);
      } else {
        // 등록 모드: POST 요청
        await postShopNotice(shopId, requestBody);
        router.push("/owner");
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : mode === "edit"
            ? "공고 수정에 실패했습니다."
            : "공고 등록에 실패했습니다.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  // 닫기 핸들러
  const handleClose = () => {
    router.back();
  };

  return {
    mode,
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
