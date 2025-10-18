'use client';

import { useState } from 'react';
import CommonModal, {
  WarningModal,
  AlertModal,
  ConfirmModal,
  CancelConfirmModal,
} from '@/components/common/modal/CommonModal';

export default function ModalPage() {
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);


  const handleConfirm = () => {
    alert('확인 버튼이 클릭되었습니다.');
    setIsConfirmOpen(false);
  };

  const handleCancel = () => {
    alert('취소하기 버튼이 클릭되었습니다.');
    setIsCancelOpen(false);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">모달 테스트페이지</h1>

      <div className="flex flex-col gap-4 md:flex-row md:flex-wrap">
        <button
          onClick={() => setIsWarningOpen(true)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          경고 모달 열기
        </button>

        <button
          onClick={() => setIsAlertOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          알림 모달 열기
        </button>

        <button
          onClick={() => setIsConfirmOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          확인 모달 열기
        </button>

        <button
          onClick={() => setIsCancelOpen(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          취소 모달 열기
        </button>

      </div>

      {/* 래퍼 컴포넌트들 */}
      <WarningModal
        isOpen={isWarningOpen}
        onClose={() => setIsWarningOpen(false)}
        message="내 프로필을 먼저 등록해 주세요"
      />

      <AlertModal
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        message="알림 메시지입니다."
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirm}
        message="신청을 거절하시겠어요?"
      />

      <CancelConfirmModal
        isOpen={isCancelOpen}
        onClose={() => setIsCancelOpen(false)}
        onConfirm={handleCancel}
        message="신청을 취소하시겠어요?"
      />
    </div>
  );
}