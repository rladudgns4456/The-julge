"use client";

import React, { useState } from "react";
import CommonTable from "@/components/common/table/CommonTable";
import CommonPagination from "@/components/common/pagination/CommonPagination";
import { ApplicantData } from "@/types/TablePropsTypes";

// 샘플 데이터
// 나중에 내 프로필 설정, 가게 공고등록 데이터로 가져옴
const sampleData: ApplicantData[] = [
  {
    id: "1",
    name: "정찬일",
    introduction: "최선을 다해 열심히 일합니다. 다수의 업무 경험을 바탕으로 확실한 일처리 보여드리겠습니다.",
    phoneNumber: "010-0000-0000",
    status: "pending",
  },
  {
    id: "2",
    name: "정찬이",
    introduction: "열심히 하겠습니다!",
    phoneNumber: "010-1111-1111",
    status: "rejected",
  },
  {
    id: "3",
    name: "정찬삼",
    introduction: "성실한 자세로 열심히 일합니다. 한번 경험 해 보고 싶어요~",
    phoneNumber: "010-2222-2222",
    status: "approved",
  },
  {
    id: "4",
    name: "정찬사",
    introduction: "일을 꼼꼼하게 하는 성격입니다. 도토리 식당에서 일해보고 싶습니다.",
    phoneNumber: "010-3333-3333",
    status: "approved",
  },
  {
    id: "5",
    name: "정찬오",
    introduction: "하루라도 최선을 다해서 일하겠습니다! 감사합니다.",
    phoneNumber: "010-4444-4444",
    status: "approved",
  },
  {
    id: "6",
    name: "정찬육",
    introduction: "새로운 경험을 통해 성장하고 싶습니다. 책임감 있게 일하겠습니다.",
    phoneNumber: "010-1234-5678",
    status: "pending",
  },
  {
    id: "7",
    name: "정찬칠",
    introduction: "고객 서비스에 대한 경험이 많아서 적합할 것 같습니다.",
    phoneNumber: "010-9876-5432",
    status: "pending",
  },
  {
    id: "8",
    name: "정찬팔",
    introduction: "음식 서빙 경험이 있어서 빠르게 적응할 수 있을 것 같습니다.",
    phoneNumber: "010-5555-5555",
    status: "approved",
  },
  {
    id: "9",
    name: "정찬구",
    introduction: "시간 관리가 철저하고 성실합니다. 믿고 맡겨주세요!",
    phoneNumber: "010-6666-6666",
    status: "rejected",
  },
  {
    id: "10",
    name: "정찬십",
    introduction: "팀워크를 중시하며 긍정적인 에너지로 일하겠습니다.",
    phoneNumber: "010-7777-7777",
    status: "pending",
  },
  {
    id: "11",
    name: "정찬십일",
    introduction: "대학생이라 시간이 많아서 언제든지 가능합니다.",
    phoneNumber: "010-8888-8888",
    status: "approved",
  },
  {
    id: "12",
    name: "정찬십이",
    introduction: "카페에서 일한 경험이 있어서 적응이 빠를 것 같습니다.",
    phoneNumber: "010-9999-9999",
    status: "pending",
  },
  {
    id: "13",
    name: "정찬십삼",
    introduction: "친절하고 웃음이 많아서 고객들에게 좋은 인상을 줄 수 있습니다.",
    phoneNumber: "010-1010-1010",
    status: "approved",
  },
  {
    id: "14",
    name: "정찬십사",
    introduction: "체력이 좋고 꾸준히 일할 수 있는 사람입니다.",
    phoneNumber: "010-2020-2020",
    status: "rejected",
  },
  {
    id: "15",
    name: "정찬십오",
    introduction: "새로운 환경에서 배우고 싶은 마음이 큽니다.",
    phoneNumber: "010-3030-3030",
    status: "pending",
  },
  {
    id: "16",
    name: "정찬십육",
    introduction: "책임감이 강하고 약속을 잘 지키는 편입니다.",
    phoneNumber: "010-4040-4040",
    status: "approved",
  },
  {
    id: "17",
    name: "정찬십칠",
    introduction: "커뮤니케이션 능력이 뛰어나고 적극적입니다.",
    phoneNumber: "010-5050-5050",
    status: "pending",
  },
  {
    id: "18",
    name: "정찬십팔",
    introduction: "음식에 대한 관심이 많아서 열정적으로 일하겠습니다.",
    phoneNumber: "010-6060-6060",
    status: "approved",
  },
  {
    id: "19",
    name: "정찬십구",
    introduction: "세심하고 꼼꼼한 성격으로 실수를 적게 합니다.",
    phoneNumber: "010-7070-7070",
    status: "rejected",
  },
  {
    id: "20",
    name: "정찬이십",
    introduction: "학습능력이 빠르고 새로운 것에 도전하는 것을 좋아합니다.",
    phoneNumber: "010-8080-8080",
    status: "pending",
  },
];

const TableTestPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [applicants, setApplicants] = useState<ApplicantData[]>(sampleData);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(applicants.length / itemsPerPage);

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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = applicants.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">신청자 관리</h1>

        <CommonTable title="신청자 목록" data={currentData} onApprove={handleApprove} onReject={handleReject} />

        <CommonPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default TableTestPage;
