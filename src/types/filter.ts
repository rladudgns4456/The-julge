// 필터 옵션 인터페이스

export interface FilterOptions {
  location?: string[]; // 선택된 지역 목록
  hourlyWageMin?: number; // 최소 시급
  startDate?: Date; // 시작일 (Date 객체)
}

// 필터 컴포넌트 Props 인터페이스

export interface DetailFilterProps {
  isOpen: boolean; // 필터 열림 상태
  onClose: () => void; // 필터 닫기 함수
  onApply: (filters: FilterOptions) => void; // 필터 적용 함수
  onReset: () => void; // 필터 초기화 함수
  initialFilters?: FilterOptions; // 초기 필터 값
}
