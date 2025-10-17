import axios from "@/api/axios";

export interface SignupRequest {
  email: string;
  password: string;
  type: "employee" | "employer";
}

export interface SignupResponse {
  message: string;
}

export interface SignupError {
  message: string;
}

// 회원가입 API 호출 함수
export const signupUser = async (userData: SignupRequest): Promise<SignupResponse> => {
  try {
    const response = await axios.post<SignupResponse>("/users", userData);
    return response.data;
  } catch (error: unknown) {
    // 에러 타입 가드 및 처리
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as { response: { status: number; data?: { message?: string } } };
      const errorMessage = axiosError.response.data?.message || "회원가입에 실패했습니다.";
      throw new Error(`${axiosError.response.status}:${errorMessage}`);
    }
    // 네트워크 에러 등 기타 에러
    throw new Error("네트워크 오류가 발생했습니다.");
  }
};
