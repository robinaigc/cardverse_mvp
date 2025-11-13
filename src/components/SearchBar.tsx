'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();

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
    <div className="w-full">
      {/* 主搜索框 - 通长布局 */}
      <form onSubmit={handleSearch} className="relative">
        <div className="flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gray-300 text-gray-800 rounded-r-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {t('search.button')}
          </button>
        </div>
      </form>
      
      {/* 高级搜索按钮 */}
      <div className="mt-2 text-right">
        <button
          onClick={handleAdvancedSearch}
          className="text-sm text-gray-600 hover:text-gray-700"
        >
          {showAdvanced ? t('search.collapse') : t('search.advanced')}
        </button>
      </div>
      
      {/* 高级搜索面板 */}
      {showAdvanced && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('search.series')}
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500">
                <option value="">{t('search.allSeries')}</option>
                <option value="chinese">{t('sidebar.category.chinese')}</option>
                <option value="architecture">{t('sidebar.category.architecture')}</option>
                <option value="texture">{t('sidebar.category.texture')}</option>
                <option value="city">{t('sidebar.category.city')}</option>
                <option value="nature">{t('sidebar.category.nature')}</option>
                <option value="ai-lab">{t('sidebar.category.aiLab')}</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('search.style')}
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500">
                <option value="">{t('search.allStyles')}</option>
                <option value="minimal">Minimal</option>
                <option value="illustration">Illustration</option>
                <option value="photo">Photo</option>
                <option value="abstract">Abstract</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('search.color')}
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500">
                <option value="">{t('search.allColors')}</option>
                <option value="black">Black</option>
                <option value="white">White</option>
                <option value="blue">Blue</option>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => setShowAdvanced(false)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {t('search.cancel')}
            </button>
            <button
              onClick={() => {
                // TODO: 实现高级搜索逻辑
                console.log('Advanced search');
              }}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              {t('search.button')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
