"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PostCard, { PostData } from "@/components/common/post/PostCard";
import CommonPagination from "@/components/common/pagination/CommonPagination";
import CustomDropdown from "@/components/common/input/Dropdown";
import DetailFilter, { FilterOptions } from "@/components/common/filter";
import Button from "@/components/common/button";
import { SORT_OPTIONS } from "@/constants/options";
import { convertFilterOptionsToApiParams } from "@/types/filter";
import { parsePostsResponse } from "@/utils/api";
import axios from "@/api/axios";

const ITEMS_PER_PAGE = 9;

export default function JobPostsPage() {
  const [sortOption, setSortOption] = useState(SORT_OPTIONS[0].value);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<FilterOptions>({});
  const [posts, setPosts] = useState<PostData[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();

  // 화면 크기 감지
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 마감된 공고 판별 함수
  const isPostClosed = (post: PostData) => {
    const startDate = new Date(post.startsAt);
    const isExpired = new Date() > startDate;
    return post.closed || isExpired;
  };

  const fetchPosts = async (page: number = 1, filters: FilterOptions = {}, sort: string = "time") => {
    setLoading(true);
    setError(null);
    try {
      // 전체 데이터를 가져오기 위해 offset=0, limit을 100으로 설정
      const params = new URLSearchParams();
      params.append("offset", "0");
      params.append("limit", "100");

      const apiParams = convertFilterOptionsToApiParams(filters);

      if (apiParams.address?.length) {
        apiParams.address.forEach(location => {
          params.append("address", location);
        });
      }

      if (apiParams.startsAtGte) {
        params.append("startsAtGte", apiParams.startsAtGte);
      }

      if (apiParams.hourlyPayGte) {
        params.append("hourlyPayGte", String(apiParams.hourlyPayGte));
      }

      params.append("sort", sort);

      const url = `/notices?${params.toString()}`;
      console.log("API 요청 URL:", url);

      const response = await axios.get(url);
      console.log("API 응답:", response.data);

      let allPosts = parsePostsResponse(response.data);

      // 활성 공고를 앞에, 마감 공고를 뒤에 배치
      const activePosts = allPosts.filter((p: PostData) => !isPostClosed(p));
      const closedPosts = allPosts.filter((p: PostData) => isPostClosed(p));
      const sortedAllPosts = [...activePosts, ...closedPosts];

      // 페이지네이션 적용
      const startIdx = (page - 1) * ITEMS_PER_PAGE;
      const endIdx = startIdx + ITEMS_PER_PAGE;
      const pageItems = sortedAllPosts.slice(startIdx, endIdx);

      setPosts(pageItems);
      setTotalItems(response.data.count || sortedAllPosts.length);
    } catch (err) {
      console.error("API 에러:", err);
      if (err instanceof Error && "response" in err) {
        console.error("에러 응답 데이터:", (err as any).response?.data);
        console.error("에러 상태 코드:", (err as any).response?.status);
      }
      setError("공고를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchPosts(currentPage, appliedFilters, sortOption);
  }, [currentPage, appliedFilters, sortOption]);

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const handleSortChange = (value: string) => {
    setSortOption(value);
    setCurrentPage(1);
  };

  const handleFilterClick = () => {
    setIsFilterOpen(prev => !prev);
  };

  const handleFilterClose = () => {
    setIsFilterOpen(false);
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
    // 로그인 상태에 관계없이 상세 페이지로 이동
    router.push(`/jobs/${post.id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-5">
      <div className="max-w-[994px] mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-wrap justify-between items-center">
            <h1 className="text-h1 font-bold text-black mb-5 sm:mb-0">전체 공고</h1>

            <div className="flex items-center gap-2 relative">
              <div className="w-[130px]">
                <CustomDropdown
                  name="sort"
                  value={sortOption}
                  options={SORT_OPTIONS}
                  onChange={handleSortChange}
                  buttonClassName="h-[37px]"
                />
              </div>

              <Button
                variant={isFilterOpen ? "primary" : "outlined"}
                size="small"
                onClick={handleFilterClick}
                className="whitespace-nowrap px-6"
              >
                상세 필터
              </Button>

              <DetailFilter
                isOpen={isFilterOpen}
                onClose={handleFilterClose}
                onApply={handleFilterApply}
                onReset={handleFilterReset}
                initialFilters={appliedFilters}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {loading ? (
            <div className="col-span-full text-center py-8">로딩 중...</div>
          ) : error ? (
            <div className="col-span-full text-center py-8 text-red-500">{error}</div>
          ) : posts.length === 0 ? (
            <div className="col-span-full text-center py-8">공고가 없습니다.</div>
          ) : (
            (isMobile ? posts.slice(0, 8) : posts).map(post => (
              <PostCard key={post.id} post={post} onClick={handlePostClick} />
            ))
          )}
        </div>

        {totalPages > 1 && (
          <CommonPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        )}
      </div>
    </div>
  );
}
