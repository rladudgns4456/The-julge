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
              className="px-3 py-1 border border-red-40 text-red-40 bg-white rounded text-sm hover:bg-red-10 transition-colors"
            >
              거절하기
            </button>
            <button
              onClick={() => onApprove(applicant.id)}
              className="px-3 py-1 border border-blue-20 text-blue-20 bg-white rounded text-sm hover:bg-blue-10 transition-colors"
            >
              승인하기
            </button>
          </div>
        );
      case "approved":
        return <span className="px-3 py-1 bg-blue-10 text-blue-20 rounded-full text-sm font-medium">승인 완료</span>;
      case "rejected":
        return <span className="px-3 py-1 bg-red-10 text-red-40 rounded-full text-sm font-medium">거절</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-[964px] bg-white rounded-lg shadow-sm">
      {title ? <h2 className="text-xl font-bold text-black p-6 pb-4">{title}</h2> : null}

      <div className="w-full overflow-x-auto">
        <table className="w-full table-fixed">
          <thead className="">
            <tr className="bg-red-10">
              <th className="w-[228px] px-6 py-4 text-center text-sm font-semibold text-black rounded-tl-lg">신청자</th>
              <th className="hidden desktop:table-cell w-[300px] px-6 py-4 text-center text-sm font-semibold text-black">
                소개
              </th>
              <th className="mobile:hidden desktop:table-cell w-[170px] desktop:w-[200px] px-5 desktop:px-6 py-4 text-center text-sm font-semibold text-black">
                전화번호
              </th>
              <th className="w-[236px] px-6 py-4 text-center text-sm font-semibold text-black rounded-tr-lg">상태</th>
            </tr>
          </thead>
          <tbody>
            {data.map((applicant, index) => (
              <tr
                key={applicant.id}
                className={`${
                  index !== data.length - 1 ? "border-b border-gray-10" : ""
                } hover:bg-gray-5 transition-colors`}
                style={{ height: "70px" }}
              >
                <td className="px-6 py-4 text-sm font-medium text-black text-center">{applicant.name}</td>
                <td className="hidden desktop:table-cell px-6 py-4 text-sm text-black text-cente">
                  <div className="line-clamp-2">{applicant.introduction}</div>
                </td>
                <td className="mobile:hidden desktop:table-cell px-5 desktop:px-6 py-4 text-sm text-black text-center">
                  {applicant.phoneNumber}
                </td>
                <td className="px-6 py-4 text-sm text-center flex justify-center items-center">
                  {getStatusElement(applicant)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommonTable;
