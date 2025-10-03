"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function DevTool() {
  const searchParams = useSearchParams();
  const { loginAsMockEmployee, loginAsMockEmployer, logout } = useAuth();

  useEffect(() => {
    const devMode = searchParams.get("dev");

    if (devMode) {
      switch (devMode) {
        case "employee":
          loginAsMockEmployee();
          console.log("알바 GNB");
          break;
        case "employer":
          loginAsMockEmployer();
          console.log("사장 GNB");
          break;
        case "logout":
          logout();
          console.log("로그아웃");
          break;
      }

      const url = new URL(window.location.href);
      url.searchParams.delete("dev");
      window.history.replaceState({}, "", url.toString());
    }
  }, [searchParams, loginAsMockEmployee, loginAsMockEmployer, logout]);

  return null;
}
