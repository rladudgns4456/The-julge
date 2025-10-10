import { Shop } from "./user";

export interface Application {
  item: {
    id: string;
    status: "pending" | "accepted" | "rejected";
  };
  href: string;
}

export interface Notice {
  item: {
    id: string;
    hourlyPay: number; //  시급
    description: string; // 공고 설명
    startsAt: string; // 근무 시작 시간
    workhour: number; // 근무 시간
    closed: boolean; //마감 여부
  };
  href: string;
}

export interface NotificationItem {
  item: {
    id: string;
    createdAt: string; // 생성 시간
    result: "accepted" | "rejected"; // 지원 결과
    read: boolean; // 읽음 여부
    application: Application; // 지원서 정보
    shop: Shop; // 가게 정보
    notice: Notice; // 공고 정보
  };
  links: unknown[];
}

// 알림 목록 조회
export interface NotificationListResponse {
  offset: number; //  페이지네이션 시작
  limit: number; // 페이지당 개수
  count: number; // 전체 알림 개수
  hasNext: boolean; //  다음 페이지 존재 여부
  items: NotificationItem[]; // 알림 목록
  links: unknown[];
}

// 알림 읽음 처리
export interface NotificationReadResponse {
  offset: number;
  linmit: number;
  items: NotificationItem[];
  links: unknown[];
}
