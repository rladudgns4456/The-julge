import axios from "../axios";
import { LoginResponse } from "@/types/user";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginApiResponse {
  success: boolean;
  message: string;
  data?: LoginResponse;
}

// 로그인 API 호출 함수
export const loginUser = async (loginData: LoginRequest): Promise<LoginApiResponse> => {
  try {
    const response = await axios.post<LoginResponse>("/token", loginData);

    return {
      success: true,
      message: "로그인에 성공했습니다.",
      data: response.data,
    };
  } catch (error: any) {
    // 에러 응답이 있는 경우
    if (error.response) {
      const errorMessage = error.response.data?.message || "로그인에 실패했습니다.";
      return {
        success: false,
        message: `${error.response.status === 401 ? "이메일 또는 비밀번호가 올바르지 않습니다." : errorMessage}`,
      };
    }
    // 네트워크 에러 등 기타 에러
    return {
      success: false,
      message: "네트워크 오류가 발생했습니다.",
    };
  }
};
