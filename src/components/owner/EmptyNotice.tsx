import Link from "next/link";
import Button from "@/components/common/button";

export const EmptyNotice = () => {
  return (
    <div className="max-w-[964px] w-full mx-auto">
      <div className="w-full border border-gray-20 rounded-xl">
        <div className="flex flex-col items-center gap-6 py-[60px]">
          <span className="text-body-1-regular">공고를 등록해 보세요.</span>
          <Link href={"owner/register-notice"} className="max-w-[346px] w-full">
            <Button variant="primary" className="w-full" size="large">
              공고 등록하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
