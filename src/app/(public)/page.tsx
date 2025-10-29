import { Suspense } from 'react';
import MasonryGrid from '@/components/MasonryGrid';
import Sidebar from '@/components/Sidebar';
import SearchBar from '@/components/SearchBar';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 左侧导航栏 */}
      <Sidebar />
      
      {/* 主内容区域 */}
      <div className="ml-64 p-6">
        {/* 搜索栏 */}
        <div className="mb-8">
          <SearchBar />
        </div>
        
        {/* 瀑布流展示区域 */}
        <Suspense fallback={<div className="text-center py-8">加载中...</div>}>
          <MasonryGrid />
        </Suspense>
      </div>
    </div>
  );
}
