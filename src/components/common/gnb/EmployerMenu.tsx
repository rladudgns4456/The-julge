import Link from "next/link";
import Logout from "./Logout";

const EmployerMenu = () => {
  return (
    <nav className="flex items-center gap-10 mobile:gap-4 text-body-1-bold mobile:text-body-2-bold">
      <Link href="/shop">내 가게</Link>
      <Logout />
    </nav>
  );
};

export default EmployerMenu;
