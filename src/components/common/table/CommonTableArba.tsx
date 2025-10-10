import React from "react";
import { ApplicationTableProps } from "@/types/TablePropsTypes";

const CommonTableArba: React.FC<ApplicationTableProps> = ({ data }) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium";
      case "rejected":
        return "bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium";
      case "pending":
        return "bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium";
      default:
        return "bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium";
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
      <h2 className="text-xl font-bold text-gray-900 p-6 pb-4">신청 내역</h2>

      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-pink-50">
              <th className="w-[228px] px-6 py-4 text-center text-sm font-semibold text-gray-700 rounded-tl-lg">
                가게
              </th>
              <th className="w-[300px] px-6 py-4 text-center text-sm font-semibold text-gray-700">일자</th>
              <th className="w-[200px] px-6 py-4 text-center text-sm font-semibold text-gray-700">시급</th>
              <th className="w-[236px] px-6 py-4 text-center text-sm font-semibold text-gray-700 rounded-tr-lg">
                상태
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item.id}
                className={`${
                  index !== data.length - 1 ? "border-b border-gray-100" : ""
                } hover:bg-gray-10 transition-colors`}
                style={{ height: "70px" }}
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900 text-center">{item.store}</td>
                <td className="px-6 py-4 text-sm text-gray-700 text-center">{item.date}</td>
                <td className="px-6 py-4 text-sm text-gray-700 text-center">{item.hourlyWage}</td>
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
