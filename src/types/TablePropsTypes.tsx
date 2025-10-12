// 테이블 관련 타입 정의
export interface ApplicantData {
  id: string;
  name: string;
  introduction: string;
  phoneNumber: string;
  status: "pending" | "approved" | "rejected";
}

// 페이지네이션 관련 타입 정의
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// 테이블 관련 타입 정의
export interface TableProps {
  title: string;
  data: ApplicantData[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

// 신청 내역용 데이터 타입
export interface ApplicationData {
  id: string;
  store: string;
  date: string;
  hourlyWage: string;
  status: "approved" | "rejected" | "pending";
}

// 신청 내역 테이블 Props
export interface ApplicationTableProps {
  data: ApplicationData[];
}

// 기존 타입
export interface User {
  id: string;
  name: string;
  email: string;
}
