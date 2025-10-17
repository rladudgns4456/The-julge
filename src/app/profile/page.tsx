"use client";

import { useState } from "react";
import Button from "@/components/common/button";
import Link from "next/link";

export default function ProfilePage() {
  const [showAlert, setShowAlert] = useState(false);
  const [applyList] = useState([]);

  return (
    <main className="flex-1 w-full max-w-[60.25rem] mx-auto px-5 tablet:px-8 mt-[80px] mb-[100px]">
      {/* 헤더 섹션 */}
      <div className="flex justify-between items-center mb-[40px]">
        <h1 className="text-h2 text-black">내 프로필</h1>
        <button
          onClick={() => setShowAlert(!showAlert)}
          className="text-body-2-bold text-primary-20 border border-primary-20 px-4 py-2 rounded-md hover:bg-primary-10"
        >
          {showAlert ? "알림 닫기" : "알림 보기"}
        </button>
      </div>

      <div className="flex flex-col tablet:flex-row gap-8">
        {/* 프로필 카드 */}
        <section
          className="
            flex-1 rounded-[12px]
            bg-[#FFF1EE]
            shadow-[0_1px_4px_rgba(0,0,0,0.08)]
            p-[32px] tablet:p-[40px]
            flex flex-col justify-between
          "
        >
          <div className="flex justify-between items-start">
            {/* 왼쪽 정보 */}
            <div>
              <p className="text-body-1-regular text-primary-20 mb-2">이름</p>
              <p className="text-h3 text-black mb-1">김승우</p>
              <p className="text-body-2-regular text-gray-50 mb-1">010-1234-4321</p>
              <p className="text-body-2-regular text-gray-50 mb-4">선호 지역: 서울시 도봉구</p>
              <p className="text-body-1-regular text-black">열심히 일하겠습니다.</p>
            </div>

            {/* 오른쪽 편집 버튼 (카드 세로 중앙 정렬) */}
            <div className="self-center">
              <Link href="/profile/edit">
                <Button variant="outlined" size="small" className="w-[96px] h-[36px] text-body-2-bold">
                  편집하기
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 알림 패널 */}
        {showAlert && (
          <aside className="w-full tablet:w-[300px] border border-gray-20 rounded-[12px] p-4 bg-white shadow-sm">
            <h3 className="text-body-1-bold text-black mb-3">알림 6개</h3>
            <ul className="flex flex-col gap-2">
              <li className="text-body-2-regular text-gray-50 bg-gray-5 rounded-md p-3 border border-gray-20">
                HS 커피주스(2023-03-14 15:00~18:00) 공고 지원이 승인되었습니다.
              </li>
              <li className="text-body-2-regular text-gray-50 bg-gray-5 rounded-md p-3 border border-gray-20">
                써니 브런치 레스토랑 지원이 거절되었습니다.
              </li>
            </ul>
          </aside>
        )}
      </div>

      {/* 신청 내역 */}
      <section className="mt-[80px]">
        <h2 className="text-h3 text-black mb-6">신청 내역</h2>

        {applyList.length === 0 ? (
          <div className="border border-gray-20 rounded-[12px] py-[80px] px-[24px] text-center bg-white">
            <p className="text-body-1-regular text-gray-50 mb-8">아직 신청 내역이 없어요.</p>
            <Link href="/notice">
              <Button variant="primary" size="large" className="w-[240px] h-[47px] mx-auto">
                공고 보러가기
              </Button>
            </Link>
          </div>
        ) : (
          <div> {/* 추후 신청내역 테이블 */} </div>
        )}
      </section>
    </main>
  );
}
