"use client";

import { User, LoginResponse } from "@/types/user";
import { loginUser } from "@/api/login/LoginApi";
import { LoginApiConsoleTest } from "@/utils/debug/LoginApiConsoleTest";

// 상태 변경 리스너 타입
type AuthStateListener = (user: User | null) => void;

// 실제 로그인 API 관리
export class AuthLoginApi {
  // 전역 상태 관리
  private static listeners: AuthStateListener[] = [];
  private static currentUser: User | null = null;

  // 상태 변경 리스너 등록/해제
  static subscribe(listener: AuthStateListener): () => void {
    this.listeners.push(listener);

    // 현재 사용자 정보가 있다면 즉시 알림
    if (this.currentUser) {
      listener(this.currentUser);
    }

    // 구독 해제 함수 반환
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // 상태 변경 알림
  private static notifyListeners(user: User | null): void {
    this.currentUser = user;
    this.listeners.forEach(listener => listener(user));

    // 디버깅용 콘솔 로그
    LoginApiConsoleTest.logAuthStatus(this.currentUser, this.listeners.length);
  }

  // 현재 사용자 정보 가져오기
  static getCurrentUser(): User | null {
    return this.currentUser;
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
      // 디버깅용 콘솔 로그
      LoginApiConsoleTest.logLoginStart(email);

      // LoginApi.ts 사용
      const result = await loginUser({ email, password });

      if (result.success && result.data) {
        // 성공시 토큰, 유저 정보 저장
        const { token, user: userData } = result.data.item;

        // localStorage에 저장
        localStorage.setItem("accessToken", token);
        localStorage.setItem("user", JSON.stringify(userData.item));

        // 디버깅용 콘솔 로그
        LoginApiConsoleTest.logLoginSuccess(userData.item, token);

        // 전역 상태 업데이트 및 알림
        this.notifyListeners(userData.item);

        return {
          success: true,
          message: result.message,
          user: userData.item,
        };
      } else {
        // 디버깅용 콘솔 로그
        LoginApiConsoleTest.logLoginFailure(email, result.message);

        return {
          success: false,
          message: result.message,
        };
      }
    } catch (error) {
      // 디버깅용 콘솔 로그
      LoginApiConsoleTest.logLoginError(email, error);

      return {
        success: false,
        message: "네트워크 오류가 발생했습니다.",
      };
    }
  }

  // 저장된 토큰으로 사용자 정보 복원
  static restoreUserFromStorage(): User | null {
    // 디버깅용 콘솔 로그
    LoginApiConsoleTest.logRestoreAttempt();

    const token = localStorage.getItem("accessToken");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      try {
        const user = JSON.parse(savedUser);
        // 디버깅용 콘솔 로그
        LoginApiConsoleTest.logRestoreSuccess(user, token);

        // 전역 상태 업데이트
        this.notifyListeners(user);
        return user;
      } catch (error) {
        // 디버깅용 콘솔 로그
        LoginApiConsoleTest.logParseError(error);

        // 잘못된 데이터 정리
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        this.notifyListeners(null);
        return null;
      }
    }

    // 디버깅용 콘솔 로그
    LoginApiConsoleTest.logNoStoredUser();
    // 저장된 정보가 없으면 null로 상태 업데이트
    this.notifyListeners(null);
    return null;
  }

  // 로그아웃 처리
  static executeLogout(): void {
    // 디버깅용 콘솔 로그
    LoginApiConsoleTest.logLogoutStart();

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("mockUserType"); //목데이터 관련된 것도 일단 로그아웃하면 데이터 초기화

    // 디버깅용 콘솔 로그
    LoginApiConsoleTest.logLogoutComplete();

    // 전역 상태 업데이트 및 알림
    this.notifyListeners(null);
  }
}
