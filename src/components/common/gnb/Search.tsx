"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Search = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) {
      return;
    }

    // 검색 페이지로 이동
    router.push(`/search?keyword=${encodeURIComponent(trimmedKeyword)}`);
  };

  return (
    <form className="desktop:w-[450px] tablet:w-[344px] relative flex items-center" onSubmit={handleSubmit}>
      <Image className="absolute ml-2.5" src="/search.svg" width={20} height={20} alt="검색 아이콘" />
      <input
        className="desktop:w-[450px] tablet:w-[344px] mobile:w-full h-[40px] mobile:h-[36px] bg-gray-10 py-2.5 pl-10 rounded-[10px] placeholder:text-body-1-regular text-body-1-regular mobile:placeholder:text-caption mobile:text-caption placeholder:text-gray-40 focus:outline-none focus:ring-2 focus:ring-primary-20"
        name="keyword"
        type="text"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="가게 이름으로 찾아보세요"
      />
    </form>
  );
};

export default Search;
