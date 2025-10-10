import Link from "next/link";

const GuestMenu = () => {
  return (
    <nav className="flex items-center gap-10 mobile:gap-4 text-body-1-bold mobile:text-body-2-bold">
      <Link href="/login">로그인</Link>
      <Link href="/signup">회원가입</Link>
    </nav>
  );
};

export default GuestMenu;
