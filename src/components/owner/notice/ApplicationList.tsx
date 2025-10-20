"use client";

import { useApplications } from "@/hooks/useApplications";
import { ApplicationNoticeItem } from "@/types/application";
import { ApplicantData } from "@/types/TablePropsTypes";
import CommonTable from "@/components/common/table/CommonTableBoss";
import CommonPagination from "@/components/common/pagination/CommonPagination";

interface ApplicationListProps {
  shopId: string;
  noticeId: string;
}

const convertToApplicantData = (application: ApplicationNoticeItem): ApplicantData => {
  return {
    id: application.id,
    name: application.user.item.name ?? "이름 없음",
    introduction: application.user.item.bio ?? "",
    phoneNumber: application.user.item.phone ?? "전화번호 없음",
    status: application.status === "accepted" ? "approved" : application.status,
  };
};

export const ApplicationList = ({ shopId, noticeId }: ApplicationListProps) => {
  const {
    applications,
    isLoading,
    error,
    currentPage,
    totalPages,
    handlePageChange,
    approveApplication,
    rejectApplication,
  } = useApplications(shopId, noticeId);

  /**
   * 신청 승인 핸들러
   */
  const handleApprove = async (applicationId: string) => {
    try {
      await approveApplication(applicationId);
      alert("신청이 승인되었습니다.");
    } catch (err) {
      alert("승인 처리에 실패했습니다.");
    }
  };

  const handleReject = async (applicationId: string) => {
    try {
      await rejectApplication(applicationId);
      alert("신청이 거절되었습니다.");
    } catch (err) {
      alert("거절 처리에 실패했습니다.");
    }
  };

  // 로딩 중
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <p className="text-body-1-regular text-gray-40">신청자 목록을 불러오는 중...</p>
      </div>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <p className="text-body-1-regular text-red-40">{error}</p>
      </div>
    );
  }

  // 신청자가 없을 때
  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <p className="text-body-1-regular text-gray-40">아직 신청자가 없습니다.</p>
      </div>
    );
  }

  // ApplicationNoticeItem[] → ApplicantData[] 변환
  const applicantData: ApplicantData[] = applications.map(convertToApplicantData);

  return (
    <div>
      {/* 신청자 테이블 */}
      <CommonTable title="" data={applicantData} onApprove={handleApprove} onReject={handleReject} />
      {/* 페이지네이션 */}
      <CommonPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};
