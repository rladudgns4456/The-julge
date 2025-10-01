export interface Option {
  label: string;
  value: string;
}

export interface CustomDropdownProps {
  label?: string; // 라벨 텍스트
  name: string; // name
  value: string; // 현재 선택된 값
  options: Option[]; // 외부에서 주입받는 옵션 리스트
  required?: boolean; // 필수 여부
  error?: string; // 에러 메시지
  onChange: (value: string) => void; // 값 변경 핸들러
}
