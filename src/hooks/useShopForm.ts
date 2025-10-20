"use client";

import { useState, useEffect, ChangeEvent, FocusEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { putShop, postShop } from "@/api/shop/ShopApi";
import {
  ShopFormData,
  ShopValidationErrors,
  createEmptyErrors,
  validateShopForm,
  validateShopName,
  validateCategory,
  validateAddress1,
  validateAddress2,
  validateOriginalHourlyPay,
  validateImageUrl,
  hasValidationErrors,
} from "@/utils/shopValidation";
import { ShopItem } from "@/types/shop";

type FormMode = "new" | "edit";

interface UseShopFormProps {
  mode?: FormMode;
  shopId?: string | null;
  initialData?: ShopItem | null;
}

interface UseShopFormReturn {
  mode: FormMode;
  formData: ShopFormData;
  validationErrors: ShopValidationErrors;
  isLoading: boolean;
  error: string | null;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleInputBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleImageUpload: (imageUrl: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleClose: () => void;
}

// 필드별 유효성 검사 함수 매핑
const FIELD_VALIDATORS: Record<string, (value: string) => string> = {
  name: validateShopName,
  category: validateCategory,
  address1: validateAddress1,
  address2: validateAddress2,
  originalHourlyPay: validateOriginalHourlyPay,
  imageUrl: validateImageUrl,
};

export const useShopForm = ({ mode = "new", shopId, initialData }: UseShopFormProps): UseShopFormReturn => {
  const router = useRouter();

  const initialFormData = <ShopFormData>{
    name: "",
    category: "",
    address1: "",
    address2: "",
    originalHourlyPay: "",
    imageUrl: "",
    description: "",
  };

  const [formData, setFormData] = useState<ShopFormData>(initialFormData);
  const [validationErrors, setValidationErrors] = useState<ShopValidationErrors>(createEmptyErrors());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //   편집모드 초기 데이터로 폼 채우기
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        name: initialData.name,
        category: initialData.category,
        address1: initialData.address1,
        address2: initialData.address2,
        originalHourlyPay: String(initialData.originalHourlyPay),
        imageUrl: initialData.imageUrl,
        description: initialData.description,
      });
    }
  }, [mode, initialData]);

  //   입력값 변경 핸들러
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  //   입력 필드 Blur 시 개별 유효성 검사
  const handleInputBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // 해당 필드의 validator 함수 가져오기
    const validator = FIELD_VALIDATORS[name];

    if (validator) {
      const errorMessage = validator(value);
      setValidationErrors(prev => ({
        ...prev,
        [name]: errorMessage,
      }));
    }
  };

  // 이미지 업로드
  const handleImageUpload = (imageUrl: string) => {
    setFormData(prev => ({
      ...prev,
      imageUrl,
    }));

    setValidationErrors(prev => ({
      ...prev,
      imageUrl: "",
    }));
  };

  // API 요청 데이터 생성
  const createRequestBody = () => {
    return {
      name: formData.name.trim(),
      category: formData.category,
      address1: formData.address1,
      address2: formData.address2.trim(),
      originalHourlyPay: Number(formData.originalHourlyPay),
      imageUrl: formData.imageUrl,
      description: formData.description.trim() || "", // 빈 문자열도 허용
    };
  };

  // 폼 제출 핸들러 (등록 또는 수정)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 전체 유효성 검사
    const errors = validateShopForm(formData);
    setValidationErrors(errors);

    if (hasValidationErrors(errors)) {
      setError("입력 내용을 확인해주세요.");
      return;
    }

    // 편집 모드일 때 shopId 확인
    if (mode === "edit" && !shopId) {
      setError("가게 정보가 없습니다.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const requestBody = createRequestBody();

      if (mode === "edit" && shopId) {
        // 편집 모드: PUT 요청
        await putShop(shopId, requestBody);
      } else {
        // 등록 모드: POST 요청
        await postShop(requestBody);
      }

      // 성공 시 사장 페이지로 이동
      router.push("/owner");
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : mode === "edit"
          ? "가게 수정에 실패했습니다."
          : "가게 등록에 실패했습니다.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    router.back();
  };

  return {
    mode,
    formData,
    validationErrors,
    isLoading,
    error,
    handleInputChange,
    handleInputBlur,
    handleImageUpload,
    handleSubmit,
    handleClose,
  };
};
