
'use client';

import React from 'react';
import Image from 'next/image';
import styles from '../styles/CommonModal.module.css';

// 모달 타입 정의
export type ModalType = 'alert' | 'warning' | 'confirm' | 'cancelConfirm';

// 공통 모달 Props 인터페이스
interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type: ModalType;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

/**
 * 통합 공통 모달 컴포넌트 (CommonModal)
 *
 * @param isOpen - 모달 표시 여부
 * @param onClose - 모달 닫기 함수
 * @param message - 모달에 표시할 메시지
 * @param type - 모달 타입 ('alert', 'warning', 'confirm', 'cancelConfirm')
 * @param onConfirm - 확인 버튼 클릭 시 실행할 함수 (confirm, cancelConfirm 타입에서만 사용)
 * @param confirmText - 확인 버튼 텍스트 (기본값: 타입에 따라 다름)
 * @param cancelText - 취소 버튼 텍스트 (기본값: '아니오')
 */
const CommonModal: React.FC<CommonModalProps> = ({
  isOpen,
  onClose,
  message,
  type,
  onConfirm,
  confirmText,
  cancelText = '아니오',
}) => {
  // 모달이 열려있지 않으면 null 반환
  if (!isOpen) return null;

  // 타입별 기본 확인 버튼 텍스트 설정
  const getDefaultConfirmText = () => {
    switch (type) {
      case 'confirm':
        return '예';
      case 'cancelConfirm':
        return '취소하기';
      default:
        return '확인';
    }
  };

  // 사용자 지정 확인 버튼 텍스트 또는 기본 텍스트 사용
  const finalConfirmText = confirmText || getDefaultConfirmText();

  // 타입별 아이콘 경로 설정
  const getIconPath = () => {
    switch (type) {
      case 'warning':
        return '/warning-icon.svg';
      case 'confirm':
      case 'cancelConfirm':
        return '/check.svg';
      default:
        return '';
    }
  };

  // 타입별 아이콘 대체 텍스트 설정
  const getIconAlt = () => {
    switch (type) {
      case 'warning':
        return '경고 아이콘';
      case 'confirm':
      case 'cancelConfirm':
        return '확인 아이콘';
      default:
        return '';
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.contentContainer}>
          {/* 아이콘 표시 (warning, confirm, cancelConfirm 타입에서만) */}
          {(type === 'warning' || type === 'confirm' || type === 'cancelConfirm') && (
            <div className={styles.iconContainer}>
              <Image src={getIconPath()} alt={getIconAlt()} width={40} height={40} />
            </div>
          )}

          {/* 메시지 */}
          <p className={styles.message}>{message}</p>

          {/* 버튼 영역 */}
          {type === 'confirm' || type === 'cancelConfirm' ? (
            // confirm, cancelConfirm 타입: 두 개의 버튼 표시
            <div className={styles.buttonContainer}>
              <button onClick={onClose} className={styles.cancelButton}>
                {cancelText}
              </button>
              <button onClick={onConfirm} className={styles.confirmButton}>
                {finalConfirmText}
              </button>
            </div>
          ) : (
            // alert, warning 타입: 한 개의 버튼만 표시
            <button onClick={onClose} className={styles.singleButton}>
              {finalConfirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommonModal;

// 기존 모달 컴포넌트와의 호환성을 위한 래퍼 컴포넌트들

/**
 * 경고 모달 컴포넌트 (WarningModal)
 */
export const WarningModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  message: string;
}> = ({ isOpen, onClose, message }) => {
  return (
    <CommonModal isOpen={isOpen} onClose={onClose} message={message} type="warning" />
  );
};

/**
 * 알림 모달 컴포넌트 (AlertModal)
 */
export const AlertModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  message: string;
}> = ({ isOpen, onClose, message }) => {
  return <CommonModal isOpen={isOpen} onClose={onClose} message={message} type="alert" />;
};

/**
 * 확인 모달 컴포넌트 (ConfirmModal)
 */
export const ConfirmModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  confirmText?: string;
  cancelText?: string;
}> = ({ isOpen, onClose, onConfirm, message, confirmText, cancelText }) => {
  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      message={message}
      type="confirm"
      confirmText={confirmText}
      cancelText={cancelText}
    />
  );
};

/**
 * 취소 모달 컴포넌트 (CancelConfirmModal)
 */
export const CancelConfirmModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  confirmText?: string;
  cancelText?: string;
}> = ({ isOpen, onClose, onConfirm, message, confirmText, cancelText }) => {
  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      message={message}
      type="cancelConfirm"
      confirmText={confirmText}
      cancelText={cancelText}
    />
  );
};
