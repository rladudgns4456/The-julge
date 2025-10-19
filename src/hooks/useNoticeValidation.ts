export interface NoticeFormData {
  hourlyPay: string;
  startsAt: string;
  workhour: string;
  description: string;
}

export interface NoticeValidationErrors {
  hourlyPay: string;
  startsAt: string;
  workhour: string;
  description: string;
}

/**
 * 시급 유효성 검사
 */
export const validateHourlyPay = (value: string): string => {
  if (!value) {
    return "시급을 입력해주세요.";
  }

  const hourlyPay = Number(value);

  if (isNaN(hourlyPay) || hourlyPay <= 0) {
    return "시급은 0보다 커야 합니다.";
  }

  return "";
};

/**
 * 시작 일시 유효성 검사 (오늘 이후만 가능)
 */
export const validateStartsAt = (value: string): string => {
  if (!value) {
    return "시작 일시를 입력해주세요.";
  }

  const selectedDate = new Date(value);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (isNaN(selectedDate.getTime())) {
    return "올바른 날짜를 입력해주세요.";
  }

  if (selectedDate < today) {
    return "시작 일시는 오늘 이후로 선택해주세요.";
  }

  return "";
};

/**
 * 근무 시간 유효성 검사 (1~24시간)
 */
export const validateWorkhour = (value: string): string => {
  if (!value) {
    return "근무 시간을 입력해주세요.";
  }

  const workhour = Number(value);

  if (isNaN(workhour) || workhour <= 0) {
    return "근무 시간은 0보다 커야 합니다.";
  }

  if (workhour > 12) {
    return "근무 시간은 12시간을 초과할 수 없습니다.";
  }

  return "";
};

/**
 * 전체 폼 유효성 검사
 */
export const validateNoticeForm = (formData: NoticeFormData): NoticeValidationErrors => {
  return {
    hourlyPay: validateHourlyPay(formData.hourlyPay),
    startsAt: validateStartsAt(formData.startsAt),
    workhour: validateWorkhour(formData.workhour),
    description: "",
  };
};

/**
 * 유효성 검사 에러가 있는지 확인
 */
export const hasValidationErrors = (errors: NoticeValidationErrors): boolean => {
  return Object.values(errors).some(error => error !== "");
};
