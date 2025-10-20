"use client";

import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { uploadImage } from "@/api/image/ImageApi";

interface ImageUploadProps {
  imageUrl: string;
  onImageUpload: (url: string) => void;
  error?: string;
}

/**
 * 이미지 업로드 컴포넌트
 * - 이미지 선택 및 미리보기
 * - 서버에 이미지 업로드 (Presigned URL 사용)
 */
export const ShopImageUpload = ({ imageUrl, onImageUpload, error }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  /**
   * 이미지 선택 영역 클릭 핸들러
   */
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * 파일 선택 핸들러
   */
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 타입 검증
    if (!file.type.startsWith("image/")) {
      setUploadError("이미지 파일만 업로드 가능합니다.");
      return;
    }

    // 파일 크기 검증 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      // 이미지 업로드 (Presigned URL 사용)
      const uploadedImageUrl = await uploadImage(file);

      // 업로드된 이미지 URL 전달
      onImageUpload(uploadedImageUrl);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "이미지 업로드에 실패했습니다.";
      setUploadError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-body-2-regular text-gray-50 mb-2">
        가게 이미지 <span className="text-primary-20">*</span>
      </label>

      <div
        onClick={handleClick}
        className={`relative w-full h-[276px] border-2 border-dashed rounded-lg cursor-pointer transition-colors overflow-hidden
            ${error || uploadError ? "border-red-40 bg-red-10" : "border-gray-30 hover:border-gray-40 bg-gray-10"}
            `}
      >
        {/* 이미지 미리보기 */}
        {imageUrl ? (
          <div className="relative w-full h-full">
            <Image src={imageUrl} alt="가게 이미지 미리보기" fill className="object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all flex items-center justify-center">
              <span className="opacity-0 hover:opacity-100 text-white text-body-1-bold">이미지 변경하기</span>
            </div>
          </div>
        ) : (
          /* 업로드 안내 */
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-body-1-regular text-gray-40">
              {isUploading ? "이미지 업로드 중..." : "이미지 추가하기"}
            </p>
          </div>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading}
        />
      </div>

      {/* 에러 메시지 */}
      {(error || uploadError) && <p className="mt-2 text-caption text-red-40">{error || uploadError}</p>}
    </div>
  );
};
