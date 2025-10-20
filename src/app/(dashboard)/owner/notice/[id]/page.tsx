"use client";

import { useEffect, useState } from "react";
import instance from "@/api/axios";
import PostCard, { PostData } from "@/components/common/post/PostCard";
import { transformPostItem } from "@/utils/api";

export default function NoticeDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNotice = async () => {
      try {
        const res = await instance.get(`/notices/${id}`);
        setPost(transformPostItem(res.data));
      } catch (err) {
        console.error("공고 상세 불러오기 실패:", err);
        setError("공고를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    loadNotice();
  }, [id]);

  if (loading) return <p className="text-center mt-10">불러오는 중...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!post) return <p className="text-center mt-10">공고가 없습니다.</p>;

  return (
    <main className="min-h-screen w-full max-w-[964px] mx-auto px-5 pt-[24px] pb-[96px]">
      <h1 className="text-h2 font-bold mb-[16px]">공고 상세</h1>
      <div className="grid grid-cols-1 gap-4">
        <PostCard post={post} />
      </div>
    </main>
  );
}