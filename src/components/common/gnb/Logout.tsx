import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const Logout = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return <button onClick={handleLogout}>로그아웃</button>;
};

export default Logout;
