"use client";

import Image from "next/image";
import Input from "@/components/common/input/Input";
import Button from "@/components/common/button";
import Modal from "@/components/common/modal/CommonModal";
import { useSignupLogic } from "@/components/login/LoginCheckList";

export default function SignupUi() {
  const {
    // 상태
    formData,
    errors,
    isLoading,
    modalState,

    // 핸들러
    handleInputChange,
    handleUserTypeChange,
    handleModalClose,
    handleDuplicateEmailConfirm,
    handleSuccessConfirm,
    handleSubmit,
    handleLoginClick,
  } = useSignupLogic();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image src="/logo.svg" alt="THE JULGE 로고" width={248} height={45} className="mx-auto" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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

          <Input
            label="비밀번호 확인"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="입력"
            error={errors.confirmPassword}
            onChange={handleInputChange}
          />

          <div>
            <label className="block text-sm font-medium text-black mb-3">회원 유형</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleUserTypeChange("employee")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full border-2 transition-all ${
                  formData.userType === "employee"
                    ? "border-red-40 bg-white text-black"
                    : "border-gray-20 bg-white text-gray-50"
                }`}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  {formData.userType === "employee" ? (
                    <Image src="/check.svg" alt="체크됨" width={24} height={24} />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-30" />
                  )}
                </div>
                <span className="font-medium">알바님</span>
              </button>

              <button
                type="button"
                onClick={() => handleUserTypeChange("employer")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full border-2 transition-all ${
                  formData.userType === "employer"
                    ? "border-red-40 bg-white text-black"
                    : "border-gray-20 bg-white text-gray-50"
                }`}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  {formData.userType === "employer" ? (
                    <Image src="/check.svg" alt="체크됨" width={24} height={24} />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-30" />
                  )}
                </div>
                <span className="font-medium">사장님</span>
              </button>
            </div>
          </div>

          <Button type="submit" variant="primary" size="large" className="w-full" disabled={isLoading}>
            {isLoading ? "가입 중..." : "가입하기"}
          </Button>
        </form>

        <div className="text-center mt-6">
          <span className="text-black">이미 가입하셨나요? </span>
          <button onClick={handleLoginClick} className="text-blue-20 underline hover:text-blue-20/80 font-medium">
            로그인하기
          </button>
        </div>
      </div>

      {/* 모달 */}
      {modalState.isOpen && modalState.type === "duplicateEmail" && (
        <Modal onClose={handleModalClose}>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black">중복된 이메일입니다</h3>
            <p className="text-gray-60">
              이미 사용 중인 이메일입니다.
              <br />
              다른 이메일로 다시 시도해주세요.
            </p>
            <div className="flex gap-2 pt-2">
              <Button variant="gray" size="medium" className="flex-1" onClick={handleModalClose}>
                닫기
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {modalState.isOpen && modalState.type === "success" && (
        <Modal onClose={handleModalClose}>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black">가입이 완료되었습니다!</h3>
            <p className="text-gray-60">로그인 화면으로 이동합니다.</p>
            <Button variant="primary" size="medium" className="w-full" onClick={handleSuccessConfirm}>
              로그인하기
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
