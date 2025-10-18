"use client";

import { useAuth } from "@/hooks/useAuth";
import GuestMenu from "@/components/common/gnb/GuestMenu";
import EmployeeMenu from "@/components/common/gnb/EmployeeMenu";
import EmployerMenu from "@/components/common/gnb/EmployerMenu";

export default function CommonGnb() {
  const { user } = useAuth();

  // 게스트 (비로그인)
  if (!user) {
    return <GuestMenu />;
  }

  // 알바 유저
  if (user.type === "employee") {
    return <EmployeeMenu />;
  }

  // 사장 유저
  if (user.type === "employer") {
    return <EmployerMenu />;
  }
  return null;
}
