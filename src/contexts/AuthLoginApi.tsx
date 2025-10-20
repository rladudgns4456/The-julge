"use client";

import { User, LoginResponse } from "@/types/user";
import { loginUser } from "@/api/login/LoginApi";
import { AuthLoginModal } from "@/contexts/AuthLoginModal";

// 상태 변경 리스너 타입
type AuthStateListener = (user: User | null) => void;

export class AuthLoginApi {
  private static listeners: AuthStateListener[] = [];
  private static currentUser: User | null = null;
  private static readonly TOKEN_EXPIRY_MINUTES = 5; // 분 단위로 토큰 유효시간 설정가능

  // 상태 변경 리스너 등록/해제
  static subscribe(listener: AuthStateListener): () => void {
    this.listeners.push(listener);

    if (this.currentUser) {
      listener(this.currentUser);
    }
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // 상태 변경 알림
  private static notifyListeners(user: User | null): void {
    this.currentUser = user;
    this.listeners.forEach(listener => listener(user));
  }

  // 현재 사용자 정보 가져오기
  static getCurrentUser(): User | null {
    return this.currentUser;
  }

  // 토큰 유효검사
  static isTokenValid(): boolean {
    const token = localStorage.getItem("accessToken");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    if (!token || !tokenExpiration) {
      return false;
    }
    const now = Date.now();
    const expirationTime = parseInt(tokenExpiration);

    // 만료 시간 이후 토큰 무효
    if (now > expirationTime) {
      this.executeLogout();
      AuthLoginModal.showTokenExpiredModal();
      return false;
    }
    return true;
  }

  static async executeLogin(
    email: string,
    password: string,
  ): Promise<{
    success: boolean;
    message: string;
    user?: User;
  }> {
    try {
      const result = await loginUser({ email, password });

      if (result.success && result.data) {
        // 로그인시 토큰, 유저 정보 저장
        const { token, user: userData } = result.data.item;
        const expirationTime = Date.now() + this.TOKEN_EXPIRY_MINUTES * 60 * 1000;

        localStorage.setItem("accessToken", token);
        localStorage.setItem("tokenExpiration", expirationTime.toString());
        localStorage.setItem("userId", userData.item.id); //내 프로필 수정시 사용할 것
        localStorage.setItem("user", JSON.stringify(userData.item));
        this.notifyListeners(userData.item);

        return {
          success: true,
          message: result.message,
          user: userData.item,
        };
      } else {
        return {
          success: false,
          message: result.message,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "네트워크 오류가 발생했습니다.",
      };
    }
  }
  static restoreUserFromStorage(): User | null {
    // 토큰 유효시간 체크
    if (!this.isTokenValid()) {
      this.notifyListeners(null);
      return null;
    }

    const token = localStorage.getItem("accessToken");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      try {
        const user = JSON.parse(savedUser);
        // 전역 상태 업데이트
        this.notifyListeners(user);
        return user;
      } catch (error) {
        this.executeLogout();
        return null;
      }
    }
    // 저장된 정보가 없으면 null
    this.notifyListeners(null);
    return null;
  }
  static executeLogout(): void {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenExpiration"); //토큰 만료시간도 초기화
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    this.notifyListeners(null);

    // 토큰 만료로 인한 로그아웃 체크
    if (this.currentUser) {
      AuthLoginModal.showTokenExpiredModal();
    }
  }
}
