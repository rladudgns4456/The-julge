//테스트 환경에서만 사용하고 배포 전 삭제 및 연계된 내용 정리하기

"use client";

import { User } from "@/types/user";

// 디버깅 로그 타입 정의
export interface AuthDebugInfo {
  currentUser: User | null;
  token: string | null;
  savedUser: string | null;
  listenersCount: number;
  timestamp: string;
}

// AuthLoginApi 디버깅 콘솔 관리 클래스
export class LoginApiConsoleTest {
  // 🔥 인증 상태 디버깅 로그
  static logAuthStatus(currentUser: User | null, listenersCount: number): void {
    const token = localStorage.getItem("accessToken");
    const savedUser = localStorage.getItem("user");

    console.log("🔐 AuthLoginApi 상태:", {
      "현재 사용자": currentUser ? `${currentUser.email} (${currentUser.type})` : "없음",
      "토큰 존재": token ? "✅ 있음" : "❌ 없음",
      "토큰 길이": token ? `${token.length}자` : "0자",
      "사용자 정보": savedUser ? "✅ 있음" : "❌ 없음",
      "API 주소": "https://bootcamp-api.codeit.kr/api/18-1/the-julge",
      "리스너 수": listenersCount,
    });

    if (token && savedUser) {
      console.log("✅ 실제 API 로그인 상태 - 새로고침해도 유지됩니다!");
    } else {
      console.log("❌ 로그인되지 않은 상태");
    }
  }

  // 🚀 로그인 시작 로그
  static logLoginStart(email: string): void {
    console.log("🚀 실제 API 로그인 시작:", {
      email,
      "API 주소": "https://bootcamp-api.codeit.kr/api/18-1/the-julge/token",
      "요청 시간": new Date().toLocaleTimeString(),
    });
  }

  // 🎉 로그인 성공 로그
  static logLoginSuccess(user: User, token: string): void {
    console.log("🎉 실제 API 로그인 성공!", {
      사용자: `${user.email} (${user.type})`,
      "토큰 길이": `${token.length}자`,
      "저장 완료": "✅ localStorage에 저장됨",
      "전역 상태": "✅ 업데이트됨",
    });
  }

  // ❌ 로그인 실패 로그
  static logLoginFailure(email: string, message: string): void {
    console.log("❌ 실제 API 로그인 실패:", {
      이메일: email,
      "실패 이유": message,
      "API 주소": "https://bootcamp-api.codeit.kr/api/18-1/the-julge/token",
    });
  }

  // 💥 로그인 에러 로그
  static logLoginError(email: string, error: any): void {
    console.error("💥 실제 API 로그인 에러:", {
      이메일: email,
      에러: error,
      "API 주소": "https://bootcamp-api.codeit.kr/api/18-1/the-julge/token",
      시간: new Date().toLocaleTimeString(),
    });
  }

  // 🔄 사용자 정보 복원 시도 로그
  static logRestoreAttempt(): void {
    console.log("🔄 사용자 정보 복원 시도...");
  }

  // ✅ 사용자 정보 복원 성공 로그
  static logRestoreSuccess(user: User, token: string): void {
    console.log("✅ 저장된 사용자 정보 복원 성공:", {
      사용자: `${user.email} (${user.type})`,
      "토큰 길이": `${token.length}자`,
      "복원 시간": new Date().toLocaleTimeString(),
    });
  }

  // 💥 사용자 정보 파싱 에러 로그
  static logParseError(error: any): void {
    console.error("💥 저장된 유저 정보 파싱 에러:", error);
    console.log("🧹 잘못된 데이터 정리 중...");
  }

  // ❌ 저장된 사용자 정보 없음 로그
  static logNoStoredUser(): void {
    console.log("❌ 저장된 사용자 정보 없음 - 로그인 필요");
  }

  // 🚪 로그아웃 실행 로그
  static logLogoutStart(): void {
    console.log("🚪 실제 API 로그아웃 실행:", {
      "로그아웃 시간": new Date().toLocaleTimeString(),
      "정리 항목": ["accessToken", "user", "mockUserType"],
    });
  }

  // ✅ 로그아웃 완료 로그
  static logLogoutComplete(): void {
    console.log("✅ 로그아웃 완료 - 모든 데이터 정리됨");
  }

  // 🔧 디버깅 정보 수집 (개발자 도구용)
  static getDebugInfo(): AuthDebugInfo {
    const token = localStorage.getItem("accessToken");
    const savedUser = localStorage.getItem("user");

    return {
      currentUser: savedUser ? JSON.parse(savedUser) : null,
      token,
      savedUser,
      listenersCount: 0, // 이 값은 AuthLoginApi에서 설정
      timestamp: new Date().toISOString(),
    };
  }

  // 🎯 디버깅 정보 출력 (개발자 도구용)
  static printDebugInfo(): void {
    const info = this.getDebugInfo();
    console.table(info);
  }
}
