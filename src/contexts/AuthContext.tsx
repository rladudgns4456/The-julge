"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { User, UserType } from "@/types/user";
import { mockEmployeeUser, mockEmployerUser } from "@/lib/MockUsers";
import { AuthLoginApi } from "./AuthLoginApi";

interface AuthContextType {
  user: User | null; // 현재 로그인한 유저 정보
  userType: UserType; // 유저 타입 (employee | employer | null)
  isLoading: boolean; // 로그인 상태 로딩
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>; // 실제 로그인
  logout: () => void; // 로그아웃
  loginAsMockEmployee: () => void; // Mock 알바 유저
  loginAsMockEmployer: () => void; // Mock 사장 유저
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 컴포넌트 마운트 시 저장된 토큰 확인
  useEffect(() => {
    const restoredUser = AuthLoginApi.restoreUserFromStorage();
    if (restoredUser) {
      setUser(restoredUser);
    }
  }, []);

  // 실제 로그인 함수
  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const result = await AuthLoginApi.executeLogin(email, password);

      if (result.success && result.user) {
        setUser(result.user);
      }

      return {
        success: result.success,
        message: result.message,
      };
    } finally {
      setIsLoading(false);
    }
  };

  // 로그아웃
  const logout = () => {
    AuthLoginApi.executeLogout();
    setUser(null);
  };

  // Mock 로그인
  const loginAsMockEmployee = () => {
    setUser(mockEmployeeUser);
    localStorage.setItem("mockUserType", "employee");
  };

  const loginAsMockEmployer = () => {
    setUser(mockEmployerUser);
    localStorage.setItem("mockUserType", "employer");
  };

  // 유저 타입 계산 (employee | employer | null)
  const userType: UserType = user?.type || null;

  return (
    <AuthContext.Provider
      value={{
        user,
        userType,
        isLoading,
        login,
        logout,
        loginAsMockEmployee,
        loginAsMockEmployer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.");
  }

  return context;
}
