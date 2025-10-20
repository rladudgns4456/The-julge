import React from "react";
import { FilterOptions } from "@/types/filter";
import CustomDropdown from "@/components/common/input/Dropdown";
import DetailFilter from "@/components/common/filter";
import Button from "@/components/common/button";
import { SORT_OPTIONS } from "@/constants/options";

interface PostsHeaderProps {
  sortOption: string;
  isFilterOpen: boolean;
  onSortChange: (value: string) => void;
  onFilterClick: () => void;
  onFilterClose: () => void;
  onFilterApply: (filters: FilterOptions) => void;
  onFilterReset: () => void;
  appliedFilters: FilterOptions;
  title?: string | React.ReactNode;
  subtitle?: string;
  resultCount?: number;
}

const PostsHeader = React.memo<PostsHeaderProps>(
  ({
    sortOption,
    isFilterOpen,
    onSortChange,
    onFilterClick,
    onFilterClose,
    onFilterApply,
    onFilterReset,
    appliedFilters,
    title = "전체 공고",
    subtitle,
    resultCount,
  }) => (
    <>
      <div className="flex flex-wrap justify-between">
        {/* 제목 섹션 */}
        <div className="mb-8">
          <h1 className="text-h1 font-bold text-black">{title}</h1>
          {(subtitle !== undefined || resultCount !== undefined) && (
            <p className="text-body-2-regular text-gray-50 pt-2">
              {resultCount !== undefined ? `총 ${resultCount}개의 공고를 찾았습니다.` : subtitle}
            </p>
          )}
        </div>

        {/* 정렬 및 필터 섹션 */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-[130px]">
              <CustomDropdown
                name="sort"
                value={sortOption}
                options={SORT_OPTIONS}
                onChange={onSortChange}
                buttonClassName="h-[37px]"
              />
            </div>

            <div className="relative z-10">
              <Button
                variant={isFilterOpen ? "primary" : "outlined"}
                size="small"
                onClick={onFilterClick}
                className="whitespace-nowrap px-6"
              >
                상세 필터
              </Button>

              <DetailFilter
                isOpen={isFilterOpen}
                onClose={onFilterClose}
                onApply={onFilterApply}
                onReset={onFilterReset}
                initialFilters={appliedFilters}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  ),
);

PostsHeader.displayName = "PostsHeader";

export default PostsHeader;
