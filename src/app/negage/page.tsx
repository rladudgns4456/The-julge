'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">내 가게</h1>
      <p className="mb-4">내 가게 등록페이지</p>
      <Link href="/modalpage" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
        /negage
      </Link>
    </main>
  );
}
