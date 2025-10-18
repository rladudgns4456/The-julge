import { LinkInfo } from "@/types/links";
import { ShopItem } from "@/types/shop";

export type UserType = "employer" | "employee" | null;

// 유저 정보 (내 정보 조회)
export interface User {
  id: string;
  email: string; // 로그인 이메일
  type: UserType; // 사장 | 알바
  name?: string; // 이름
  phone?: string; // 연락처
  address?: string; // 선호 지역
  bio?: string; // 자기 소개
}

// Shop 정보 포함된 유저 (상세 조회)
export interface UserDetailItem extends User {
  shop: { item: ShopItem } | null;
}

// GET '/users/{userId}' - 유저 정보 조회 Response
export interface UserDetailResponse {
  item: UserDetailItem;
  links: LinkInfo[];
}

export interface LoginResponse {
  item: {
    token: string;
    user: {
      item: User;
      href: string;
    };
  };
  links: [];
}
