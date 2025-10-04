// TODO: 로그인 페이지 완성 후 실제 API 연동 추가 필요

"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { User, UserType } from "@/types/user";
import { mockEmployeeUser, mockEmployerUser } from "@/lib/MockUsers";

interface AuthContextType {
  user: User | null; // 현재 로그인한 유저 정보
  userType: UserType; // 유저 타입 (employee | employer | null)
  logout: () => void; // 로그아웃
  loginAsMockEmployee: () => void; // Mock 알바 유저
  loginAsMockEmployer: () => void; // Mock 사장 유저
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // 로그아웃

  const logout = () => {
    localStorage.removeItem("mockUserType");
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
