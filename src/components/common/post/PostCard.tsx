"use client";

import React from "react";
import Image from "next/image";
import { PostCardProps, PostData } from "@/types/post";

// 포스트 관련 타입들을 re-export (컴포넌트 사용 시 편의성을 위해)
export type { PostCardProps, PostData };

/**
 * THE-JULGE 프로젝트 포스트 카드 컴포넌트
 *
 * @param {Object} props - PostCard 컴포넌트 props
 * @param {Object} props.post - 표시할 포스트 데이터
 * @param {Function} [props.onClick] - 카드 클릭 시 실행될 함수
 *
 */

const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  // 기존 시급 대비 시급 인상률 계산
  const getPayIncreaseRate = (): number => {
    if (!post.shop.originalHourlyPay) return 0;
    return Math.round(((post.hourlyPay - post.shop.originalHourlyPay) / post.shop.originalHourlyPay) * 100);
  };

  // Date 객체 생성
  const startDate = new Date(post.startsAt);
  const endDate = new Date(startDate.getTime() + post.workhour * 60 * 60 * 1000);
  const currentDate = new Date();

  // 시간 문자열을 HH:mm 형식으로 포맷팅
  const formatTime = (date: Date): string => {
    if (isNaN(date.getTime())) return "";
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  // 날짜 문자열을 YYYY.MM.DD 형식으로 포맷팅
  const formatDate = (date: Date): string => {
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // 시간 기반 마감 여부 확인
  const isExpired = currentDate > startDate;
  const isClosed = post.closed || isExpired;

  // 색상 스타일 객체
  const COLOR_STYLES = {
    closed: {
      text: "text-gray-30",
      primary: "text-gray-30",
    },
    active: {
      text: "text-gray-50",
      primary: "text-black",
    },
  };

  // 컴포넌트 상태 및 스타일 변수들
  const payIncreaseRate = getPayIncreaseRate();
  const colorStyle = isClosed ? COLOR_STYLES.closed : COLOR_STYLES.active;

  // 카드 클릭 핸들러
  const handleCardClick = () => {
    if (onClick) onClick(post);
  };

  return (
    <div
      className={`bg-white rounded-[12px] overflow-hidden shadow-sm border border-gray-20 min-w-[171px] h-[261px] sm:w-full sm:h-[349px] flex flex-col justify-center ${
        onClick && !isClosed ? "cursor-pointer hover:shadow-md transition-shadow" : ""
      }`}
      onClick={handleCardClick}
    >
      <div className="relative h-[120px] sm:h-[160px] bg-gray-10 mx-3 sm:mx-4 mt-3 sm:mt-0 rounded-[12px]">
        <Image
          src={post.shop.imageUrl || "/placeholder-shop.svg"}
          alt={post.shop.name}
          fill
          className="object-cover rounded-[12px]"
          sizes="(max-width: 640px) 171px, 312px"
        />
        {isClosed && (
          <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center rounded-[12px]">
            <span className="text-gray-30 font-bold text-h1">마감 완료</span>
          </div>
        )}
      </div>

      <div className="p-3 sm:p-4 flex flex-col">
        <h3 className={`font-bold truncate text-body-1-bold sm:text-[20px] sm:leading-[100%] ${colorStyle.primary}`}>
          {post.shop.name}
        </h3>

        <div className={`flex items-center gap-1 mt-1 sm:mt-2 ${colorStyle.text}`}>
          <Image
            src={isClosed ? "/clock-closed.svg" : "/clock.svg"}
            alt="시간"
            width={20}
            height={20}
            className="flex-shrink-0 w-[20px] h-[20px]"
          />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1">
            <span className="text-caption sm:text-body-2-regular">{formatDate(startDate)}</span>
            <span className="text-caption sm:text-body-2-regular">
              {formatTime(startDate)}-{formatTime(endDate)} ({post.workhour}시간)
            </span>
          </div>
        </div>

        <div className={`flex items-center gap-1 mt-1 sm:mt-2 ${colorStyle.text}`}>
          <Image
            src={isClosed ? "/Location-closed.svg" : "/Location.svg"}
            alt="위치"
            width={20}
            height={20}
            className="flex-shrink-0 w-[20px] h-[20px]"
          />
          <span className="truncate text-caption sm:text-body-2-regular">{post.shop.address1}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 mt-4">
          <span className={`font-bold text-[18px] leading-[100%] sm:text-h2 ${colorStyle.primary}`}>
            {post.hourlyPay.toLocaleString()}원
          </span>

          {payIncreaseRate > 0 && !isClosed && (
            <div
              className={`flex items-center gap-1 px-0 py-0 sm:px-3 sm:py-2 sm:rounded-full mt-1 sm:mt-0 ${
                payIncreaseRate >= 50 ? "sm:bg-red-40" : "sm:bg-red-30"
              }`}
            >
              <span
                className={`font-bold text-caption sm:text-body-2-bold ${
                  payIncreaseRate >= 50 ? "text-red-40 sm:text-white" : "text-red-30 sm:text-white"
                }`}
              >
                기존 시급보다 {payIncreaseRate}% ↑
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
