import instance from "@/api/axios";
import {
  GetNoticesResponse,
  GetShopNoticesResponse,
  NoticeBodyRequst,
  NoticeDetailInfo,
  NoticeShopInfo,
} from "@/types/notice";
import { handleApiError } from "@/api/error/ErrorHandler";

// GET / notices 공고 조회
export const getNotices = async (query?: {
  offset?: number;
  limit?: number;
  address?: string[];
  keyword?: string;
  startsAtGte?: string;
  hourlyPayGte?: number;
  sort?: "time" | "pay" | "hour" | "shop";
}): Promise<GetNoticesResponse> => {
  try {
    const { address, ...rest } = query ?? {}; // address만 분리

    const newQuery = new URLSearchParams();

    // 키값을 하나씩 꺼내 문자열 변환
    Object.entries(rest).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        newQuery.set(key, String(value));
      }
    });

    // 배열로 각 값의 trim 적용, 유효한 값만 append
    address?.forEach(addr => {
      const trimmed = addr.trim();
      if (trimmed) {
        newQuery.append("address", trimmed);
      }
    });

    const response = await instance.get<GetNoticesResponse>(`/notices?${newQuery}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// GET '/shops/{shop_id}/notices' 가게별 공고 조회
export const getShopNotices = async (
  shopId: string,
  query?: { offset?: number; limit?: number },
): Promise<GetShopNoticesResponse> => {
  try {
    const newQuery = new URLSearchParams({
      offset: String(query?.offset ?? ""),
      limit: String(query?.limit ?? ""),
    });
    const response = await instance.get<GetNoticesResponse>(`/shops/${shopId}/notices?${newQuery}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// POST '/shops/{shop_id}/notices' 공고 등록
export const postShopNotice = async (shopId: string, body: NoticeBodyRequst): Promise<NoticeShopInfo> => {
  try {
    const response = await instance.post<NoticeShopInfo>(`/shops/${shopId}/notices`, body);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// GET '/shops/{shop_id}/notices/{notice_id}' - 가게의 특정 공고 조회
export const getShopNotice = async (shopId: string, noticeId: string): Promise<NoticeDetailInfo> => {
  try {
    const response = await instance.get<NoticeDetailInfo>(`/shops/${shopId}/notices/${noticeId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// PUT '/shops/{shop_id}/notices/{notice_id}' - 특정 공고 수정
export const putShopNotice = async (
  shopId: string,
  noticeId: string,
  body: NoticeBodyRequst,
): Promise<NoticeShopInfo> => {
  try {
    const response = await instance.put<NoticeShopInfo>(`/shops/${shopId}/notices/${noticeId}`, body);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
