import Link from "next/link";
import NotificationButton from "./notification/NotificationButton";

const EmployeeMenu = () => {
  return (
    <nav className="flex items-center gap-10 text-body-1-bold">
      <Link href="/profile">내 프로필</Link>
      <Link href="/">로그아웃</Link>
      <NotificationButton />
    </nav>
  );
};

export default EmployeeMenu;
