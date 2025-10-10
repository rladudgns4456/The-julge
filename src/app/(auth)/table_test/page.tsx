"use client";

import React, { useState } from "react";
import CommonTable from "@/components/common/table/CommonTableBoss";
import CommonTableArba from "@/components/common/table/CommonTableArba";
import CommonPagination from "@/components/common/pagination/CommonPagination";
import { ApplicantData, ApplicationData } from "@/types/TablePropsTypes";
import { sampleData, applicationSampleData } from "@/components/common/table/TableProps";

const TableTestPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [applicants, setApplicants] = useState<ApplicantData[]>(sampleData);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(applicants.length / itemsPerPage);

  // 신청 내역용 페이지네이션 상태
  const [applicationCurrentPage, setApplicationCurrentPage] = useState(1);
  const applicationsItemsPerPage = 5;
  const applicationsTotalPages = Math.ceil(applicationSampleData.length / applicationsItemsPerPage);

  const handleApprove = (id: string) => {
    setApplicants(prev =>
      prev.map(applicant => (applicant.id === id ? { ...applicant, status: "approved" as const } : applicant)),
    );
    console.log(`승인: ${id}`);
  };

  const handleReject = (id: string) => {
    setApplicants(prev =>
      prev.map(applicant => (applicant.id === id ? { ...applicant, status: "rejected" as const } : applicant)),
    );
    console.log(`거절: ${id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(`페이지 변경: ${page}`);
  };

  const handleApplicationPageChange = (page: number) => {
    setApplicationCurrentPage(page);
    console.log(`신청 내역 페이지 변경: ${page}`);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = applicants.slice(startIndex, endIndex);

  // 신청 내역용 현재 데이터 계산
  const applicationStartIndex = (applicationCurrentPage - 1) * applicationsItemsPerPage;
  const applicationEndIndex = applicationStartIndex + applicationsItemsPerPage;
  const currentApplicationData = applicationSampleData.slice(applicationStartIndex, applicationEndIndex);

  return (
    <div className="min-h-screen white p-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* 신청자 관리 섹션 */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">신청자 관리</h1>
          <CommonTable title="신청자 목록" data={currentData} onApprove={handleApprove} onReject={handleReject} />
          <CommonPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>

        {/* 신청 내역 섹션 */}
        <div>
          <CommonTableArba data={currentApplicationData} />
          <CommonPagination
            currentPage={applicationCurrentPage}
            totalPages={applicationsTotalPages}
            onPageChange={handleApplicationPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TableTestPage;
