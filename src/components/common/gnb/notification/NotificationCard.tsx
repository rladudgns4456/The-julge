import React from "react";
import { NotificationItem } from "@/types/notification";

// 시간 포멧팅
const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / 60000);

  if (diffInMinutes < 1) return "방금 전";
  if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}시간 전`;
  return `${Math.floor(diffInMinutes / 1440)}일 전`;
};

// 알림 메시지 생성

const getNotificationMessage = (notification: NotificationItem) => {
  const { shop, notice, result } = notification;

  // 날짜 포맷팅: 2025-10-05T09:00:00Z -> 2025-10-05 09:00
  const startDate = new Date(notice.item.startsAt);
  const dateStr = startDate.toISOString().split("T")[0];
  const timeStr = startDate.toTimeString().slice(0, 5);

  const endTime = new Date(startDate.getTime() + notice.item.workhour * 60 * 60 * 1000);
  const endTimeStr = endTime.toTimeString().slice(0, 5);

  const resultText = result === "accepted" ? "승인" : "거절";

  return `${shop.item.name}(${dateStr} ${timeStr}~${endTimeStr}) 공고 자원이 ${resultText}되었습니다.`;
};

// 승인, 거절 스타일 결정
const getResultStyles = (result: "accepted" | "rejected") => {
  if (result === "accepted") {
    return {
      dotColor: "bg-blue-20",
      textColor: "text-blue-20",
    };
  }
  return {
    dotColor: "bg-red-40",
    textColor: "text-red-40",
  };
};

// 원 컬러와 특정 텍스트(승인, 거절) 컬러 체인지
const highlightResult = (message: string, result: "accepted" | "rejected") => {
  const { textColor } = getResultStyles(result);
  const keyword = result === "accepted" ? "승인" : "거절";

  const parts = message.split(keyword);

  return (
    <>
      {parts[0]}
      <span className={textColor}>{keyword}</span>
      {parts[1]}
    </>
  );
};

interface NotificationCardProps {
  notification: NotificationItem;
  onClick: (notification: NotificationItem) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onClick }) => {
  const { dotColor } = getResultStyles(notification.result);
  const message = getNotificationMessage(notification);
  return (
    <button
      key={notification.id}
      onClick={() => onClick(notification)}
      className="flex flex-col gap-1 bg-white px-3 py-4 rounded-[5px] text-left border-solid border-[1px] border-gray-20"
    >
      {!notification.read && <div className={`w-[5px] h-[5px] ${dotColor} rounded-full`} />}
      <p className="text-body-2-regular">{highlightResult(message, notification.result)}</p>
      <p className="text-caption text-gray-40">{formatTimestamp(notification.createdAt)}</p>
    </button>
  );
};

export default NotificationCard;
