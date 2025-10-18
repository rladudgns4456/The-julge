"use client";

import React from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import Button from "@/components/common/button";
import Input from "@/components/common/input/Input";
import { REGION_OPTIONS } from "@/constants/options";
import { useFilter } from "@/hooks/useFilter";
import { FilterOptions, DetailFilterProps } from "@/types/filter";
import "react-datepicker/dist/react-datepicker.css";

// 필터 관련 타입들을 re-export (컴포넌트 사용 시 편의성을 위해)
export type { FilterOptions, DetailFilterProps };

/**
 * THE-JULGE 프로젝트 상세 필터 컴포넌트
 *
 * @param {Object} props - DetailFilter 컴포넌트 props
 * @param {boolean} props.isOpen - 필터 열림 상태
 * @param {Function} props.onClose - 필터 닫기 함수
 * @param {Function} props.onApply - 필터 적용 함수
 * @param {Function} props.onReset - 필터 초기화 함수
 * @param {FilterOptions} [props.initialFilters] - 초기 필터 값
 *
 * @description
 * 반응형 드롭다운 필터 컴포넌트
 * - PC(md 이상): 우측 정렬 드롭다운 형태
 * - 모바일(md 미만): 전체화면 형태
 *
 * @features
 * - 다중 지역 선택 (태그 형태로 표시)
 * - 시작일 선택
 * - 최소 시급 설정
 * - 실시간 필터 적용 및 초기화
 */

const DetailFilter: React.FC<DetailFilterProps> = ({ isOpen, onClose, onApply, onReset, initialFilters = {} }) => {
  const { filters, handleFilterChange, handleLocationToggle, resetFilters } = useFilter(initialFilters);

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    resetFilters();
    onReset();
  };

  // 닫혀있으면 렌더링하지 않음
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 md:absolute md:inset-auto md:top-full md:right-0 md:mt-2 md:w-[390px] bg-white md:rounded-lg md:shadow-lg md:border md:border-gray-20 h-full md:h-auto w-full z-40">
      <div className="h-full flex flex-col md:block">
        <div className="flex items-center justify-between p-4 border-b border-gray-20">
          <h2 className="text-body-1-bold text-black">상세 필터</h2>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity"
          >
            <Image src="/close.svg" alt="닫기" width={24} height={24} />
          </button>
        </div>

        {/* 필터 내용 */}
        <div className="flex-1 md:flex-none p-4 space-y-6 overflow-y-auto">
          <div>
            <h3 className="text-body-1-regular text-black mb-3">위치</h3>
            <div className="max-h-64 overflow-y-auto border border-gray-20 rounded-md p-2">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={!filters.location || filters.location.length === 0 ? "outlined" : "gray"}
                  size="small"
                  onClick={() => handleFilterChange("location", undefined)}
                  className="text-body-2-regular"
                >
                  전체
                </Button>
                {REGION_OPTIONS.map(region => (
                  <Button
                    key={region.value}
                    variant={filters.location?.includes(region.label) ? "outlined" : "gray"}
                    size="small"
                    onClick={() => handleLocationToggle(region.label)}
                    className="text-body-2-regular"
                  >
                    {region.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* 선택된 지역 표시 */}
            {filters.location && filters.location.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {filters.location.map(selectedLocation => (
                  <span
                    key={selectedLocation}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-red-10 text-primary-20 text-caption rounded-full"
                  >
                    {selectedLocation}
                    <button
                      onClick={() => handleLocationToggle(selectedLocation)}
                      className="w-3 h-3 flex items-center justify-center rounded-full transition-colors text-caption font-bold"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-gray-20" />

          <div>
            <label htmlFor="startDate" className="block text-body-2-regular text-black mb-1">
              시작일
            </label>
            <div className="w-full">
              <DatePicker
                id="startDate"
                selected={filters.startDate}
                onChange={(date: Date | null) => handleFilterChange("startDate", date ?? undefined)}
                dateFormat="yyyy-MM-dd"
                className="w-full h-12 px-3 py-2 border border-gray-30 rounded-md text-body-2-regular text-black focus:outline-none focus:ring-2 focus:ring-primary-20 focus:border-transparent"
                placeholderText="날짜를 선택하세요"
                wrapperClassName="w-full"
                minDate={new Date()}
              />
            </div>
          </div>

          <div className="border-t border-gray-20" />

          <div>
            <label htmlFor="hourlyWageMin" className="block text-body-2-regular text-black mb-1">
              금액
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 max-w-32">
                <Input
                  name="hourlyWageMin"
                  type="number"
                  value={filters.hourlyWageMin ? filters.hourlyWageMin.toString() : ""}
                  placeholder="입력"
                  unit="원"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    handleFilterChange("hourlyWageMin", value ? parseInt(value) : undefined);
                  }}
                />
              </div>
              <span className="text-body-2-regular text-black">이상부터</span>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-20">
          <div className="flex gap-2">
            <Button variant="outlined" size="large" className="w-20" onClick={handleReset}>
              초기화
            </Button>
            <Button variant="primary" size="large" className="flex-1" onClick={handleApply}>
              적용하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailFilter;
