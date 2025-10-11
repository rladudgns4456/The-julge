import Image from "next/image";
import Button from "@/components/common/button/index";

export default function jobRegisterpage() {
  return (
    <main className="w-full max-w-[964px] mx-auto my-[3.75rem] px-8 flex flex-col items-center">
      <div className="w-full flex justify-between mb-8">
        <h1 className="text-h1">공고 등록</h1>
        <button>
          <Image src="/close.svg" width={32} height={32} alt="닫기 아이콘" />
        </button>
      </div>
      <form action="submit" className="w-full">
        <div className="w-full grid grid-cols-3 gap-5 text-body-1-regular">
          <div className="flex flex-col">
            <label htmlFor="hourlyPay" className="mb-2">
              시급
            </label>
            <div className="flex items-center gap-2 p-4 border-solid border-gray-30 border rounded-md">
              <input id="hourlyPay" className="flex-1 outline-none" type="text" />
              <span>원</span>
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="startsAt" className="mb-2">
              시작 일시
            </label>
            <div className="flex items-center gap-2 p-4 border-solid border-gray-30 border rounded-md">
              <input id="startsAt" className="flex-1 outline-none" type="text" />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="workhour" className="mb-2">
              업무 시간
            </label>
            <div className="flex items-center gap-2 p-4 border-solid border-gray-30 border rounded-md">
              <input id="workhour" className="flex-1 outline-none" type="text" />
              <span>시간</span>
            </div>
          </div>
          <div className="w-full mt-1 flex flex-col col-span-3">
            <label htmlFor="description" className="mb-2">
              공고 설명
            </label>
            <textarea
              id="description"
              className="w-full h-[153px] p-4 border-solid border-gray-30 border rounded-md outline-none"
            />
          </div>
          <Button variant="primary" className="col-start-2">
            등록하기
          </Button>
        </div>
      </form>
    </main>
  );
}
