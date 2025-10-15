/* 테스트 모달입니다. */
"use client";

import React from "react";
import styles from "../styles/CommonModal.module.css";

// 컴포넌트가 받을 props 타입
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode; // 모달 내부에 표시될 모든 React 요소
}

const CommonModal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  // isOpen이 false이면 아무것도 렌더링하지 않음
  if (!isOpen) {
    return null;
  }

  return (
    // 모달배경(오버레이) 클릭시 CLOSE
    <div className={styles.modalOverlay} onClick={onClose}>
      {/* 실제 모달 창 (클릭해도 동작않함) */}
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <button onClick={onClose} className={styles.closeButton}>
            &times;
          </button>
        </div>
        <div className={styles.modalBody}>
          {children} {/* 부모에게서 받은 컨텐츠를 여기에 보여줘요! */}
        </div>
      </div>
    </div>
  );
};

export default CommonModal;

/* 테스트 모달입니다. */
