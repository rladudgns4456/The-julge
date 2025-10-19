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
import { SORT_OPTIONS } from "@/constants/options";

const ITEMS_PER_PAGE = 9;
const RECOMMENDED_POSTS_LIMIT = 3;

export const useJobPosts = () => {
  const [sortOption, setSortOption] = useState(SORT_OPTIONS[0].value);
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
  const router = useRouter();

  const getUserRegion = useCallback(async (userId: string): Promise<string> => {
    try {
      const userRes = await axios.get(`/users/${userId}`);
      const userData = userRes.data;
      return userData?.address || userData?.region || userData?.profile?.region || "";
    } catch (err) {
      console.error("사용자 지역 조회 실패:", err);
      return "";
    }
  }, []);

  const getActivePosts = useCallback((allPosts: PostData[]): PostData[] => {
    return allPosts.filter((post: PostData) => !isPostClosed(post));
  }, []);

  const fetchRecommendedPosts = useCallback(async () => {
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
      // useAuth의 user는 User | null 타입
      const typedUser = user as User | null;

      const userId = typedUser?.id;

      if (!userId) {
        // 로그인은 되어 있으나 id를 찾을 수 없으면 프로필 미완성 상태로 처리
        setRecommendedPosts([]);
        setProfileIncomplete(true);
        return;
      }

      const region = await getUserRegion(userId);

      // 사용자의 지역 정보가 없으면 맞춤 공고를 보여주지 않고 프로필 미완성으로 처리
      if (!region) {
        setRecommendedPosts([]);
        setProfileIncomplete(true);
        return;
      }

      setProfileIncomplete(false);

      const params = new URLSearchParams();
      params.append("offset", "0");
      params.append("limit", "100");

      if (region) {
        params.append("address", region);
      }

      params.append("sort", "time");

      const response = await axios.get(`/notices?${params.toString()}`);
      const allPosts = parsePostsResponse(response.data);
      const activePosts = getActivePosts(allPosts);

      setRecommendedPosts(activePosts.slice(0, RECOMMENDED_POSTS_LIMIT));
    } catch (err) {
      console.error("맞춤 공고 조회 실패:", err);
      setRecError("맞춤 공고를 불러오는데 실패했습니다.");
      setRecommendedPosts([]);
    } finally {
      setRecLoading(false);
    }
  }, [user, getUserRegion, getActivePosts]);

  const fetchPosts = useCallback(
    async (page: number = 1, filters: FilterOptions = {}, sort: string = "time") => {
      setLoading(true);
      setError(null);

      try {
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

        const response = await axios.get(`/notices?${params.toString()}`);
        const allPosts = parsePostsResponse(response.data);

        const activePosts = getActivePosts(allPosts);
        const closedPosts = allPosts.filter((p: PostData) => isPostClosed(p));
        const sortedAllPosts = [...activePosts, ...closedPosts];

        const startIdx = (page - 1) * ITEMS_PER_PAGE;
        const endIdx = startIdx + ITEMS_PER_PAGE;
        const pageItems = sortedAllPosts.slice(startIdx, endIdx);

        setPosts(pageItems);
        setTotalItems(response.data.count || sortedAllPosts.length);
      } catch (err) {
        console.error("공고 조회 실패:", err);
        setError("공고를 불러오는데 실패했습니다.");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    },
    [getActivePosts],
  );

  useEffect(() => {
    fetchRecommendedPosts();
  }, [user, fetchRecommendedPosts]);

  useEffect(() => {
    fetchPosts(currentPage, appliedFilters, sortOption);
  }, [currentPage, appliedFilters, sortOption, fetchPosts]);

  const handleSortChange = useCallback((value: string) => {
    setSortOption(value);
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

  const handlePostClick = useCallback(
    (post: PostData) => {
      router.push(`/jobs/${post.id}`);
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
