import { useRouter } from "next/navigation";
import Button from "../common/button";

export const EmptyNotice = () => {
  const router = useRouter();

  const handleRegisterNotice = () => {
    router.push("owner/register-notice");
  };

  return (
    <section className="w-full h-full pt-[60] pb-[120px] bg-gray-5">
      <div className="max-w-[964px] w-full mx-auto">
        <div className="mb-6">
          <h2 className="text-h1">등록한 공고</h2>
        </div>
        <div className="w-full border border-gray-20 rounded-xl">
          <div className="flex flex-col items-center gap-6 py-[60px]">
            <span className="text-body-1-regular">공고를 등록해 보세요.</span>
            <Button variant="primary" className="max-w-[346px] w-full" size="large" onClick={handleRegisterNotice}>
              공고 등록하기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
