import Button from "@/components/common/button";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-[60.25rem] mx-auto px-5 tablet:px-8 mt-[116px] mb-[118px]">
          {/* 타이틀 */}
          <h1 className="text-h2 text-black mb-[40px] text-left">내 프로필</h1>

          {/* 안내 박스 */}
          <section
            className="
              w-[964px]
              border border-gray-20 rounded-[12px]
              py-[60px] px-[24px]
              flex flex-col items-center justify-center gap-[24px]
              mx-auto
            "
          >
            <p className="text-body-1-regular text-black text-center w-[916px]">
              내 프로필을 등록하고 원하는 가게에 지원해 보세요.
            </p>

            <Link href="/profile/register" className="inline-block">
              <Button variant="primary" size="large" className="w-[346px] h-[47px] rounded-[6px]">
                내 프로필 등록하기
              </Button>
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}
