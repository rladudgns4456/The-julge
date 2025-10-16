import { useRouter } from "next/navigation";
import Button from "../common/button";

export const EmptyShop = () => {
  const router = useRouter();

  const handleRegisterShop = () => {
    router.push("/owner/register-shop");
  };

  return (
    <section className="w-full h-full">
      <div className="max-w-[964px] w-full mx-auto">
        <div className="w-full border border-gray-20 rounded-xl">
          <div className="flex flex-col items-center gap-6 py-[60px]">
            <span className="text-body-1-regular">내 가게를 소개하고 공고도 등록해 보세요.</span>
            <Button variant="primary" className="max-w-[346px] w-full" size="large" onClick={handleRegisterShop}>
              가게 등록하기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
