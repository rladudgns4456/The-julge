import Link from "next/link";
import Image from "next/image";

const EmployeeMenu = () => {
  return (
    <nav className="flex items-center gap-10 text-body-1-bold">
      <Link href="/profile">내 프로필</Link>
      <Link href="/">로그아웃</Link>
      <button>
        <Image src="/inactive.svg" width={24} height={24} alt="알림 아이콘" />
      </button>
    </nav>
  );
};

export default EmployeeMenu;
