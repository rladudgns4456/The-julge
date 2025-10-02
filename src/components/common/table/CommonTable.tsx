"use client";

import React from "react";
import { TableProps, ApplicantData } from "@/types/TablePropsTypes";

const CommonTable: React.FC<TableProps> = ({ title, data, onApprove, onReject }) => {
  const getStatusElement = (applicant: ApplicantData) => {
    switch (applicant.status) {
      case "pending":
        return (
          <div className="flex gap-2">
            <button
              onClick={() => onReject(applicant.id)}
              className="px-3 py-1 border border-red-500 text-red-500 bg-white rounded text-sm hover:bg-red-50 transition-colors"
            >
              거절하기
            </button>
            <button
              onClick={() => onApprove(applicant.id)}
              className="px-3 py-1 border border-blue-500 text-blue-500 bg-white rounded text-sm hover:bg-blue-50 transition-colors"
            >
              승인하기
            </button>
          </div>
        );
      case "approved":
        return <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">승인 완료</span>;
      case "rejected":
        return <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">거절</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 p-6 pb-4">{title}</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-pink-500 text-white">
              <th className="px-6 py-3 text-left text-sm font-medium rounded-tl-lg">신청자</th>
              <th className="px-6 py-3 text-left text-sm font-medium">소개</th>
              <th className="px-6 py-3 text-left text-sm font-medium">전화번호</th>
              <th className="px-6 py-3 text-left text-sm font-medium rounded-tr-lg">상태</th>
            </tr>
          </thead>
          <tbody>
            {data.map((applicant, index) => (
              <tr
                key={applicant.id}
                className={`border-b border-gray-200 hover:bg-gray-10 transition-colors ${
                  index === data.length - 1 ? "rounded-b-lg" : ""
                }`}
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{applicant.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
                  <div className="line-clamp-2">{applicant.introduction}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{applicant.phoneNumber}</td>
                <td className="px-6 py-4 text-sm">{getStatusElement(applicant)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommonTable;
