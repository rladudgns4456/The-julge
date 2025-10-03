// 오늘 날짜를 Date 객체로 반환하는 함수

export const getTodayDate = (): Date => {
  return new Date();
};

// Date 객체를 YYYY-MM-DD 문자열로 변환하는 함수 (API 전송용)
export const formatDateToString = (date: Date): string => {
  return date.toISOString().split("T")[0];
};
