import { useRouter } from "next/navigation";
import { PostData } from "@/types/post";
import PostCard from "@/components/common/post/PostCard";

interface NoticeListProps {
  notices: PostData[];
}

export const NoticeList = ({ notices }: NoticeListProps) => {
  const router = useRouter();

  const handleNoticeClick = (notice: PostData) => {
    router.push(`/owner/notice/${notice.id}`);
  };

  return (
    <div className="max-w-[964px] w-full mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
      {notices.map(notice => (
        <PostCard key={notice.id} post={notice} onClick={() => handleNoticeClick(notice)} />
      ))}
    </div>
  );
};
