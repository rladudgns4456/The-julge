import { Suspense } from "react";
import LoginUi from "@/components/login/LoginUi";

export default function LoginPage() {
  return (
    <Suspense fallback={<p>로그인 페이지를 불러오는 중...</p>}>
      <LoginUi />
    </Suspense>
  );
}
