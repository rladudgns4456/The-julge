import { Suspense } from "react";
import RegisterShopClient from "./RegisterShopClient";

export default function RegisterShopPage() {
  return (
    <Suspense fallback={<p>가게 등록 페이지를 불러오는 중...</p>}>
      <RegisterShopClient />
    </Suspense>
  );
}
