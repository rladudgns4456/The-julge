import { useRouter } from "next/navigation";
import { PostData } from "@/types/post";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import PostCard from "@/components/common/post/PostCard";

interface NoticeListProps {
  notices: PostData[];
  hasNext: boolean;
  isLoading: boolean;
  loadMore: () => void;
}

export const NoticeList = ({ notices, hasNext, isLoading, loadMore }: NoticeListProps) => {
  const router = useRouter();

  // 무한 스크롤 Ref
  const { triggerRef } = useInfiniteScroll({
    callback: loadMore,
    hasNext,
    isLoading: isLoading,
    rootMargin: "1px",
  });

  const handleNoticeClick = (notice: PostData) => {
    router.push(`/owner/notice/${notice.shop.id}/${notice.id}`);
  };

  return (
    <div className="w-full">
      {/* 공고 목록 */}
      <div className="max-w-[964px] w-full mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
        {notices.map(notice => (
          <PostCard key={notice.id} post={notice} onClick={() => handleNoticeClick(notice)} />
        ))}

        {/* 무한 스크롤 */}
        <div ref={triggerRef} />

        {/* 로딩 */}
        {isLoading && (
          <div className="text-center py-4">
            <p className="text-body-2-regular text-gray-40">공고를 불러오는 중...</p>
          </div>
        )}
      </div>
    </div>
  );
};
