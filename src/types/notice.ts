import { ShopInfomation } from "@/types/shop";
import { Application } from "@/types/notification";
import { LinkInfo } from "@/types/links";

export interface Notice {
  id: string;
  hourlyPay: number; //  시급
  description: string; // 공고 설명
  startsAt: string; // 근무 시작 시간
  workhour: number; // 근무 시간
  closed: boolean; //마감 여부
}

// shop 포함된 확장형 Notice (리스트, 등록, 수정에 사용)
export interface NoticeShopItem extends Notice {
  shop: ShopInfomation;
}

// application까지 포함된 상세형 Notice (상세 조회 시 사용)
export interface NoticeDetailItem extends NoticeShopItem {
  currentUserApplication: null | {
    item: Application;
  };
}

export interface NoticeInfo {
  item: Notice;
  links: LinkInfo[];
}

// POST '/shops/{shop_id}/notices' - 공고 등록 Response
// PUT '/shops/{shop_id}/notices/{notice_id}' - 특정 공고 수정 Response
export interface NoticeShopInfo {
  item: NoticeShopItem;
  links: LinkInfo[];
}

// GET '/shops/{shop_id}/notices/{notice_id}' - 가게의 특정 공고 조회 Response
export interface NoticeDetailInfo {
  item: NoticeDetailItem;
  links: LinkInfo[];
}

// GET '/notices' - 공고 조회 Response
export interface GetNoticesResponse {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  address: string[];
  keyword?: string;
  items: NoticeShopInfo[];
  links: LinkInfo[];
}

// GET '/shops/{shop_id}/notices' - 가게별 공고 조회 Response
export interface GetShopNoticesResponse {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: NoticeInfo[];
  links: LinkInfo[];
}

// POST '/shops/{shop_id}/notices' - 공고 등록 Request Body
// PUT '/shops/{shop_id}/notices/{notice_id}' - 특정 공고 수정 Request Body
export interface NoticeBodyRequst {
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
}
