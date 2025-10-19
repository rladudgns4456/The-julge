// src/components/common/modal/AlertModal.tsx
'use client';

import React from 'react';
import styles from '../styles/AlertModal.module.css';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.alertContainer}>
          <p className={styles.message}>{message}</p>
          <button onClick={onClose} className={styles.confirmButton}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;