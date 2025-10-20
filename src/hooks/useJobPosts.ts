"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { User } from "@/types/user";
import { FilterOptions } from "@/types/filter";
import { PostData } from "@/types/post";
import { convertFilterOptionsToApiParams } from "@/types/filter";
import { parsePostsResponse } from "@/utils/api";
import { isPostClosed } from "@/utils/post";
import axios from "@/api/axios";
import { getNotices, SortOption } from "@/api/notice/NoticeApi";
import { SORT_OPTIONS } from "@/constants/options";

const ITEMS_PER_PAGE = 9;
const RECOMMENDED_POSTS_LIMIT = 3;

interface UseJobPostsOptions {
  keyword?: string;
  isSearchPage?: boolean;
}

export const useJobPosts = (options: UseJobPostsOptions = {}) => {
  const { keyword = "", isSearchPage = false } = options;

  const [sortOption, setSortOption] = useState<SortOption>(SORT_OPTIONS[0].value as SortOption);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<FilterOptions>({});
  const [posts, setPosts] = useState<PostData[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendedPosts, setRecommendedPosts] = useState<PostData[]>([]);
  const [recLoading, setRecLoading] = useState(false);
  const [recError, setRecError] = useState<string | null>(null);
  const [profileIncomplete, setProfileIncomplete] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const { user } = useAuth();
  const userType = user?.type ?? null;
  const router = useRouter();

  const getUserRegion = useCallback(async (userId: string): Promise<string> => {
    try {
      const userRes = await axios.get(`/users/${userId}`);
      const userData = userRes.data;
      return userData?.item?.address || userData?.item?.region || userData?.item?.profile?.region || "";
    } catch (err) {
      console.error("사용자 지역 조회 실패:", err);
      return "";
    }
  }, []);

  const getActivePosts = useCallback((allPosts: PostData[]): PostData[] => {
    return allPosts.filter((post: PostData) => !isPostClosed(post));
  }, []);

  // 추천 공고 (검색 페이지에서는 스킵)
  const fetchRecommendedPosts = useCallback(async () => {
    if (isSearchPage) return; // 검색 페이지에서는 실행 안 함

    if (!user) {
      setUserLoggedIn(false);
      setRecommendedPosts([]);
      setRecError(null);
      setProfileIncomplete(false);
      return;
    }

    setUserLoggedIn(true);
    setRecLoading(true);
    setRecError(null);

    try {
      const typedUser = user as User | null;
      const userId = typedUser?.id;

      if (!userId) {
        setRecommendedPosts([]);
        setProfileIncomplete(true);
        return;
      }

      const region = await getUserRegion(userId);

      if (!region) {
        setRecommendedPosts([]);
        setProfileIncomplete(true);
        return;
      }

      setProfileIncomplete(false);

      const responseData = await getNotices({
        offset: 0,
        limit: 100,
        address: region,
        sort: "time",
      });
      const allPosts = parsePostsResponse(responseData);
      const activePosts = getActivePosts(allPosts);

      setRecommendedPosts(activePosts.slice(0, RECOMMENDED_POSTS_LIMIT));
    } catch (err) {
      console.error("맞춤 공고 조회 실패:", err);
      setRecError("맞춤 공고를 불러오는데 실패했습니다.");
      setRecommendedPosts([]);
    } finally {
      setRecLoading(false);
    }
  }, [user, getUserRegion, getActivePosts, isSearchPage]);

  // 공고 목록 조회 (keyword 파라미터 추가)
  const fetchPosts = useCallback(
    async (page = 1, filters: FilterOptions = {}, sort: SortOption = "time") => {
      setLoading(true);
      setError(null);

      try {
        const apiParams = convertFilterOptionsToApiParams(filters);

        const responseData = await getNotices({
          offset: 0,
          limit: 100,
          keyword: keyword || undefined, // 검색 페이지에서만 사용
          address: apiParams.address,
          startsAtGte: apiParams.startsAtGte,
          hourlyPayGte: apiParams.hourlyPayGte,
          sort,
        });

        const allPosts = parsePostsResponse(responseData);

        // 한 번의 순회로 active/closed 분류
        const { activePosts, closedPosts } = allPosts.reduce(
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

        const sortedAllPosts = [...activePosts, ...closedPosts];
        const pageItems = sortedAllPosts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

        setPosts(pageItems);
        setTotalItems(responseData?.count || sortedAllPosts.length);
      } catch (err) {
        console.error("공고 조회 실패:", err);
        setError("공고를 불러오는데 실패했습니다.");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    },
    [keyword],
  );

  // 추천 공고 조회
  useEffect(() => {
    fetchRecommendedPosts();
  }, [user, fetchRecommendedPosts]);

  // 일반 공고 조회 (keyword, 필터, 정렬 변경 시)
  useEffect(() => {
    fetchPosts(currentPage, appliedFilters, sortOption);
  }, [currentPage, keyword, appliedFilters, sortOption, fetchPosts]);

  // 페이지만 변경될 때
  useEffect(() => {
    if (currentPage !== 1) {
      fetchPosts(currentPage, appliedFilters, sortOption);
    }
  }, [currentPage, fetchPosts, appliedFilters, sortOption]);

  const handleSortChange = useCallback((value: string) => {
    setSortOption(value as SortOption);
    setCurrentPage(1);
  }, []);

  const handleFilterClick = useCallback(() => {
    setIsFilterOpen(prev => !prev);
  }, []);

  const handleFilterClose = useCallback(() => {
    setIsFilterOpen(false);
  }, []);

  const handleFilterApply = useCallback((filters: FilterOptions) => {
    setAppliedFilters(filters);
    setCurrentPage(1);
  }, []);

  const handleFilterReset = useCallback(() => {
    setAppliedFilters({});
    setCurrentPage(1);
  }, []);

  // ✅ 수정: shopId도 함께 전달
  const handlePostClick = useCallback(
    (post: PostData) => {
      router.push(`/jobs/${post.shop.id}/${post.id}`);
    },
    [router],
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleLoginClick = useCallback(() => {
    router.push("/login");
  }, [router]);

  return {
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
    profileIncomplete,
    userLoggedIn,
    userType,
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
  };
};