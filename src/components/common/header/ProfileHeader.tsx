import Link from "next/link";
import Image from "next/image";
import Search from "@/components/common/gnb/Search";
import EmployeeMenuSimple from "@/components/common/gnb/EmployeeMenuSimple";

export default function ProfileHeader() {
  return (
    <header className="w-full h-[4.375rem] mobile:h-[102px] bg-white mobile:flex mobile:flex-col  tablet:px-8 mobile:px-5">
      <div className="max-w-5xl mx-auto mobile:mx-0 h-full flex gap-10 tablet:gap-8 items-center mobile:justify-between">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="더 줄게 로고"
            width={112}
            height={40}
            className="w-[84px] tablet:w-[112px] desktop:w-[112px] h-auto"
            style={{
              height: "auto",
              width: "100%",
            }}
            priority
          />
        </Link>
        {/* 데스크탑, 태블릿 검색창 */}
        <div className="mobile:hidden tablet:block flex-1">
          <Search />
        </div>
        {/* 프로필 등록 전용 간소 GNB */}
        <EmployeeMenuSimple />
      </div>
      {/* 모바일 검색창 */}
      <div className="mb-2.5 mobile:block tablet:hidden desktop:hidden flex-1">
        <Search />
      </div>
    </header>
  );
}