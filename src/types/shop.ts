import { REGION_OPTIONS, CATEGORY_OPTIONS } from "@/constants/options";
import { User } from "@/types/user";
import { LinkInfo } from "@/types/links";

export interface ShopItem {
  id: string;
  name: string; // 가게 이름
  category: (typeof CATEGORY_OPTIONS)[number]["value"]; //  가게 분류
  address1: (typeof REGION_OPTIONS)[number]["value"]; // 주소
  address2: string; // 상세 주소
  description: string; // 가게 설명
  imageUrl: string; // 가게 이미지
  originalHourlyPay: number; //  기존 시급
}

export interface ShopInfomation {
  item: ShopItem;
  href: string;
}

// POST '/shops' - 가게 등록 Request
// PUT '/shops/{shop_id}' - 가게 정보 수정 Request
export type ShopRequest = Omit<ShopItem, "id">;

// POST '/shops' - 가게 등록 Response
// GET '/shops/{shop_id}' - 가게 정보 조회 Response
// PUT '/shops/{shop_id}' - 가게 정보 수정 Response
export interface ShopResponse {
  item: ShopItem & {
    user: {
      item: User;
      href: string;
    };
  };
  links: LinkInfo[];
}
