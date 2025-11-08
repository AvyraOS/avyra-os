"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import ResultsPage from '@/components/landing/ResultsPage';

// Loading component for Suspense
function LoadingResults() {
  return (
    <div className="text-white h-screen w-screen overflow-hidden relative flex flex-col items-center justify-center">
      <div className="animate-pulse">
        <div className="w-32 h-8 bg-white/20 rounded mb-8"></div>
        <div className="w-96 h-12 bg-white/20 rounded mb-4"></div>
        <div className="w-80 h-6 bg-white/20 rounded mb-8"></div>
        <div className="space-y-3">
          <div className="w-72 h-4 bg-white/20 rounded"></div>
          <div className="w-72 h-4 bg-white/20 rounded"></div>
          <div className="w-72 h-4 bg-white/20 rounded"></div>
        </div>
      </div>
    </div>
  );
}

function ResultsContent() {
  const searchParams = useSearchParams();
  
  // Parse data from URL parameters (now simplified to score and segment)
  const formData = {
    score: searchParams.get('score') || '0',
    segment: searchParams.get('segment') || 'foundation-builder',
    name: searchParams.get('name') || undefined,
    email: searchParams.get('email') || undefined
  };

  return <ResultsPage formData={formData} />;
}

export default function Results() {
  return (
    <Suspense fallback={<LoadingResults />}>
      <ResultsContent />
    </Suspense>
  );
} 