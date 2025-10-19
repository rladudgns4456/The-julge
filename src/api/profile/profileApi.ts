// src/api/profile/profileApi.ts
import secureAxios from "@/api/secureAxios";
import { handleApiError } from "@/api/error/ErrorHandler";

// ✅ 프로필 조회
export const getProfile = async (userId: string) => {
  try {
    const res = await secureAxios.get(`/users/${userId}`);
    return res.data.item || res.data;
  } catch (error) {
    console.error("프로필 조회 실패:", error);
    throw handleApiError(error);
  }
};

// ✅ 프로필 등록
export const saveProfile = async (
  userId: string,
  data: { name: string; phone: string; region: string; intro: string },
) => {
  try {
    const cleanPhone = (data.phone || "").replace(/[^0-9]/g, "");
    const payload = {
      name: data.name ?? "",
      phone: cleanPhone,
      address: data.region ?? "",
      bio: data.intro ?? "",
    };

    console.log("프로필 등록 요청:", payload);

    const res = await secureAxios.put(`/users/${userId}`, payload);
    return res.data;
  } catch (error) {
    console.error("프로필 등록 실패:", error);
    throw handleApiError(error);
  }
};

// ✅ 프로필 수정
export const updateProfile = async (
  userId: string,
  data: { name: string; phone: string; region: string; intro: string },
) => {
  try {
    const cleanPhone = (data.phone || "").replace(/[^0-9]/g, "");
    const payload = {
      name: data.name ?? "",
      phone: cleanPhone,
      address: data.region ?? "",
      bio: data.intro ?? "",
    };

    console.log("프로필 수정 요청:", payload);

    const res = await secureAxios.put(`/users/${userId}`, payload);
    return res.data;
  } catch (error) {
    console.error("프로필 수정 실패:", error);
    throw handleApiError(error);
  }
};

// ✅ 신청 내역 조회
export const getApplications = async (userId: string) => {
  try {
    const res = await secureAxios.get(`/users/${userId}/applications`);
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data.applications)) return res.data.applications;
    return [];
  } catch (error) {
    console.error("❌ 신청 내역 조회 실패:", error);
    return [];
  }
};
