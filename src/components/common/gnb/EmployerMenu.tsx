import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

const EmployerMenu = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
      alert("로그아웃에 실패했습니다.");
    }
  };
  return (
    <nav className="flex items-center gap-10 mobile:gap-4 text-body-1-bold mobile:text-body-2-bold">
      <Link href="/shop">내 가게</Link>
      <button onClick={handleLogout}>로그아웃</button>
    </nav>
  );
};

export default EmployerMenu;
