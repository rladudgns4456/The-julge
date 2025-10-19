"use client";

import React from "react";
import PostsHeader from "@/components/jobs/PostsHeader";
import RecommendedSection from "@/components/jobs/RecommendedSection";
import PostsGrid from "@/components/jobs/PostsGrid";
import { useJobPosts } from "@/hooks/useJobPosts";

const ITEMS_PER_PAGE = 9;

export default function Page() {
  const {
    sortOption,
    currentPage,
    isFilterOpen,
    appliedFilters,
    posts,
    totalItems,
    loading,
    error,
    recommendedPosts,
    recLoading,
    recError,
    userLoggedIn,
    handleSortChange,
    handleFilterClick,
    handleFilterClose,
    handleFilterApply,
    handleFilterReset,
    handlePostClick,
    handlePageChange,
    handleLoginClick,
    fetchRecommendedPosts,
    fetchPosts,
    profileIncomplete,
  } = useJobPosts();

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-5">
      {/* 맞춤 공고 섹션 */}
      <RecommendedSection
        userLoggedIn={userLoggedIn}
        recLoading={recLoading}
        recError={recError}
        recommendedPosts={recommendedPosts}
        profileIncomplete={profileIncomplete}
        onPostClick={handlePostClick}
        onLoginClick={handleLoginClick}
        onRetry={fetchRecommendedPosts}
      />

      {/* 전체 공고 영역 */}
      <div className="max-w-[994px] mx-auto px-4 py-8">
        {/* 헤더 */}
        <PostsHeader
          sortOption={sortOption}
          isFilterOpen={isFilterOpen}
          onSortChange={handleSortChange}
          onFilterClick={handleFilterClick}
          onFilterClose={handleFilterClose}
          onFilterApply={handleFilterApply}
          onFilterReset={handleFilterReset}
          appliedFilters={appliedFilters}
        />

        {/* 공고 그리드 */}
        <PostsGrid
          posts={posts}
          loading={loading}
          error={error}
          currentPage={currentPage}
          totalPages={totalPages}
          onPostClick={handlePostClick}
          onPageChange={handlePageChange}
          onRetry={() => fetchPosts(currentPage, appliedFilters, "time")}
        />
      </div>
    </div>
  );
}
