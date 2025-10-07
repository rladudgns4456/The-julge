import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import NotificationButton from "./notification/NotificationButton";

const EmployeeMenu = () => {
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
    <nav className="flex items-center gap-10 tablet:gap-3 mobile:gap-4 text-body-1-bold mobile:text-body-2-bold">
      <Link href="/profile">내 프로필</Link>
      <button onClick={handleLogout}>로그아웃</button>
      <NotificationButton />
    </nav>
  );
};

export default EmployeeMenu;
