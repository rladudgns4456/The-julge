'use client';

import { useEffect, useRef, useState } from 'react';
import { REGION_OPTIONS, CATEGORY_OPTIONS } from '@/constants/options';
import Modal from '@/components/common/modal/CommonModal';
import Button from '@/components/common/button';
import { putShop } from '@/api/shop/ShopApi';
import instance from '@/api/axios';

export default function OwnerNegageEditPage() {
  const [shopId, setShopId] = useState<string>('');

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [region, setRegion] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [description, setDescription] = useState('');
  const [originalHourlyPay, setOriginalHourlyPay] = useState<string>('');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 클라이언트에서만 실행되도록 보호
    const loadShop = async () => {
      try {
        const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
        if (!userId) return;

        const res = await instance.get(`/users/${userId}`);
        const userData = (res as any).data?.item || (res as any).data; // 다양한 응답 형태 대비
        const shopData = userData?.shop?.item || userData?.shop;
        if (!shopData) return;

        setShopId(shopData.id);
        setName(shopData.name || '');
        setCategory(shopData.category || '');
        setRegion(shopData.address1 || '');
        setAddressDetail(shopData.address2 || '');
        setDescription(shopData.description || '');
        setOriginalHourlyPay(String(shopData.originalHourlyPay ?? ''));
        setImagePreview(shopData.imageUrl || null);
      } catch (err) {
        console.error('가게 정보 불러오기 실패:', err);
      }
    };

    loadShop();
  }, []);

  const openFilePicker = () => fileInputRef.current?.click();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !category || !region || !addressDetail) {
      setAlertMsg('필수 항목(*)을 모두 입력해 주세요.');
      setAlertOpen(true);
      return;
    }

    if (!shopId) {
      setAlertMsg('가게 정보를 불러오지 못했습니다. 다시 시도해 주세요.');
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
        originalHourlyPay: Number(originalHourlyPay) || 0,
      };

      await putShop(shopId, body);
      // 수정 성공 알림
      setAlertMsg('수정이 완료되었습니다.');
      setAlertOpen(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : '수정 중 오류가 발생했습니다.';
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
          {/* 리셋 버튼은 편집 페이지이므로 초기화 기능만 제공 */}
          <button
            type="button"
            className="text-gray-500 hover:text-black text-xl"
            onClick={() => {
              setName('');
              setCategory('');
              setRegion('');
              setAddressDetail('');
              setDescription('');
              setOriginalHourlyPay('');
              setImageFile(null);
              setImagePreview(null);
            }}
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

          {/* 기본 시급 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">기본 시급</label>
              <div className="relative">
                <input
                  type="number"
                  value={originalHourlyPay}
                  onChange={(e) => setOriginalHourlyPay(e.target.value)}
                  placeholder="0"
                  className="w-full rounded border border-gray-300 p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">원</span>
              </div>
            </div>
            <div className="hidden md:block"></div>
          </div>

          {/* 이미지 업로드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">가게 이미지</label>
              <div
                className="relative h-64 border border-gray-300 rounded-md flex items-center justify-center overflow-hidden"
              >
                {imagePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imagePreview} alt="미리보기" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-gray-500">
                    <div className="text-3xl mb-2">📷</div>
                    <p className="mb-2">이미지 변경하기</p>
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

          {/* 완료하기 버튼 */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-48 mx-auto block bg-orange-600 text-white rounded py-3 font-semibold hover:bg-orange-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? '수정 중...' : '완료하기'}
            </button>
          </div>
        </form>

        {/* 알림 모달 */}
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
      </div>
    </div>
  );
}