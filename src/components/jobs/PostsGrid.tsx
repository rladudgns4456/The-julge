import React from "react";
import PostCard from "@/components/common/post/PostCard";
import CommonPagination from "@/components/common/pagination/CommonPagination";
import Button from "@/components/common/button";
import { PostData } from "@/types/post";

interface PostsGridProps {
  posts: PostData[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  onPostClick: (post: PostData) => void;
  onPageChange: (page: number) => void;
  onRetry: () => void;
}

const PostsGrid: React.FC<PostsGridProps> = ({
  posts,
  loading,
  error,
  currentPage,
  totalPages,
  onPostClick,
  onPageChange,
  onRetry,
}) => {
  return (
    <>
      {/* 공고 그리드 */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {posts.length === 0 && !loading ? (
          <div className="col-span-full p-8 bg-white rounded-lg text-center border border-gray-20">
            <p className="text-body-2-regular text-gray-50">조건에 맞는 공고가 없습니다.</p>
          </div>
        ) : error ? (
          <div className="col-span-full p-8 bg-white rounded-lg text-center border border-gray-20">
            <p className="text-body-2-regular text-red-40 mb-4">{error}</p>
            <Button variant="outlined" size="medium" onClick={onRetry} className="w-fit">
              다시 시도
            </Button>
          </div>
        ) : (
          <>
            {posts.map(post => (
              <PostCard key={post.id} post={post} onClick={onPostClick} />
            ))}
            {loading && (
              <div className="col-span-full flex justify-center items-center py-12">
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-gray-30 border-t-primary-20 rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-body-2-regular text-gray-50">공고를 불러오는 중...</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <CommonPagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </>
  );
};

export default PostsGrid;
