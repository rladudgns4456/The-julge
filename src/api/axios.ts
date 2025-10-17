import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

/*
 * Axios 인스턴스 생성
 * 환경변수 NEXT_PUBLIC_API_URL을 사용하여 유연한 API URL 관리
 *
 * 사용법:
 * - 개발환경 (목데이터): NEXT_PUBLIC_API_URL=http://localhost:3001/api
 * - 프로덕션환경 (실제API): NEXT_PUBLIC_API_URL=https://bootcamp-api.codeit.kr/api/0-1/the-julge
 */
const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://bootcamp-api.codeit.kr/api/0-1/the-julge",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * 요청 인터셉터: 토큰 자동 추가
 * 모든 API 요청에 accessToken을 자동으로 Authorization 헤더에 추가
 */
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
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
      localStorage.removeItem("accessToken");
      // 필요시 로그인 페이지로 리다이렉트
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default instance;
