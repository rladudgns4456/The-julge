'use client';

import { useRef, useState } from 'react';
import { REGION_OPTIONS, CATEGORY_OPTIONS } from '@/constants/options';
import Modal from '@/components/common/modal/CommonModal';
import Button from '@/components/common/button';
import { postShop } from '@/api/shop/ShopApi';
import OwnerRegisterSuccessModal from '@/components/common/modal/OwnerRegisterSuccessModal';

export default function OwnerRegisterInfoPage() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [region, setRegion] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [description, setDescription] = useState('');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const openFilePicker = () => fileInputRef.current?.click();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setName('');
    setCategory('');
    setRegion('');
    setAddressDetail('');
    setDescription('');
    setImageFile(null);
    setImagePreview(null);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !category || !region || !addressDetail) {
      setAlertMsg('필수 항목(*)을 모두 입력해 주세요.');
      setAlertOpen(true);
      return;
    }

    setLoading(true);
    try {
      const body = {
        name,
        category,
        address1: region,
        address2: addressDetail,
        description,
        imageUrl: imagePreview || '/placeholder-shop.svg',
        originalHourlyPay: 0,
      };

      await postShop(body);
      // 등록 성공: 성공 모달 오픈
      setSuccessOpen(true);
      setAlertMsg('');
      setAlertOpen(false);
      resetForm();
      setAlertMsg('가게 정보가 등록되었습니다.');
      setAlertOpen(true);
      resetForm();
    } catch (err) {
      const message = err instanceof Error ? err.message : '등록 중 오류가 발생했습니다.';
      setAlertMsg(message);
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-5">
      <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">가게 정보</h1>
        <button
          type="button"
          className="text-gray-500 hover:text-black text-xl"
          onClick={resetForm}
          aria-label="reset"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 상단 필드: 2열 반응형 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">가게 이름*</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="입력"
              className="w-full rounded border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">분류*</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded border border-gray-300 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">선택</option>
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">주소*</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full rounded border border-gray-300 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">선택</option>
              {REGION_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">상세 주소*</label>
            <input
              type="text"
              value={addressDetail}
              onChange={(e) => setAddressDetail(e.target.value)}
              placeholder="입력"
              className="w-full rounded border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* 이미지 업로드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">가게 이미지</label>
            <div
              className="relative h-64 border border-gray-300 rounded-md flex items-center justify-center overflow-hidden"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="미리보기" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center text-gray-500">
                  <div className="text-3xl mb-2">📷</div>
                  <p className="mb-2">이미지 추가하기</p>
                  <p className="text-xs">PNG, JPG, JPEG 지원</p>
                </div>
              )}

              <button
                type="button"
                className="absolute bottom-3 right-3 px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
                onClick={openFilePicker}
              >
                파일 선택
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div className="hidden md:block"></div>
        </div>

        {/* 설명 */}
        <div>
          <label className="block text-sm font-medium mb-2">가게 설명</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="입력"
            className="w-full rounded border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* 등록하기 버튼 */}
        <div className="pt-2">

          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-48 mx-auto block bg-orange-600 text-white rounded py-3 font-semibold hover:bg-orange-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? '등록 중...' : '등록하기'}
          </button>
        </div>
      </form>

      {/* 제출 결과 알림 (오류 등 단일 확인 모달) */}
      {alertOpen && (
        <Modal onClose={() => setAlertOpen(false)}>
          <p className="text-lg font-normal mb-6">{alertMsg}</p>
          <Button
            variant="primary"
            size="medium"
            className="w-full"
            onClick={() => setAlertOpen(false)}
          >
            확인
          </Button>
        </Modal>
      )}

      {/* 등록 성공 모달 */}
      {successOpen && (
        <OwnerRegisterSuccessModal
          onClose={() => setSuccessOpen(false)}
          onGoNotice={() => (window.location.href = '/owner/register_Notice')}
          onGoOwner={() => (window.location.href = '/owner')}
        />
      )}
    </div>
    </div>
  );
}