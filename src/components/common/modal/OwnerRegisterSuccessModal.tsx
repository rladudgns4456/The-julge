'use client';

import Modal from '@/components/common/modal/CommonModal';
import Button from '@/components/common/button';

interface OwnerRegisterSuccessModalProps {
  onClose: () => void;
  onGoNotice: () => void;
  onGoOwner: () => void;
}

export default function OwnerRegisterSuccessModal({ onClose, onGoNotice, onGoOwner }: OwnerRegisterSuccessModalProps) {
  return (
    <Modal onClose={onClose}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-black">가게 정보 등록이 완료되었습니다</h3>
        <p className="text-gray-60">다음 작업을 선택해 주세요.</p>
        <div className="flex gap-2 pt-2">
          <Button variant="outlined" size="medium" className="flex-1" onClick={onGoOwner}>
            내 가게
          </Button>
          <Button variant="primary" size="medium" className="flex-1" onClick={onGoNotice}>
            공고 등록
          </Button>
        </div>
      </div>
    </Modal>
  );
}