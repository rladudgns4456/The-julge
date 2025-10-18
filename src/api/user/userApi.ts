import instance from "@/api/axios";
import { handleApiError } from "@/api/error/ErrorHandler";
import { UserDetailResponse } from "@/types/user";

export const getUser = async (userId: string): Promise<UserDetailResponse> => {
  try {
    const response = await instance.get<UserDetailResponse>(`/users/${userId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
