import axios from "../axios";

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
  } catch (error: any) {
    // 에러 응답이 있는 경우
    if (error.response) {
      const errorMessage = error.response.data?.message || "회원가입에 실패했습니다.";
      throw new Error(`${error.response.status}:${errorMessage}`);
    }
    // 네트워크 에러 등 기타 에러
    throw new Error("네트워크 오류가 발생했습니다.");
  }
};
