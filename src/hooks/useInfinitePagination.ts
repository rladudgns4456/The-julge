import { useCallback, useState } from "react";

/**
 * @template T - 데이터 아이템 타입
 * @param fetchFunction - 데이터 가져오는 함수(offset, limit)
 * @param limit - 한 번에 가져올 개수
 */

interface PaginationResponse<T> {
  items: T[];
  hasNext: boolean;
}

interface UseInfinitePaginationOptions<T> {
  fetchFunction: (offset: number, limit: number) => Promise<PaginationResponse<T>>;
  limit?: number;
}

export const useInfinitePagination = <T>({ fetchFunction, limit = 10 }: UseInfinitePaginationOptions<T>) => {
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [hasNext, setHasNext] = useState<boolean>(true);

  // 초기 데이터 로드
  const loadInitial = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setOffset(0);

    try {
      const response = await fetchFunction(0, limit);

      setItems(response.items);
      setOffset(limit);
      setHasNext(response.hasNext);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "데이터를 불러오는데 실패했습니다.";
      setError(new Error(errorMessage));
    } finally {
      setIsLoading(false);
    }
  }, [fetchFunction, limit]);

  //  추가 데이터 로드
  const loadMore = useCallback(async () => {
    if (isLoading || !hasNext) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetchFunction(offset, limit);

      // 기존 데이터 뒤에 추가
      setItems(prev => [...prev, ...response.items]);
      setOffset(prev => prev + limit);
      setHasNext(response.hasNext);
    } catch (err) {
      console.error("더 불러오기 실패:", err);
    } finally {
      setIsLoading(false);
    }
  }, [fetchFunction, offset, limit, hasNext, isLoading]);

  // 새로고침
  const refresh = useCallback(() => {
    loadInitial();
  }, [loadInitial]);

  // 초기화
  const reset = useCallback(() => {
    setItems([]);
    setOffset(0);
    setHasNext(true);
    setError(null);
  }, []);

  return {
    items,
    isLoading,
    hasNext,
    error,
    loadMore,
    refresh,
    reset,
  };
};
