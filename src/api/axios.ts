import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { AuthLoginApi } from "@/contexts/AuthLoginApi";

/*
 * Axios 인스턴스 생성
 * 환경변수 NEXT_PUBLIC_API_URL을 사용하여 유연한 API URL 관리
 *
 * 사용법:
 * - 개발환경 (목데이터): NEXT_PUBLIC_API_URL=http://localhost:3000/api
 * - 프로덕션환경 (실제API): NEXT_PUBLIC_API_URL=https://bootcamp-api.codeit.kr/api/18-1/the-julge
 */
const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://bootcamp-api.codeit.kr/api/18-1/the-julge",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * 요청 인터셉터: 토큰 자동 추가 및 만료 검증
 * 모든 API 요청에 accessToken을 자동으로 Authorization 헤더에 추가
 * 토큰이 만료되었으면 자동으로 로그아웃 처리
 * 단, 로그인/회원가입 API는 토큰 검증 제외
 */
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 로그인/회원가입 API는 토큰 검증 제외
    const isAuthEndpoint = config.url?.includes("/token") || config.url?.includes("/users");

    if (!isAuthEndpoint) {
      // 토큰 유효시간 체크
      if (!AuthLoginApi.isTokenValid()) {
        return Promise.reject(new Error("토큰이 만료되었습니다."));
      }
    }

    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

/**
 * 응답 인터셉터: 에러 처리 및 토큰 관리
 * 401 에러 발생 시 자동으로 accessToken 제거하여 로그아웃 처리
 */
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // 토큰 만료 시 자동 로그아웃
      AuthLoginApi.executeLogout();
      // 필요시 로그인 페이지로 리다이렉트
    }
    return Promise.reject(error);
  },
);

export default instance;
