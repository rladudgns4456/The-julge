import { ShopItem } from "@/types/shop";
import { Notice } from "@/types/notice";
import { Application } from "@/types/application";
import { LinkInfo } from "./links";

export interface NotificationItem {
  id: string;
  createdAt: string; // 생성 시간
  result: "accepted" | "rejected"; // 지원 결과
  read: boolean; // 읽음 여부  
  application: {
    item: Application;
    href: string;
  }; // 지원서 정보
  shop: {
    item: ShopItem;
    href: string;
  }; // 가게 정보
  notice: {
    item: Notice;
    href: string;
  }; // 공고 정보
}

export interface NotificationInfo {
  item: NotificationItem;
  links: LinkInfo[];
}

// GET - 알림 목록 조회
export interface NotificationListResponse {
  offset: number; //  페이지네이션 시작
  limit: number; // 페이지당 개수
  count: number; // 전체 알림 개수
  hasNext: boolean; //  다음 페이지 존재 여부
  items: NotificationInfo[]; // 알림 목록
  links: LinkInfo[];
}

// PUT - 알림 읽음 처리
export interface NotificationReadResponse {
  offset: number;
  linmit: number;
  items: NotificationInfo[];
  links: LinkInfo[];
}
