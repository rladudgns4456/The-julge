import { LinkInfo } from "@/types/links";
import { NoticeInfo } from "@/types/notice";
import { ShopInfomation } from "@/types/shop";
import { User } from "@/types/user";

export type ApplicationStatus = "pending" | "accepted" | "rejected" | "canceled";

export interface Application {
  id: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

export interface ApplicationUserItem extends Application {
  shop: ShopInfomation;
  notice: NoticeInfo;
}

export interface ApplicationNoticeItem extends Application {
  user: {
    item: User;
    href: string;
  };
}

export interface ApplicationUserInfo {
  item: ApplicationUserItem;
  links: LinkInfo[];
}

// POST - 가게의 특정 공고 지원 등록 Response
// PUT - 가게의 특정 공고 지원 승인, 거절, 취소 Response
export interface ApplicationNoticeInfo {
  item: ApplicationNoticeItem;
  links: LinkInfo[];
}

// GET - 유저의 지원 목록 조회 Response
export interface ApplicationUserResponse {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: ApplicationUserInfo[];
  links: LinkInfo[];
}

// GET - 가게의 특정 공고의 지원 목록 조회 Response
export interface ApplicationNoticeResponse {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: ApplicationNoticeInfo[];
  links: LinkInfo[];
}

// PUT - 가게의 특정 공고 지원 승인, 거절, 취소 Request
export interface ApplicationRequest {
  status: Exclude<ApplicationStatus, "pending">; // pending 제외
}
