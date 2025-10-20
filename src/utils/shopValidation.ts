import { CATEGORY_OPTIONS, REGION_OPTIONS } from "@/constants/options";

// 가게 폼 데이터 타입
export interface ShopFormData {
  name: string;
  category: string;
  address1: string;
  address2: string;
  originalHourlyPay: string;
  imageUrl: string;
  description: string;
}

// 가게 폼 유효성 에러 타입
export interface ShopValidationErrors {
  name: string;
  category: string;
  address1: string;
  address2: string;
  originalHourlyPay: string;
  imageUrl: string;
  description: string;
}

// 빈 에러 객체 생성
export const createEmptyErrors = (): ShopValidationErrors => ({
  name: "",
  category: "",
  address1: "",
  address2: "",
  originalHourlyPay: "",
  imageUrl: "",
  description: "",
});

// 가게 이름 유효성 검사
export const validateShopName = (name: string): string => {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return "가게 이름을 입력해주세요.";
  }

  if (trimmedName.length < 2) {
    return "가게 이름은 2글자 이상이어야 합니다.";
  }

  if (trimmedName.length > 50) {
    return "가게 이름은 50글자 이하여야 합니다.";
  }

  return "";
};

// 분류 유효성 검사
export const validateCategory = (category: string): string => {
  if (!category || !category.trim()) {
    return "분류를 선택해주세요.";
  }

  // 허용된 카테고리 목록 확인
  const validCategories = CATEGORY_OPTIONS.map(opt => opt.label);
  if (!validCategories.includes(category)) {
    return "올바른 분류를 선택해주세요.";
  }

  return "";
};

// 주소 유효성 검사
export const validateAddress1 = (address1: string): string => {
  if (!address1 || !address1.trim()) {
    return "주소를 선택해주세요.";
  }

  // 허용된 주소 목록 확인
  const validAddresses = REGION_OPTIONS.map(opt => opt.label);
  if (!validAddresses.includes(address1)) {
    return "올바른 주소를 선택해주세요.";
  }

  return "";
};

// 상세 주소 유효성 검사
export const validateAddress2 = (address2: string): string => {
  const trimmedAddress = address2.trim();

  if (!trimmedAddress) {
    return "상세 주소를 입력해주세요.";
  }

  if (trimmedAddress.length < 2) {
    return "상세 주소는 2글자 이상이어야 합니다.";
  }

  return "";
};

// 기본 시급 유효성 검사
export const validateOriginalHourlyPay = (pay: string): string => {
  if (!pay || !pay.trim()) {
    return "기본 시급을 입력해주세요.";
  }

  const numPay = Number(pay);

  if (isNaN(numPay)) {
    return "올바른 숫자를 입력해주세요.";
  }

  if (numPay < 9860) {
    return "2024년 최저시급(9,860원) 이상이어야 합니다.";
  }

  if (numPay > 1000000) {
    return "시급은 1,000,000원 이하여야 합니다.";
  }

  return "";
};

// 이미지 URL 유효성 검사
export const validateImageUrl = (imageUrl: string): string => {
  if (!imageUrl || !imageUrl.trim()) {
    return "가게 이미지를 등록해주세요.";
  }
  return "";
};

// 전체 폼 유효성 검사
export const validateShopForm = (formData: ShopFormData): ShopValidationErrors => {
  return {
    name: validateShopName(formData.name),
    category: validateCategory(formData.category),
    address1: validateAddress1(formData.address1),
    address2: validateAddress2(formData.address2),
    originalHourlyPay: validateOriginalHourlyPay(formData.originalHourlyPay),
    imageUrl: validateImageUrl(formData.imageUrl),
    description: "", // 선택사항
  };
};

// 에러가 있는지 확인
export const hasValidationErrors = (errors: ShopValidationErrors): boolean => {
  return Object.values(errors).some(error => error !== "");
};
