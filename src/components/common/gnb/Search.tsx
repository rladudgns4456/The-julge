import Image from "next/image";

const Search = () => {
  return (
    <form className="desktop:w-[450px] tablet:w-[344px] relative flex items-center">
      <Image className="absolute ml-2.5 mobile:" src="/search.svg" width={20} height={20} alt="검색 아이콘" />
      <input
        className="desktop:w-[450px] tablet:w-[344px] mobile:w-full h-[40px] mobile:h-[36px] bg-gray-10 py-2.5 pl-10 rounded-[10px] placeholder:text-body-1-regular text-body-1-regular mobile:placeholder:text-caption mobile:text-caption placeholder:text-gray-40"
        name="keyword"
        type="text"
        placeholder="가게 이름으로 찾아보세요"
      />
    </form>
  );
};

export default Search;
