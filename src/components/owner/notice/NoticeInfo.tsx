import Image from "next/image";
import Link from "next/link";
import Button from "@/components/common/button";
import { formatDate, formatTime } from "@/utils/date";
import { NoticeDetailItem } from "@/types/notice";
import { ApplicationStatus } from "@/types/application";

interface NoticeInfoProps {
  noticeDetail: NoticeDetailItem;
  userRole?: "employer" | "employee";
  onApply?: () => void;
  hasApplied?: boolean;
  applicationStatus?: ApplicationStatus | null;
  isApplying?: boolean;
  applicationError?: string | null;
}

export const NoticeInfo = ({
  noticeDetail,
  userRole = "employer",
  onApply,
  hasApplied = false,
  applicationStatus,
  isApplying = false,
  applicationError,
}: NoticeInfoProps) => {
  const { shop, hourlyPay, startsAt, workhour, description, id, closed } = noticeDetail;

  // 숫자를 통화 형식으로 포맷팅
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("ko-KR").format(amount);
  };

  // 날짜 포맷팅
  const formatDateTime = (startTime: string, workHours: number): string => {
    const start = new Date(startTime);
    const end = new Date(start.getTime() + workHours * 60 * 60 * 1000);

    const dateStr = formatDate(start).replace(/\. /g, "-").replace(".", ""); // YYYY-MM-DD
    const startTimeStr = formatTime(start);
    const endTimeStr = formatTime(end);

    return `${dateStr} ${startTimeStr}~${endTimeStr} (${workHours}시간)`;
  };

  const calculateIncreaseRate = (): number => {
    if (!shop.item.originalHourlyPay || shop.item.originalHourlyPay === 0) return 0;
    return Math.round(((hourlyPay - shop.item.originalHourlyPay) / shop.item.originalHourlyPay) * 100);
  };
  const increaseRate = calculateIncreaseRate();

  // 신청 상태에 따른 버튼 텍스트 및 스타일
  const getApplicationButtonProps = () => {
    if (closed) {
      return {
        text: "마감 완료",
        disabled: true,
        variant: "outlined" as const,
      };
    }

    if (!hasApplied) {
      return {
        text: "신청하기",
        disabled: false,
        variant: "primary" as const,
      };
    }

    switch (applicationStatus) {
      case "pending":
        return {
          text: "신청 완료",
          disabled: true,
          variant: "outlined" as const,
        };
      case "accepted":
        return {
          text: "승인됨",
          disabled: true,
          variant: "blue" as const,
        };
      case "rejected":
        return {
          text: "거절됨",
          disabled: true,
          variant: "outlined" as const,
        };
      case "canceled":
        return {
          text: "취소됨",
          disabled: true,
          variant: "outlined" as const,
        };
      default:
        return {
          text: "신청하기",
          disabled: false,
          variant: "primary" as const,
        };
    }
  };

  const buttonProps = getApplicationButtonProps();

  return (
    <div className="w-full">
      <div className="border border-gray-20 rounded-xl">
        <div className="flex w-full bg-white p-6 gap-[30px] rounded-xl flex-col md:flex-row">
          {/* 가게 이미지 */}
          <div className="relative w-full md:w-[539px] h-[309px]">
            <Image src={shop.item.imageUrl} alt={shop.item.name} fill className="object-cover rounded-xl" priority />
          </div>

          {/* 공고 정보 */}
          <div className="w-full md:w-[346px] flex flex-col justify-between gap-3 grow-0">
            {/* 공고 시급 */}
            <div>
              <span className="text-body-1-bold text-primary-20">시급</span>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-h1">{formatCurrency(hourlyPay)}원</span>
                {increaseRate > 0 && (
                  <span className="px-4 py-3 bg-primary-20 text-white text-body-2-bold rounded-full">
                    기존 시급보다 {increaseRate}% ↑
                  </span>
                )}
              </div>
            </div>
            {/* 근무 날짜 / 시간 */}
            <div className="flex gap-1.5 text-body-1-regular items-center">
              <Image
                src="/clock.svg"
                width={20}
                height={20}
                alt="시간 아이콘"
                style={{ width: "20px", height: "20px" }}
              />
              <span className="text-gray-50 text-body-1-regular">{formatDateTime(startsAt, workhour)}</span>
            </div>
            {/* 주소 */}
            <div className="text-body-1-regular">
              <div className="flex gap-1 items-center">
                <Image
                  src="/Location.svg"
                  width={20}
                  height={20}
                  alt="주소 아이콘"
                  style={{ width: "20px", height: "20px" }}
                />
                <span className="text-gray-50 text-body-1-regular">
                  {shop.item.address1} {shop.item.address2}
                </span>
              </div>
            </div>
            {/* 가게 설명 */}
            <div className="mb-4 grow">
              <p className="text-body-1-regular line-clamp-3">{shop.item.description}</p>
            </div>

            {/* 버튼 */}
            <div className="w-full flex gap-2">
              {userRole === "employer" ? (
                /* 사장: 편집하기 버튼 */
                <div className="w-full">
                  <Link href={`/owner/register-notice?mode=edit&shopId=${shop.item.id}&noticeId=${id}`}>
                    <Button variant="outlined" className="w-full" size="large" disabled={closed}>
                      {closed ? "마감 완료" : "편집하기"}
                    </Button>
                  </Link>
                </div>
              ) : (
                /* 알바: 신청하기 버튼 */
                <div className="w-full">
                  <Button
                    variant={buttonProps.variant}
                    className="w-full"
                    size="large"
                    onClick={onApply}
                    disabled={buttonProps.disabled || isApplying}
                  >
                    {isApplying ? "신청 중..." : buttonProps.text}
                  </Button>
                  {applicationError && <p className="text-caption text-red-40 mt-2 text-center">{applicationError}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 공고 설명 */}
      <div className="w-full bg-gray-10 mt-6 p-8 rounded-xl">
        <span className="text-body-1-bold text-black mb-3 block">공고 설명</span>
        <p className="text-body-1-regular whitespace-pre-wrap">{description}</p>
      </div>
    </div>
  );
};
