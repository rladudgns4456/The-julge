import Link from "next/link";
import Image from "next/image";

const UsersMenu = () => {
  return (
    <nav className="flex items-center gap-10 text-body-1-bold">
      <Link href="/login">로그인</Link>
      <Link href="/signup">회원가입</Link>
      <button className="">
        <Image src="/inactive.svg" width={24} height={24} alt="알림 아이콘" />
      </button>
    </nav>
  );
};

export default UsersMenu;
