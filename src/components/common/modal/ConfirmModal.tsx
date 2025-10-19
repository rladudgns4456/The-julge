// src/components/common/modal/ConfirmModal.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import styles from '../styles/ConfirmModal.module.css';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  message, 
  confirmText = '예', 
  cancelText = '아니오' 
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.confirmContainer}>
          <div className={styles.iconContainer}>
            <Image src="/check.svg" alt="확인 아이콘" width={40} height={40} />
          </div>
          <p className={styles.message}>{message}</p>
          <div className={styles.buttonContainer}>
            <button onClick={onClose} className={styles.cancelButton}>
              {cancelText}
            </button>
            <button onClick={onConfirm} className={styles.confirmButton}>
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;