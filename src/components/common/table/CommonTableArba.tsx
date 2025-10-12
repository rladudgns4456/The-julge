import React from "react";
import { ApplicationTableProps } from "@/types/TablePropsTypes";

const CommonTableArba: React.FC<ApplicationTableProps> = ({ data }) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-blue-10 text-blue-20 px-3 py-1 rounded-full text-sm font-medium";
      case "rejected":
        return "bg-red-10 text-red-40 px-3 py-1 rounded-full text-sm font-medium";
      case "pending":
        return "bg-green-10 text-green-20 px-3 py-1 rounded-full text-sm font-medium";
      default:
        return "bg-gray-10 text-gray-50 px-3 py-1 rounded-full text-sm font-medium";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "승인 완료";
      case "rejected":
        return "거절";
      case "pending":
        return "대기중";
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-black p-6 pb-4">신청 내역</h2>

      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-red-10">
              <th className="w-[228px] px-6 py-4 text-center text-sm font-semibold text-black rounded-tl-lg">가게</th>
              <th className="w-[300px] px-6 py-4 text-center text-sm font-semibold text-black">일자</th>
              <th className="w-[200px] px-6 py-4 text-center text-sm font-semibold text-black">시급</th>
              <th className="w-[236px] px-6 py-4 text-center text-sm font-semibold text-black rounded-tr-lg">상태</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item.id}
                className={`${
                  index !== data.length - 1 ? "border-b border-gray-10" : ""
                } hover:bg-gray-5 transition-colors`}
                style={{ height: "70px" }}
              >
                <td className="px-6 py-4 text-sm font-medium text-black text-center">{item.store}</td>
                <td className="px-6 py-4 text-sm text-black text-center">{item.date}</td>
                <td className="px-6 py-4 text-sm text-black text-center">{item.hourlyWage}</td>
                <td className="px-6 py-4 text-center">
                  <span className={getStatusStyle(item.status)}>{getStatusText(item.status)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommonTableArba;
