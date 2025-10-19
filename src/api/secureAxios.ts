import axios, { AxiosInstance } from "axios";

/**
 * ✅ 인증이 필요한 요청 전용 Axios 인스턴스
 * 기존 axios.ts는 /users 요청을 인증 제외시켰기 때문에
 * 이 파일에서는 모든 요청에 accessToken을 포함합니다.
 */

const secureAxios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://bootcamp-api.codeit.kr/api/18-1/the-julge",
  headers: { "Content-Type": "application/json" },
});

secureAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default secureAxios;
