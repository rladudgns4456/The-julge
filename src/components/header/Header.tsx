import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo.svg";
import Search from "@/components/header/Search";
import GuestMenu from "./GuestMenu";

export default function Header() {
  return (
    <header className="w-full h-[4.375rem] bg-white">
      <div className="max-w-5xl mx-auto h-full flex gap-10 items-center">
        <Link href="/login">
          <Image src={Logo} width={112} height={40} alt="더 줄게 로고" />
        </Link>
        <Search />
        <GuestMenu />
      </div>
    </header>
  );
}
