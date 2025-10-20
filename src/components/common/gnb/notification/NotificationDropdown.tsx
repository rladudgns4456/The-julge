import Image from "next/image";
import { useRouter } from "next/navigation";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useNotifications } from "@/hooks/useNotifications";
import { NotificationItem } from "@/types/notification";
import NotificationCard from "@/components/common/gnb/notification/NotificationCard";

interface DropdownProps {
  onClose: () => void;
}

const NotificationDropDown = ({ onClose }: DropdownProps) => {
  const router = useRouter();
  const { notifications, error, isLoading, hasNext, markAsRead, loadMore } = useNotifications();

  const { triggerRef } = useInfiniteScroll({
    callback: loadMore,
    hasNext,
    isLoading: isLoading,
    rootMargin: "10px",
  });

  const handleNotificationClick = async (notification: NotificationItem) => {
    if (!notification.read) {
      try {
        await markAsRead(notification.id);
      } catch (err) {
        throw new Error("읽은 알림을 처리하는데 실패했습니다.");
      }
    }
    router.push(notification.notice.href);

    onClose();
  };

  return (
    <div className="mobile:fixed mobile:inset-0 mobile:w-full mobile:h-full mobile:border-0 mobile:rounded-none absolute w-[368px] bg-red-10 right-0 top-10 px-5 py-6 rounded-[0.625rem] flex flex-col gap-4 drop-shadow-[0_2px_8px_rgba(120, 116, 134, 0.25)] border-solid border-[1px] border-gray-30 z-50">
      <div className="flex items-center">
        <p className="text-h3 flex-1">알림</p>
        <button onClick={onClose} className="desktop:hidden tablet:hidden mobile:block">
          <Image src="/close.svg" alt="닫기 아이콘" width={24} height={24} />
        </button>
      </div>
      {/* 알림 목록 */}
      <div className="mobile:flex-1 w-full h-full flex flex-col gap-2 tablet:max-h-[419px] desktop:max-h-[419px] overflow-y-auto">
        {isLoading ? (
          /* 알림 로딩 */
          <div className="px-3 py-4 text-center">
            <p className="text-body-2-regular text-gray-40">알림을 불러오는 중...</p>
          </div>
        ) : error ? (
          /* 알림 에러 */
          <div className="px-3 py-4 text-center">
            <p className="text-body-2-regular text-gray-40">알림을 불러오는 중 오류가 발생했습니다.</p>
          </div>
        ) : notifications.length === 0 ? (
          /* 알림 없음 */
          <div className="px-3 py-4 text-center">
            <p className="text-body-2-regular text-gray-40">새로운 알림이 없습니다.</p>
          </div>
        ) : (
          /* 알림 목록 */
          <>
            {notifications.map(notification => (
              <NotificationCard
                key={notification.item.id}
                notification={notification.item}
                onClick={handleNotificationClick}
              />
            ))}
            <div ref={triggerRef} />
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationDropDown;
