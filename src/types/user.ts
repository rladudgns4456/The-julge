import { ShopInfomation } from "./shop";

export type UserType = User["type"] | null;

// 유저 정보 (내 정보 조회)
export interface User {
  id: string;
  email: string; // 로그인 이메일
  type: "employer" | "employee"; // 사장 | 알바
  name?: string; // 이름
  phone?: string; // 연락처
  address?: string; // 선호 지역
  bio?: string; // 자기 소개
  shop?: ShopInfomation | null; // 사장 유저
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
