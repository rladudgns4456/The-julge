"use client";

import { useAuth } from "@/contexts/AuthContext";
import GuestMenu from "./GuestMenu";
import EmployeeMenu from "./EmployeeMenu";
import EmployerMenu from "./EmployerMenu";

export default function CommonGnb() {
  const { user, userType } = useAuth();

  // 게스트 (비로그인)
  if (!user) {
    return <GuestMenu />;
  }

  // 알바 유저
  if (userType === "employee") {
    return <EmployeeMenu />;
  }

  // 사장 유저
  if (userType === "employer") {
    return <EmployerMenu />;
  }
  return null;
}
