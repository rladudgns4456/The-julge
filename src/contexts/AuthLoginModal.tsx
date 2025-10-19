"use client";

import { createRoot } from "react-dom/client";
import Button from "@/components/common/button";

export class AuthLoginModal {
  static showTokenExpiredModal(): void {
    // 모달 중복표시 방지
    if (document.getElementById("token-expired-modal")) {
      return;
    }

    const modalContainer = document.createElement("div");
    modalContainer.id = "token-expired-modal";
    document.body.appendChild(modalContainer);

    const root = createRoot(modalContainer);
    root.render(
      <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg w-[320px] text-center relative">
          <div className="space-y-4">
            <p className="text-black">로그인 세션이 만료되었습니다.</p>
            <Button
              variant="primary"
              size="medium"
              className="w-full"
              onClick={() => {
                root.unmount();
                document.body.removeChild(modalContainer);
                window.location.href = "/login";
              }}
            >
              확인
            </Button>
          </div>
        </div>
      </div>,
    );
  }

  static removeModal(): void {
    const modalContainer = document.getElementById("token-expired-modal");
    if (modalContainer) {
      modalContainer.remove();
    }
  }
}
