import Link from "next/link";
import Logout from "@/components/common/gnb/Logout";

const EmployeeMenuSimple = () => {
  return (
    <nav className="flex items-center gap-10 tablet:gap-3 mobile:gap-4 text-body-1-bold mobile:text-body-2-bold">
      <Link href="/profile">내 프로필</Link>
      <Logout />
    </nav>
  );
};

export default EmployeeMenuSimple;