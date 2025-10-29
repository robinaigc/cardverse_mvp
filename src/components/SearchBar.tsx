'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleAdvancedSearch = () => {
    setShowAdvanced(!showAdvanced);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* 主搜索框 */}
      <form onSubmit={handleSearch} className="relative">
        <div className="flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索卡片、标签、作者..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gray-300 text-gray-800 rounded-r-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            搜索
          </button>
        </div>
      </form>
      
      {/* 高级搜索按钮 */}
      <div className="mt-2 text-right">
        <button
          onClick={handleAdvancedSearch}
          className="text-sm text-gray-600 hover:text-gray-700"
        >
          {showAdvanced ? '收起' : '高级搜索'}
        </button>
      </div>
      
      {/* 高级搜索面板 */}
      {showAdvanced && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                系列
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500">
                <option value="">全部系列</option>
                <option value="free">免费系列</option>
                <option value="architecture">建筑系列</option>
                <option value="city">城市系列</option>
                <option value="gods">诸神系列</option>
                <option value="chinese">国风系列</option>
                <option value="ai-lab">AI实验室</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                风格
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500">
                <option value="">全部风格</option>
                <option value="minimal">极简</option>
                <option value="illustration">插画</option>
                <option value="photo">摄影</option>
                <option value="abstract">抽象</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                色系
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500">
                <option value="">全部色系</option>
                <option value="black">黑色</option>
                <option value="white">白色</option>
                <option value="blue">蓝色</option>
                <option value="red">红色</option>
                <option value="green">绿色</option>
                <option value="yellow">黄色</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => setShowAdvanced(false)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              取消
            </button>
            <button
              onClick={() => {
                // TODO: 实现高级搜索逻辑
                console.log('Advanced search');
              }}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              搜索
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
