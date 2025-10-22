import Link from "next/link";
import Button from "@/components/common/button";

export const EmptyShop = () => {
  return (
    <section className="w-full">
      <div className="max-w-[964px] w-full mx-auto">
        <div className="w-full border border-gray-20 rounded-xl">
          <div className="flex flex-col items-center gap-6 py-[60px]">
            <span className="text-body-1-regular mobile:text-body-2-regular">
              내 가게를 소개하고 공고도 등록해 보세요.
            </span>
            <Link href={"/owner/register-shop"} className="max-w-[346px] w-full mobile:max-w-[108px]">
              <Button variant="primary" className="w-full mobile:max-w-[108px]" size="medium">
                가게 등록하기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
