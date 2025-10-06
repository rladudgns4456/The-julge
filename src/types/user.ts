export type UserType = User["type"] | null;

// 가게 정보
export interface Shop {
  item: {
    id: string;
    name: string; // 가게 이름
    category: string; //  가게 분류
    address1: string; // 주소
    address2: string; // 상세 주소
    description: string; // 가게 설명
    imageUrl: string; // 가게 이미지
    originalHourlyPay: number; //  기존 시급
  };
  href: string; // 프로필URL
}

// 유저 정보 (내 정보 조회)
export interface User {
  id: string;
  email: string; // 로그인 이메일
  type: "employer" | "employee"; // 사장 | 알바
  name?: string; // 이름
  phone?: string; // 연락처
  address?: string; // 선호 지역
  bio?: string; // 자기 소개
  shop?: Shop | null; // 사장 유저
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
