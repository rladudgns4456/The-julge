import { PostData } from "@/types/post";

// 단일 포스트 아이템을 PostData로 변환 (응답 구조 정규화)
export const transformPostItem = (item: any): PostData => {
  // API가 HATEOAS 스타일로 중첩된 `.item`을 반환하는 경우가 있어 정규화
  const normalizedItem = item?.item || item || {};
  const normalizedShop = normalizedItem?.shop?.item || normalizedItem?.shop || {};

  return {
    id: normalizedItem.id,
    shop: {
      id: normalizedShop.id,
      name: normalizedShop.name,
      address1: normalizedShop.address1,
      imageUrl: normalizedShop.imageUrl,
      originalHourlyPay: normalizedShop.originalHourlyPay,
    },
    hourlyPay: normalizedItem.hourlyPay,
    startsAt: normalizedItem.startsAt,
    workhour: normalizedItem.workhour,
    closed: normalizedItem.closed,
  } as PostData;
};

// API 응답을 PostData[]로 파싱
export const parsePostsResponse = (data: any): PostData[] => {
  // data.items: HATEOAS paged response, 혹은 단일 객체
  const items = data?.items ?? (Array.isArray(data) ? data : [data]);
  if (!items) return [];
  return Array.isArray(items) ? items.map(transformPostItem) : [transformPostItem(items)];
};
