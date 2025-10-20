import instance from "@/api/axios";
import { handleApiError } from "@/api/error/ErrorHandler";

interface PresignedUrlResponse {
  item: {
    url: string; // Presigned URL (query parameters 포함)
  };
  links: unknown[];
}

// 이미지 업로드 결과 타입
export interface ImageUploadResult {
  url: string; // 최종 이미지 URL (query parameters 제외)
}

/**
 * Presigned URL 생성
 * POST /images
 *
 * @param fileName - 업로드할 파일 이름
 * @returns Presigned URL
 */
export const createPresignedUrl = async (fileName: string): Promise<string> => {
  try {
    const response = await instance.post<PresignedUrlResponse>("/images", {
      name: fileName,
    });

    return response.data.item.url;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * S3에 이미지 업로드
 * PUT Presigned URL (query parameters 포함)
 *
 * @param presignedUrl - Presigned URL
 * @param file - 업로드할 파일
 */
export const uploadToS3 = async (presignedUrl: string, file: File): Promise<void> => {
  try {
    const response = await fetch(presignedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (!response.ok) {
      throw new Error(`S3 업로드 실패: ${response.statusText}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("S3 업로드 중 오류가 발생했습니다.");
  }
};

/**
 * Query parameters 제거
 *
 * @param presignedUrl - Presigned URL (query parameters 포함)
 * @returns 최종 이미지 URL (query parameters 제외)
 */
export const removeQueryParameters = (presignedUrl: string): string => {
  return presignedUrl.split("?")[0];
};

/**
 * 전체 이미지 업로드 프로세스
 * 1. Presigned URL 생성
 * 2. S3에 업로드
 * 3. Query parameters 제거한 URL 반환
 *
 * @param file - 업로드할 이미지 파일
 * @returns 최종 이미지 URL (query parameters 제외)
 */
export const uploadImage = async (file: File): Promise<string> => {
  try {
    // Presigned URL 생성
    const presignedUrl = await createPresignedUrl(file.name);

    // S3에 업로드
    await uploadToS3(presignedUrl, file);

    // Query parameters 제거
    const imageUrl = removeQueryParameters(presignedUrl);

    return imageUrl;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("이미지 업로드에 실패했습니다.");
  }
};
