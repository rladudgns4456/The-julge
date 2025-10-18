import { PostData } from "@/types/post";

// 공고 마감 여부 판별 유틸 함수
export const isPostClosed = (post: PostData): boolean => {
  const startDate = new Date(post.startsAt);
  const isExpired = new Date() > startDate;
  return post.closed || isExpired;
};
