import { useEffect, useState } from "react";
import { AuthLoginApi } from "@/contexts/AuthLoginApi";
import { User } from "@/types/user";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(AuthLoginApi.getCurrentUser());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restoredUser = AuthLoginApi.restoreUserFromStorage();
    setUser(restoredUser);
    setIsLoading(false);

    const unsubscribe = AuthLoginApi.subscribe(updatedUser => {
      setUser(updatedUser);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    return await AuthLoginApi.executeLogin(email, password);
  };

  const logout = async () => {
    AuthLoginApi.executeLogout();
  };

  return {
    user,
    login,
    logout,
    isLoading,
  };
};
