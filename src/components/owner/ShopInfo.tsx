"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "../common/button";
import { Shop } from "@/types/user";

interface ShopInfoProps {
  shop: Shop;
}

export const ShopInfo = ({ shop }: ShopInfoProps) => {
  return (
    <section className="w-full max-w-[964px] my-[60px] mx-auto bg-white">
      <div className=" w-full">
        <div className="mb-6">
          <h2 className="text-h1">내 가게</h2>
        </div>
        <div className="flex w-full bg-red-10 p-6 gap-[30px] rounded-xl">
          {/* 가게 이미지 */}
          <div className="relative w-[539px] h-[309px]">
            <Image src={shop.item.imageUrl} alt={shop.item.name} fill className="object-cover rounded-xl" priority />
          </div>

          {/* 가게 정보 */}
          <div className="w-[346px] flex flex-col justify-between gap-3 grow-0">
            {/* 가게 타이틀 */}
            <div>
              <span className="text-body-1-bold text-primary-10">{shop.item.category}</span>
              <h2 className="text-h1">{shop.item.name}</h2>
            </div>
            {/* 주소 */}
            <div className="flex gap-1.5 text-body-1-regular ">
              <Image
                src="/Location.svg"
                width={20}
                height={20}
                alt="주소 아이콘"
                style={{ width: "20px", height: "20px" }}
              />
              <span className="text-gray-50">{shop.item.address1}</span>
            </div>
            {/* 가게 정보 */}
            <div className="grow text-body-1-regular">
              <p>{shop.item.description}</p>
            </div>
            {/* 버튼 */}
            <div className="w-full flex gap-2">
              <div className="w-full">
                <Link href={`/owner/edit-shop/${shop.item.id}`}>
                  <Button variant="outlined" className=" w-full" size="large">
                    편집하기
                  </Button>
                </Link>
              </div>
              <div className="w-full">
                <Link href={"/owner/register-notice"}>
                  <Button variant="primary" className=" w-full" size="large">
                    공고 등록하기
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
