import { useAuth } from "@/contexts/AuthContext";

const Logout = () => {
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

  return <button onClick={handleLogout}>로그아웃</button>;
};

export default Logout;
