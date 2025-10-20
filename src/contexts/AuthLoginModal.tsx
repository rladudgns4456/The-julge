"use client";

import { createContext, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";

// 라우터 인스턴스 전역관리
const RouterContext = createContext<ReturnType<typeof useRouter> | null>(null);

// Router Provider 컴포넌트
export const RouterProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  return <RouterContext.Provider value={router}>{children}</RouterContext.Provider>;
};

export const useGlobalRouter = () => {
  const router = useContext(RouterContext);
  if (!router) {
    throw new Error("useGlobalRouter must be used within RouterProvider");
  }
  return router;
};

export const handleTokenExpiry = (): void => {
  try {
    const router = useGlobalRouter();
    router.push("/login?reason=token-expired");
  } catch (error) {
    // router가 없으면 window.location 사용
    console.warn("Router not available, falling back to window.location");
    window.location.href = "/login?reason=token-expired";
  }
};

export class AuthLoginModal {
  static showTokenExpiredModal(): void {
    handleTokenExpiry();
  }

  static removeModal(): void {}
}
