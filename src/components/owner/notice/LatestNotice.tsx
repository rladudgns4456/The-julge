"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PostCard, {PostData} from "@/components/common/post/PostCard";

export const LatestNotice = () => {
  const [latestArray, setLatestArray] = useState<PostData[] | null>(null);
  const router = useRouter()

  useEffect(() => {
    const loadLatest = () => {
        const storage = localStorage.getItem("latest");

        setLatestArray(storage ? JSON.parse(storage).slice(0, 6) : null)
    }

    loadLatest()

    const handleStorageChange = (e: StorageEvent) => {
        if(e.key === "latest") {
            setLatestArray(e.newValue ? JSON.parse(e.newValue).slice(0, 6) : null)
        }
    }

    window.addEventListener("storage", handleStorageChange);

    return () => {
       window.addEventListener("storage", handleStorageChange); 
    }
  }, []);

const handleCardClick = (notice: PostData) => {
    router.push(`/owner/notice/${notice.shop.id}/${notice.id}`);
  };

  return (
    <>
      {!latestArray || latestArray.length === 0 ? (
        <div className="flex justify-center">
          <h3>최근에 본 공고가 없습니다.</h3>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
        {latestArray.map(notice => (
            <PostCard
              post={notice}
              key={notice.id}
              onClick={() => handleCardClick(notice)}
            />
          ))}
        </div>
      )}
    </>
  );
};