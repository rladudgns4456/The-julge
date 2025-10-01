import Link from "next/link";
import Image from "next/image";
import Search from "@/components/common/header/Search";
import GuestMenu from "./GuestMenu";

export default function Header() {
  return (
    <header className="w-full h-[4.375rem] bg-white">
      <div className="max-w-5xl mx-auto h-full flex gap-10 items-center">
        <Link href="/login">
          <Image src="/logo.svg" width={112} height={40} alt="더 줄게 로고" />
        </Link>
        <Search />
        <GuestMenu />
      </div>
    </header>
  );
}
