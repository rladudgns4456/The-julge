"use client";

import { useState, useEffect } from "react";
import { getUser } from "@/api/user/userApi";
import { UserDetailItem } from "@/types/user";

interface UseUserDataReturn {
  userData: UserDetailItem | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useUserData = (userId: string | undefined): UseUserDataReturn => {
  const [userData, setUserData] = useState<UserDetailItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    // userId가 없으면 진행 X
    if (!userId) {
      setUserData(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await getUser(userId);
      // 데이터 저장
      setUserData(response.item);
    } catch (err) {
      const message = err instanceof Error ? err.message : "사용자 정보를 불러오는데 실패했습니다.";
      setError(message);
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  return {
    userData,
    isLoading,
    error,
    refetch: fetchUserData,
  };
};
