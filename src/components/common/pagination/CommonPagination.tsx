"use client";

import React from "react";
import Image from "next/image";
import { PaginationProps } from "@/types/TablePropsTypes";

const CommonPagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 3);
      let endPage = Math.min(totalPages, currentPage + 3);

      if (endPage - startPage < maxVisiblePages - 1) {
        if (startPage === 1) {
          endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        } else {
          startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center justify-center rounded  border-gray-30 hover:bg-gray-10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Image src="/arrow.svg" alt="이전 페이지" width={16} height={16} className="rotate-180" />
      </button>

      {pageNumbers.map(pageNumber => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors ${
            pageNumber === currentPage ? "bg-red-30 text-white" : " border-gray-30 text-gray-50 hover:bg-gray-10"
          }`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center rounded  hover:bg-gray-10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Image src="/arrow.svg" alt="다음 페이지" width={16} height={16} />
      </button>
    </div>
  );
};

export default CommonPagination;
