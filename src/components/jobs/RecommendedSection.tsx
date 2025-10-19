import React from "react";
import PostCard from "@/components/common/post/PostCard";
import Button from "@/components/common/button";
import { PostData } from "@/types/post";

interface RecommendedSectionProps {
  userLoggedIn: boolean;
  recLoading: boolean;
  recError: string | null;
  recommendedPosts: PostData[];
  onPostClick: (post: PostData) => void;
  onLoginClick: () => void;
  onRetry: () => void;
}

const RecommendedSection: React.FC<RecommendedSectionProps> = ({
  userLoggedIn,
  recLoading,
  recError,
  recommendedPosts,
  onPostClick,
  onLoginClick,
  onRetry,
}) => {
  return (
    <div className="mb-9 bg-red-10">
      {userLoggedIn ? (
        <div className="max-w-[994px] mx-auto px-4 py-8">
          <h1 className="text-h1 font-bold text-black mb-8">맞춤 공고</h1>

          {recLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-gray-30 border-t-primary-20 rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-body-2-regular text-gray-50">공고를 불러오는 중...</p>
              </div>
            </div>
          ) : recError ? (
            <div className="p-6 bg-white rounded-lg text-center border border-gray-20">
              <p className="text-body-2-regular text-gray-50 mb-4">{recError}</p>
              <Button variant="outlined" size="medium" onClick={onRetry} className="w-fit">
                다시 시도
              </Button>
            </div>
          ) : recommendedPosts.length === 0 ? (
            <div className="p-6 bg-white rounded-lg text-center border border-gray-20">
              <p className="text-body-2-regular text-gray-50">현재 지역 맞춤 공고가 없습니다.</p>
            </div>
          ) : (
            <div className="overflow-x-auto overflow-visible">
              <div className="gap-4 grid grid-cols-3 sm:w-[962px] w-[530px]">
                {recommendedPosts.map(post => (
                  <PostCard key={post.id} post={post} onClick={onPostClick} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-[994px] mx-auto px-4 py-8">
          <h1 className="text-h1 font-bold text-black mb-8">맞춤 공고</h1>
          <div className="p-8 bg-white rounded-lg text-center border border-gray-20 shadow-sm">
            <p className="text-body-1-regular text-gray-50 mb-6">
              로그인하고 당신의 지역에 맞춤형 공고를 확인해보세요!
            </p>
            <Button variant="primary" size="medium" onClick={onLoginClick} className="w-[50%] m-0 mx-auto">
              로그인하기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendedSection;
