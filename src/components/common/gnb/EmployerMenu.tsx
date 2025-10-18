import Link from "next/link";
import Logout from "@/components/common/gnb/Logout";

const EmployerMenu = () => {
  return (
    <nav className="flex items-center gap-10 mobile:gap-4 text-body-1-bold mobile:text-body-2-bold">
      <Link href="/owner">내 가게</Link>
      <Logout />
    </nav>
  );
};

export default EmployerMenu;
