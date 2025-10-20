"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Input from "@/components/common/input/Input";
import Button from "@/components/common/button";
import Modal from "@/components/common/modal/CommonModal";
import { useForm } from "@/hooks/useForm";
import { BaseFormData } from "@/hooks/useFormData";
import { BaseErrors } from "@/hooks/useFormValidation";
import { AuthLoginApi } from "@/contexts/AuthLoginApi";
import { User } from "@/types/user";
import { RouterProvider } from "@/contexts/AuthLoginModal";

export default function LoginUi() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 전역 상태 관리
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 모달 상태 관리
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // 토큰 만료 모달 상태 관리
  const [showTokenExpiredModal, setShowTokenExpiredModal] = useState(false);

  useEffect(() => {
    const unsubscribe = AuthLoginApi.subscribe(user => {
      setCurrentUser(user);
    });

    // 컴포넌트 마운트 시 저장된 사용자 정보 복원
    AuthLoginApi.restoreUserFromStorage();

    return unsubscribe;
  }, []);

  // URL 파라미터 체크, 토큰 만료시 모달 안내
  useEffect(() => {
    const reason = searchParams.get("reason");
    if (reason === "token-expired") {
      setShowTokenExpiredModal(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (currentUser) {
      router.push("/jobs");
    }
  }, [currentUser, router]);

  const {
    formData,
    errors,
    handleInputChange: baseHandleInputChange,
    validateLoginForm,
  } = useForm<BaseFormData, BaseErrors>(
    {
      email: "",
      password: "",
    },
    {
      email: "",
      password: "",
    },
  );

  const handleModalClose = () => {
    setShowModal(false);
    setModalMessage("");
  };

  const handleTokenExpiredModalClose = () => {
    setShowTokenExpiredModal(false);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete("reason");
    window.history.replaceState({}, "", newUrl.toString());
  };

  // 폼 입력
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    baseHandleInputChange(e);

    if (showModal) {
      setShowModal(false);
    }
  };

  // 폼 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (showModal) {
      setShowModal(false);
    }

    // 공통 유효성 검사
    if (!validateLoginForm()) return;
    setIsLoading(true);

    try {
      const result = await AuthLoginApi.executeLogin(formData.email, formData.password);

      if (result.success) {
      } else {
        // 에러 메시지 모달
        setModalMessage(result.message);
        setShowModal(true);
      }
    } catch (error) {
      setModalMessage("로그인 중 오류가 발생했습니다.");
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupClick = () => {
    router.push("/signup");
  };

  return (
    <RouterProvider>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/jobs">
              <Image src="/logo.svg" alt="THE JULGE 로고" width={248} height={45} className="mx-auto cursor-pointer" />
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="이메일"
              type="email"
              name="email"
              value={formData.email}
              placeholder="입력"
              error={errors.email}
              onChange={handleInputChange}
            />

            <Input
              label="비밀번호"
              type="password"
              name="password"
              value={formData.password}
              placeholder="입력"
              error={errors.password}
              onChange={handleInputChange}
            />
            <Button type="submit" variant="primary" size="large" className="w-full" disabled={isLoading}>
              {isLoading ? "로그인 중..." : "로그인 하기"}
            </Button>
          </form>

          <div className="text-center mt-6">
            <span className="text-black text-sm">회원이 아니신가요? </span>
            <Link href="/signup">
              <button
                onClick={handleSignupClick}
                className="text-blue-20 hover:text-blue-20/80 underline font-medium text-sm"
              >
                회원가입 하기
              </button>
            </Link>
          </div>
        </div>

        {showModal && (
          <Modal onClose={handleModalClose}>
            <div className="space-y-4">
              <p className="text-black">{modalMessage}</p>
              <Button onClick={handleModalClose} variant="primary" size="medium" className="w-full">
                확인
              </Button>
            </div>
          </Modal>
        )}

        {showTokenExpiredModal && (
          <Modal onClose={handleTokenExpiredModalClose}>
            <div className="space-y-4">
              <p className="text-black">로그인 세션이 만료되었습니다.</p>
              <Button onClick={handleTokenExpiredModalClose} variant="primary" size="medium" className="w-full">
                확인
              </Button>
            </div>
          </Modal>
        )}
      </div>
    </RouterProvider>
  );
}
