"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PostsHeader from "@/components/jobs/PostsHeader";
import PostsGrid from "@/components/jobs/PostsGrid";
import { getNotices } from "@/api/notice/NoticeApi";
import { PostData } from "@/types/post";
import { parsePostsResponse } from "@/utils/api";
import { isPostClosed } from "@/utils/post";
import { FilterOptions, convertFilterOptionsToApiParams } from "@/types/filter";

const ITEMS_PER_PAGE = 9;

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";
  const [allPosts, setAllPosts] = useState<PostData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("time");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<FilterOptions>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 검색 실행 함수
  const handleSearch = useCallback(async () => {
    if (!keyword.trim()) {
      setAllPosts([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    setCurrentPage(1);

    try {
      const apiParams = convertFilterOptionsToApiParams(appliedFilters);

      const response = await getNotices({
        offset: 0,
        limit: 100,
        keyword,
        address: apiParams.address,
        startsAtGte: apiParams.startsAtGte,
        hourlyPayGte: apiParams.hourlyPayGte,
        sort: sortOption as "time" | "pay" | "hour" | "shop",
      });

      // API 응답 파싱
      const parsedPosts = parsePostsResponse(response.items || response);

      const { activePosts, closedPosts } = parsedPosts.reduce(
        (acc, post) => {
          if (isPostClosed(post)) {
            acc.closedPosts.push(post);
          } else {
            acc.activePosts.push(post);
          }
          return acc;
        },
        { activePosts: [] as PostData[], closedPosts: [] as PostData[] },
      );

      setAllPosts([...activePosts, ...closedPosts]);
    } catch (err) {
      console.error("검색 실패:", err);
      setError("검색 결과를 불러오지 못했습니다.");
      setAllPosts([]);
    } finally {
      setLoading(false);
    }
  }, [keyword, appliedFilters, sortOption]);

  useEffect(() => {
    handleSearch();
  }, [keyword, handleSearch]);

  const totalPages = Math.ceil(allPosts.length / ITEMS_PER_PAGE);
  const pageItems = allPosts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleSortChange = (value: string) => {
    setSortOption(value);
    setCurrentPage(1);
  };

  const handleFilterApply = (filters: FilterOptions) => {
    setAppliedFilters(filters);
    setCurrentPage(1);
  };

  const handleFilterReset = () => {
    setAppliedFilters({});
    setCurrentPage(1);
  };

  const handlePostClick = (post: PostData) => {
    router.push(`/jobs/${post.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-5">
      <div className="max-w-[994px] mx-auto px-4 py-8">
        <PostsHeader
          sortOption={sortOption}
          isFilterOpen={isFilterOpen}
          onSortChange={handleSortChange}
          onFilterClick={() => setIsFilterOpen(true)}
          onFilterClose={() => setIsFilterOpen(false)}
          onFilterApply={handleFilterApply}
          onFilterReset={handleFilterReset}
          appliedFilters={appliedFilters}
          title={
            <>
              <span className="text-primary-10 font-bold">"{keyword}"</span> 검색 결과
            </>
          }
          subtitle=""
          resultCount={allPosts.length}
        />

        <PostsGrid
          posts={pageItems}
          loading={loading}
          error={error}
          currentPage={currentPage}
          totalPages={totalPages}
          onPostClick={handlePostClick}
          onPageChange={setCurrentPage}
          onRetry={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchPage;
