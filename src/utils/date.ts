// Date 객체를 HH:mm 형식의 문자열로 변환
export function formatTime(date: Date): string {
  if (isNaN(date.getTime())) return "";
  return date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

// Date 객체를 YYYY.MM.DD 형식의 문자열로 변환
export function formatDate(date: Date): string {
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

// Date 객체를 YYYY-MM-DD 문자열로 변환하는 함수 (API 전송용)
export const formatDateToString = (date: Date): string => {
  return date.toISOString().split("T")[0];
};
