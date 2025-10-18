import { PostData } from "@/types/post";

// 단일 포스트 아이템을 PostData로 변환
export const transformPostItem = (item: any): PostData => ({
  id: item.item?.id || item.id,
  shop: {
    id: item.item?.shop?.item?.id || item.shop?.id,
    name: item.item?.shop?.item?.name || item.shop?.name,
    address1: item.item?.shop?.item?.address1 || item.shop?.address1,
    imageUrl: item.item?.shop?.item?.imageUrl || item.shop?.imageUrl,
    originalHourlyPay: item.item?.shop?.item?.originalHourlyPay || item.shop?.originalHourlyPay,
  },
  hourlyPay: item.item?.hourlyPay || item.hourlyPay,
  startsAt: item.item?.startsAt || item.startsAt,
  workhour: item.item?.workhour || item.workhour,
  closed: item.item?.closed || item.closed,
});

// API 응답을 PostData[]로 파싱
export const parsePostsResponse = (data: any): PostData[] => {
  const items = data.items || [data];
  return Array.isArray(items) ? items.map(transformPostItem) : [transformPostItem(data)];
};
