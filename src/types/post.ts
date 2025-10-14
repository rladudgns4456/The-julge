// 포스트 카드 관련 타입 정의

export interface PostData {
  id: string;
  shop: {
    id: string;
    name: string;
    address1: string;
    imageUrl: string;
    originalHourlyPay: number;
  };
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  closed: boolean;
}

export interface PostCardProps {
  post: PostData;
  onClick?: (post: PostData) => void;
}
