import { AxiosError } from "axios";

interface ErrorMessage {
  message: string;
}

export const handleApiError = (error: unknown): never => {
  const axiosError = error as AxiosError<ErrorMessage>;

  if (axiosError.response?.data?.message) {
    throw new Error(axiosError.response.data.message);
  }

  if (axiosError.message) {
    throw new Error(axiosError.message);
  }

  throw new Error("서버를 연결할 수 없습니다. 인터넷 연결을 확인해주세요.");
};
