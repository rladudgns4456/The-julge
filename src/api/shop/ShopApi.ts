import instance from "../axios";
import { AxiosError } from "axios";
import { ShopRequest, ShopResponse } from "@/types/shop";

interface ErrorMessage {
  message: string;
}

// POST '/shops' - 가게 등록
export const postShop = async (body: ShopRequest): Promise<ShopResponse> => {
  try {
    const response = await instance.post<ShopResponse>("/shops", body);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorMessage>; //  에러 타입 명시

    if (axiosError.response) {
      throw new Error(axiosError.response.data.message);
    } else {
      throw new Error("서버를 연결할 수 없습니다. 인터넷 연결을 확인해주세요.");
    }
  }
};

// GET 'shops/{shop_id}' - 가게 정보 조회
export const getShop = async (shopId: string): Promise<ShopResponse> => {
  try {
    const response = await instance.get<ShopResponse>(`/shops/${shopId}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorMessage>; //  에러 타입 명시

    if (axiosError.response) {
      throw new Error(axiosError.response.data.message);
    } else {
      throw new Error("서버를 연결할 수 없습니다. 인터넷 연결을 확인해주세요.");
    }
  }
};

//PUT '/shops/{shop_id}' - 가게 정보 수정
export const putShop = async (shopId: string, body: ShopRequest): Promise<ShopResponse> => {
  try {
    const response = await instance.put<ShopResponse>(`/shops/${shopId}`, body);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorMessage>; //  에러 타입 명시

    if (axiosError.response) {
      throw new Error(axiosError.response.data.message);
    } else {
      throw new Error("서버를 연결할 수 없습니다. 인터넷 연결을 확인해주세요.");
    }
  }
};
