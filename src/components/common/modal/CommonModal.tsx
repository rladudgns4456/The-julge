/* 테스트 모달입니다. */

import React from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[320px] text-center relative">
        {children}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl">
          ×
        </button>
      </div>
    </div>
  );
}

/* 테스트 모달입니다. */
