import { Suspense } from "react";
import SearchClient from "./SearchClient";

export default function SearchPage() {
  return (
    <Suspense fallback={<p>검색 페이지를 불러오는 중...</p>}>
      <SearchClient />
    </Suspense>
  );
}
