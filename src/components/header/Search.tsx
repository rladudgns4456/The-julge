import Image from "next/image";
import SearchIc from "@/assets/search.svg";

const Search = () => {
  return (
    <div className="grow">
      <form className="relative flex items-center">
        <Image className="absolute ml-2.5" src={SearchIc} width={20} height={20} alt="검색 아이콘" />
        <input
          className="w-[450px] bg-gray-10 py-2.5 pl-10 rounded-[10px] placeholder:text-body-1-regular placeholder:text-gray-40"
          name="keyword"
          type="text"
          placeholder="가게 이름으로 찾아보세요"
        />
      </form>
    </div>
  );
};

export default Search;
