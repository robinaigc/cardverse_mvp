'use client';

import { Suspense } from 'react';
import MasonryGrid from '@/components/MasonryGrid';
import Sidebar from '@/components/Sidebar';
import SearchBar from '@/components/SearchBar';
import { useLanguage } from '@/contexts/LanguageContext';

function LoadingFallback() {
  const { t } = useLanguage();
  return <div className="text-center py-8">{t('home.loading')}</div>;
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 左侧导航栏 */}
      <Sidebar />
      
      {/* 主内容区域 */}
      <div className="ml-96 p-6">
        {/* 搜索栏 */}
        <div className="mb-8">
          <SearchBar />
        </div>
        
        {/* 瀑布流展示区域 */}
        <Suspense fallback={<LoadingFallback />}>
          <MasonryGrid />
        </Suspense>
      </div>
    </div>
  );
}
