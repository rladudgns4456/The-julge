import instance from "../axios";
import { AxiosError } from "axios";

export interface GetNoticesParams {
  offset?: number;
  limit?: number;
  address?: string | string[];
  startsAtGte?: string;
  hourlyPayGte?: number;
  sort?: string;
}

interface ErrorMessage {
  message: string;
}

// 공고 목록 조회 중앙화
export const getNotices = async (params: GetNoticesParams) => {
  try {
    const qs = new URLSearchParams();
    if (typeof params.offset !== "undefined") qs.append("offset", String(params.offset));
    if (typeof params.limit !== "undefined") qs.append("limit", String(params.limit));
    if (params.address) {
      if (Array.isArray(params.address)) {
        params.address.forEach(a => qs.append("address", a));
      } else {
        qs.append("address", params.address);
      }
    }
    if (params.startsAtGte) qs.append("startsAtGte", params.startsAtGte);
    if (typeof params.hourlyPayGte !== "undefined") qs.append("hourlyPayGte", String(params.hourlyPayGte));
    if (params.sort) qs.append("sort", params.sort);

    const response = await instance.get(`/notices?${qs.toString()}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorMessage>;
    if (axiosError.response) {
      throw new Error(axiosError.response.data.message || "공고 조회 실패");
    }
    throw new Error("서버에 연결할 수 없습니다. 인터넷 연결을 확인해주세요.");
  }
};
