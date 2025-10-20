"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PostsHeader from "@/components/jobs/PostsHeader";
import PostsGrid from "@/components/jobs/PostsGrid";
import { useJobPosts } from "@/hooks/useJobPosts";

const ITEMS_PER_PAGE = 9;

const SearchClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";

  // useJobPosts 훅 사용 (keyword 전달)
  const {
    sortOption,
    currentPage,
    isFilterOpen,
    appliedFilters,
    posts: pageItems,
    totalItems,
    loading,
    error,
    handleSortChange,
    handleFilterClick,
    handleFilterClose,
    handleFilterApply,
    handleFilterReset,
    handlePostClick,
    handlePageChange,
    fetchPosts,
  } = useJobPosts({
    keyword,
    isSearchPage: true,
  });

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-5">
      <div className="max-w-[994px] mx-auto px-4 py-8">
        <PostsHeader
          sortOption={sortOption}
          isFilterOpen={isFilterOpen}
          onSortChange={handleSortChange}
          onFilterClick={handleFilterClick}
          onFilterClose={handleFilterClose}
          onFilterApply={handleFilterApply}
          onFilterReset={handleFilterReset}
          appliedFilters={appliedFilters}
          title={
            <>
              <span className="text-primary-20 font-bold">"{keyword}"</span> 검색 결과
            </>
          }
          resultCount={totalItems}
        />

        <PostsGrid
          posts={pageItems}
          loading={loading}
          error={error}
          currentPage={currentPage}
          totalPages={totalPages}
          onPostClick={handlePostClick}
          onPageChange={handlePageChange}
          onRetry={() => fetchPosts(currentPage, appliedFilters, sortOption)}
        />
      </div>
    </div>
  );
};

export default SearchClient;
