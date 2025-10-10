import { User, Shop } from "@/types/user";

// Mock 가게 데이터
const mockShop: Shop = {
  item: {
    id: "shop-001",
    name: "스타벅스 강남점",
    category: "카페",
    address1: "서울특별시 강남구",
    address2: "테헤란로 123",
    description: "강남역 근처 스타벅스입니다.",
    imageUrl: "https://via.placeholder.com/400x300",
    originalHourlyPay: 12000,
  },
  href: "/shops/shop-001",
};

// Mock 알바 유저
export const mockEmployeeUser: User = {
  id: "user-001",
  email: "alba@example.com",
  type: "employee",
  name: "김알바",
  phone: "010-1234-5678",
  address: "서울특별시 강남구",
  bio: "성실하고 책임감 있는 알바생입니다.",
  shop: null,
};

// Mock 사장 유저
export const mockEmployerUser: User = {
  id: "user-002",
  email: "owner@example.com",
  type: "employer",
  name: "이사장",
  phone: "010-9876-5432",
  address: "서울특별시 강남구",
  bio: "좋은 환경의 가게를 운영하고 있습니다.",
  shop: mockShop,
};
