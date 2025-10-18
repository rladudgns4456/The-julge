import instance from "@/api/axios";
import { handleApiError } from "../error/ErrorHandler";
import { ShopRequest, ShopResponse } from "@/types/shop";

// POST '/shops' - 가게 등록
export const postShop = async (body: ShopRequest): Promise<ShopResponse> => {
  try {
    const response = await instance.post<ShopResponse>("/shops", body);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// GET 'shops/{shop_id}' - 가게 정보 조회
export const getShop = async (shopId: string): Promise<ShopResponse> => {
  try {
    const response = await instance.get<ShopResponse>(`/shops/${shopId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

//PUT '/shops/{shop_id}' - 가게 정보 수정
export const putShop = async (shopId: string, body: ShopRequest): Promise<ShopResponse> => {
  try {
    const response = await instance.put<ShopResponse>(`/shops/${shopId}`, body);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
