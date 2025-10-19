// src/components/common/modal/WarningModal.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import styles from '../styles/WarningModal.module.css';

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const WarningModal: React.FC<WarningModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.warningContainer}>
          <div className={styles.iconContainer}>
            <Image src="/warning-icon.svg" alt="경고 아이콘" width={40} height={40} />
          </div>
          <p className={styles.message}>{message}</p>
          <button onClick={onClose} className={styles.confirmButton}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;