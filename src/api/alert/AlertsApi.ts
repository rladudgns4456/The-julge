import { AxiosError } from "axios";
import instance from "../axios";
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
    const axiosError = error as AxiosError<ErrorMessage>; //  에러 타입 명시

    if (axiosError.response) {
      throw new Error(axiosError.response.data.message);
    } else {
      throw new Error("서버에 연결할 수 없습니다. 인터넷 연결을 확인해주세요.");
    }
  }
};

// 알림 읽음 처리
export const putAlerts = async (userId: string, alertId: string): Promise<NotificationReadResponse> => {
  try {
    const response = await instance.put(`/users/${userId}/alerts/${alertId}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorMessage>; //  에러 타입 명시

    if (axiosError.response) {
      throw new Error(axiosError.response.data.message);
    } else {
      throw new Error("서버에 연결할 수 없습니다. 인터넷 연결을 확인해주세요.");
    }
  }
};
