import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import NotificationDropdown from "@/components/common/gnb/notification/NotificationDropdown";
import { useNotifications } from "@/hooks/useNotifications";

const NotificationButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { unreadCount } = useNotifications();

  useEffect(() => {
    const hadleClickOutsie = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", hadleClickOutsie);
    }

    return () => {
      document.removeEventListener("mousedown", hadleClickOutsie);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const hasUnread = unreadCount > 0;

  const iconType = hasUnread ? "/active.svg" : "/inactive.svg";

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleDropdown}>
        <Image src={iconType} className={`${iconType}`} width={24} height={24} alt="알림 아이콘" />
      </button>
      {isOpen && <NotificationDropdown onClose={() => setIsOpen(false)} />}
    </div>
  );
};

export default NotificationButton;
