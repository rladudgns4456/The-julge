import instance from "../axios";
import { handleApiError } from "../error/ErrorHandler";
import { NotificationListResponse, NotificationReadResponse } from "@/types/notification";

interface ErrorMessage {
  message: string;
}

// 유저 알림 목록 조회
export const getAlerts = async (
  userId: string,
  offset: number = 0,
  limit: number = 10,
): Promise<NotificationListResponse> => {
  try {
    const response = await instance.get<NotificationListResponse>(`/users/${userId}/alerts`, {
      params: { offset, limit },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// 알림 읽음 처리
export const putAlerts = async (userId: string, alertId: string): Promise<NotificationReadResponse> => {
  try {
    const response = await instance.put(`/users/${userId}/alerts/${alertId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
