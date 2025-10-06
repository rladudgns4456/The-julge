import { useNotifications } from "@/hooks/useNotifications";
import { NotificationItem } from "@/types/notification";
import NotificationCard from "./NotificationCard";

interface DropdownProps {
  onClose: () => void;
}

const NotificationDropDown = ({ onClose }: DropdownProps) => {
  const { notifications, error, isLoading, markAsRead } = useNotifications();

  const handleNotificationClick = async (notification: NotificationItem) => {
    if (!notification.item.read) {
      try {
        await markAsRead(notification.item.id);
      } catch (err) {
        console.error("알림을 불러오는데 실패했습니다.", err);
      }
    }
    window.location.href = notification.item.notice.href;

    onClose();
  };

  return (
    <div className="absolute w-[368px] bg-red-10 right-0 top-10 px-5 py-6 rounded-[0.625rem] flex flex-col gap-4 drop-shadow-[0_2px_8px_rgba(120, 116, 134, 0.25)] border-solid border-[1px] botder-gray-30">
      <div>
        <p className="text-h3">알림</p>
      </div>
      <div className="w-full h-full flex flex-col gap-2 max-h-[419px] overflow-y-auto">
        {isLoading ? null : error ? (
          // 알림 오류
          <div className="px-3 py-4 text-center">
            <p className="text-body-2-regular text-gray-40">알림을 불러오는 중 오류가 발생했습니다.</p>
          </div>
        ) : // 알림 없음
        notifications.length === 0 ? (
          <div className="px-3 py-4 text-center">
            <p className="text-body-2-regular text-gray-40">새로운 알림이 없습니다.</p>
          </div>
        ) : (
          // 알림 있음
          notifications.map(notification => (
            <NotificationCard
              key={notification.item.id}
              notification={notification}
              onClick={handleNotificationClick}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationDropDown;
