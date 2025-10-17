import { useEffect, useRef } from "react";

/**
 *
 * @param callback - 스크롤 끝에 도달했을 때 실행할 함수
 * @param hasMore - 다음 데이터 확인
 * @param isLoading - 로딩 상태 확인
 * @param rootMargin - 얼마나 미리 감지할지
 *
 * @returns triggerRef - 스크롤 감지할 요소에 연결할 ref
 */

interface useInfiniteScrollOptions {
  callback: () => void;
  hasMore: boolean;
  isLoading: boolean;
  rootMargin?: string;
  threshold?: number;
}

export const useInfiniteScroll = ({
  callback,
  hasMore,
  isLoading,
  rootMargin = "50px",
  threshold = 0.1,
}: useInfiniteScrollOptions) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading || !hasMore) {
      return;
    }

    observerRef.current = new IntersectionObserver(
      entries => {
        // triggerRef 요소가 화면에 보이면 callback 실행
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      {
        rootMargin,
        threshold,
      },
    );

    // 요소 감지 시작
    const trigger = triggerRef.current;
    if (trigger && observerRef.current) {
      observerRef.current.observe(trigger);
    }

    return () => {
      if (observerRef.current && trigger) {
        observerRef.current.unobserve(trigger);
        observerRef.current.disconnect();
      }
    };
  }, [callback, hasMore, isLoading, rootMargin, threshold]);

  return { triggerRef };
};
