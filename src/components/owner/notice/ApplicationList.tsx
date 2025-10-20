"use client";

import { useApplications } from "@/hooks/useApplications";
import { ApplicationNoticeItem } from "@/types/application";
import { ApplicantData } from "@/types/TablePropsTypes";
import CommonTable from "@/components/common/table/CommonTableBoss";

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
  const { applications, isLoading, error, approveApplication, rejectApplication } = useApplications(shopId, noticeId);

  /**
   * 신청 승인 핸들러
   * @param applicationId - 신청 ID
   */
  const handleApprove = async (applicationId: string) => {
    try {
      await approveApplication(applicationId);
      alert("신청 승인 완료");
    } catch (err) {
      alert("승인 처리 실패");
    }
  };

  const handleReject = async (applicationId: string) => {
    try {
      await rejectApplication(applicationId);
      alert("신청 거절 완료");
    } catch (err) {
      alert("거절 처리 실패");
    }
  };

  // 로딩
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <p className="text-body-1-regular text-gray-40">신청자 목록을 불러오는 중...</p>
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

  // 에러 발생
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <p className="text-body-1-regular text-red-40">{error}</p>
      </div>
    );
  }

  // ApplicationNoticeItem[] → ApplicantData[] 변환
  const applicantData: ApplicantData[] = applications.map(convertToApplicantData);

  return <CommonTable title="" data={applicantData} onApprove={handleApprove} onReject={handleReject} />;
};
