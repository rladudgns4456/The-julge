import instance from "@/api/axios";
import {
  GetNoticesResponse,
  GetShopNoticesResponse,
  NoticeBodyRequst,
  NoticeDetailInfo,
  NoticeShopInfo,
} from "@/types/notice";
import { handleApiError } from "@/api/error/ErrorHandler";

// 공고 조회 파라미터 타입
export interface GetNoticesParams {
  offset?: number;
  limit?: number;
  address?: string | string[];
  keyword?: string;
  startsAtGte?: string;
  hourlyPayGte?: number;
  sort?: "time" | "pay" | "hour" | "shop";
}

export type SortOption = NonNullable<GetNoticesParams["sort"]>;

/**
 * GET /notices - 공고 목록 조회
 * @param params - 조회 파라미터
 * @returns 공고 목록
 */
export const getNotices = async (params?: GetNoticesParams): Promise<GetNoticesResponse> => {
  try {
    const queryParams = new URLSearchParams();

    // 기본 파라미터 처리
    if (typeof params?.offset !== "undefined") {
      queryParams.append("offset", String(params.offset));
    }
    if (typeof params?.limit !== "undefined") {
      queryParams.append("limit", String(params.limit));
    }
    if (params?.keyword) {
      queryParams.append("keyword", params.keyword);
    }
    if (params?.startsAtGte) {
      queryParams.append("startsAtGte", params.startsAtGte);
    }
    if (typeof params?.hourlyPayGte !== "undefined") {
      queryParams.append("hourlyPayGte", String(params.hourlyPayGte));
    }
    if (params?.sort) {
      queryParams.append("sort", params.sort);
    }

    // address 배열 처리
    if (params?.address) {
      if (Array.isArray(params.address)) {
        params.address.forEach(addr => {
          const trimmed = addr.trim();
          if (trimmed) {
            queryParams.append("address", trimmed);
          }
        });
      } else {
        const trimmed = params.address.trim();
        if (trimmed) {
          queryParams.append("address", trimmed);
        }
      }
    }

    const response = await instance.get<GetNoticesResponse>(`/notices?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * GET /shops/{shop_id}/notices - 가게별 공고 조회
 * @param shopId - 가게 ID
 * @param query - 조회 파라미터
 * @returns 가게 공고 목록
 */
export const getShopNotices = async (
  shopId: string,
  query?: { offset?: number; limit?: number },
): Promise<GetShopNoticesResponse> => {
  try {
    const queryParams = new URLSearchParams();

    if (typeof query?.offset !== "undefined") {
      queryParams.append("offset", String(query.offset));
    }
    if (typeof query?.limit !== "undefined") {
      queryParams.append("limit", String(query.limit));
    }

    const response = await instance.get<GetShopNoticesResponse>(`/shops/${shopId}/notices?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * POST /shops/{shop_id}/notices - 공고 등록
 * @param shopId - 가게 ID
 * @param body - 공고 정보
 * @returns 등록된 공고 정보
 */
export const postShopNotice = async (shopId: string, body: NoticeBodyRequst): Promise<NoticeShopInfo> => {
  try {
    const response = await instance.post<NoticeShopInfo>(`/shops/${shopId}/notices`, body);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * GET /shops/{shop_id}/notices/{notice_id} - 가게의 특정 공고 조회
 * @param shopId - 가게 ID
 * @param noticeId - 공고 ID
 * @returns 공고 상세 정보
 */
export const getShopNotice = async (shopId: string, noticeId: string): Promise<NoticeDetailInfo> => {
  try {
    const response = await instance.get<NoticeDetailInfo>(`/shops/${shopId}/notices/${noticeId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * PUT /shops/{shop_id}/notices/{notice_id} - 특정 공고 수정
 * @param shopId - 가게 ID
 * @param noticeId - 공고 ID
 * @param body - 수정할 공고 정보
 * @returns 수정된 공고 정보
 */
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