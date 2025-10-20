import instance from "../axios";
import {
  ApplicationNoticeResponse,
  ApplicationNoticeInfo,
  ApplicationRequest,
  ApplicationUserResponse,
} from "@/types/application";
import { handleApiError } from "../error/ErrorHandler";

// GET - 가게의 특정 공고의 지원 목록 조회
export const getNoticeApplications = async (
  shopId: string,
  noticeId: string,
  query?: { offset?: number; limit?: number },
): Promise<ApplicationNoticeResponse> => {
  try {
    const newQuery = new URLSearchParams({
      offset: String(query?.offset ?? ""),
      limit: String(query?.limit ?? ""),
    });

    const response = await instance.get<ApplicationNoticeResponse>(
      `/shops/${shopId}/notices/${noticeId}/applications?${newQuery}`,
    );

    return response.data;
  } catch (err) {
    return handleApiError(err);
  }
};

// POST - 가게의 특정 공고 지원 등록
export const postNoticeApplications = async (shopId: string, noticeId: string): Promise<ApplicationNoticeInfo> => {
  try {
    const response = await instance.post<ApplicationNoticeInfo>(`/shops/${shopId}/notices/${noticeId}/applications`);
    return response.data;
  } catch (err) {
    return handleApiError(err);
  }
};

// PUT - 가게의 특정 공고 지원 승인, 거절, 취소
export const putNoticeApplications = async (
  shopId: string,
  noticeId: string,
  applicationId: string,
  body: ApplicationRequest,
): Promise<ApplicationNoticeInfo> => {
  try {
    const response = await instance.put<ApplicationNoticeInfo>(
      `/shops/${shopId}/notices/${noticeId}/applications/${applicationId}`,
      body,
    );
    return response.data;
  } catch (err) {
    return handleApiError(err);
  }
};

// GET - 유저의 지원 목록 조회
export const getUserApplications = async (
  userId: string,
  query?: { offset?: number; limit?: number },
): Promise<ApplicationUserResponse> => {
  try {
    const newQuery = new URLSearchParams({
      offset: String(query?.offset ?? ""),
      limit: String(query?.limit ?? ""),
    });

    const response = await instance.get(`/users/${userId}/applications?${newQuery}`);
    return response.data;
  } catch (err) {
    return handleApiError(err);
  }
};
