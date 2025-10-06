import Link from "next/link";

const EmployerMenu = () => {
  return (
    <nav className="flex items-center gap-10 text-body-1-bold">
      <Link href="/shop">내 가게</Link>
      <Link href="/">로그아웃</Link>
    </nav>
  );
};

export default EmployerMenu;
