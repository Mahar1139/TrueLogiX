// pages/404.jsx
'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function NotFoundContent() {
  const searchParams = useSearchParams();
  const msg = searchParams.get('error') || 'Page not found';

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>{msg}</p>
    </div>
  );
}

export default function Custom404() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  );
}
