import { useState } from "react";
import { FilterOptions } from "@/types/filter";

// 필터 상태관리 훅

export const useFilter = (initialFilters: FilterOptions = {}) => {
  const [filters, setFilters] = useState<FilterOptions>({
    ...initialFilters,
    startDate: initialFilters.startDate || new Date(),
  });

  // 필터 값 변경 핸들러
  const handleFilterChange = (key: keyof FilterOptions, value: string | number | string[] | Date | undefined) => {
    setFilters(prev => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  // 지역 선택 토글
  const handleLocationToggle = (location: string) => {
    const currentLocations = filters.location || [];

    if (currentLocations.includes(location)) {
      // 이미 선택된 지역이면 제거
      const updatedLocations = currentLocations.filter(loc => loc !== location);
      handleFilterChange("location", updatedLocations.length > 0 ? updatedLocations : undefined);
    } else {
      // 새로운 지역 추가
      handleFilterChange("location", [...currentLocations, location]);
    }
  };

  // 필터 초기화
  const resetFilters = () => {
    setFilters({
      ...initialFilters,
      startDate: initialFilters.startDate || new Date(),
    });
  };

  return {
    filters,
    handleFilterChange,
    handleLocationToggle,
    resetFilters,
  };
};
