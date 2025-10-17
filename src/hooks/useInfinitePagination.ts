import { useCallback, useState } from "react";

/**
 * @template T - 데이터 아이템 타입
 * @param fetchFunction - 데이터 가져오는 함수(offset, limit)
 * @param itemsPerPage - 한 번에 가져올 개수
 */

interface PaginationResponse<T> {
  items: T[];
  hasNext: boolean;
}

interface UseInfinitePaginationOptions<T> {
  fetchFunction: (offset: number, limit: number) => Promise<PaginationResponse<T>>;
  itemsPerPage?: number;
}

export const UseInfinitePagination = <T>({ fetchFunction, itemsPerPage = 10 }: UseInfinitePaginationOptions<T>) => {
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // 초기 데이터 로드
  const loadInitial = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setOffset(0);

    try {
      const response = await fetchFunction(0, itemsPerPage);

      setItems(response.items);
      setOffset(itemsPerPage);
      setHasMore(response.hasNext);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "데이터를 불러오는데 실패했습니다.";
      setError(new Error(errorMessage));
    } finally {
      setIsLoading(false);
    }
  }, [fetchFunction, itemsPerPage]);

  //  추가 데이터 로드
  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore || isLoading) {
      return;
    }

    setIsLoadingMore(true);

    try {
      const response = await fetchFunction(offset, itemsPerPage);

      // 기존 데이터 뒤에 추가
      setItems(prev => [...prev, ...response.items]);
      setOffset(prev => prev + itemsPerPage);
      setHasMore(response.hasNext);
    } catch (err) {
      console.error("더 불러오기 실패:", err);
    } finally {
      setIsLoadingMore(false);
    }
  }, [fetchFunction, offset, itemsPerPage, hasMore, isLoadingMore, isLoading]);

  // 새로고침
  const refresh = useCallback(() => {
    loadInitial();
  }, [loadInitial]);

  // 초기화
  const reset = useCallback(() => {
    setItems([]);
    setOffset(0);
    setHasMore(true);
    setError(null);
  }, []);

  return {
    items,
    isLoading,
    isLoadingMore,
    hasMore,
    error,
    loadInitial,
    loadMore,
    refresh,
    reset,
  };
};
