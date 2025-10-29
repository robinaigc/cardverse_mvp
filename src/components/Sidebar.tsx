'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Sidebar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const categories = [
    { id: 'free', name: '免费系列', href: '/?series=free' },
    { id: 'architecture', name: '建筑系列', href: '/?series=architecture' },
    { id: 'city', name: '城市系列', href: '/?series=city' },
    { id: 'gods', name: '诸神系列', href: '/?series=gods' },
    { id: 'chinese', name: '国风系列', href: '/?series=chinese' },
    { id: 'ai-lab', name: 'AI实验室', href: '/?series=ai-lab' }
  ];

  const bottomButtons = [
    { id: 'language', name: '中英文切换', href: '#' },
    { id: 'pricing', name: '价格', href: '/pricing' },
    { id: 'help', name: '帮助', href: '#' }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-96 bg-white border-r border-gray-200 z-50">
      <div className="p-6">
        {/* Logo 区域 */}
        <div className="mb-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-700 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <h1 className="text-lg font-bold text-gray-900">卡片宇宙</h1>
            <p className="text-sm text-gray-600">Cardverse</p>
          </div>
        </div>
        
        {/* 分类导航 */}
        <nav className="mb-8">
          <h2 className="text-sm font-medium text-gray-600 mb-4">分类浏览</h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={category.href}
                  className="block w-full px-4 py-2 text-sm text-gray-800 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 hover:border-gray-300 transition-colors"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* 底部功能按钮 */}
        <div className="space-y-2">
          {bottomButtons.map((button) => (
            <Link
              key={button.id}
              href={button.href}
              className="block w-full px-4 py-2 text-sm text-gray-800 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 hover:border-gray-300 transition-colors"
            >
              {button.name}
            </Link>
          ))}
        </div>
        
        {/* 用户区域 */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          {isLoggedIn ? (
            <div className="space-y-2">
              <Link
                href="/account"
                className="block w-full px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {userName || '个人中心'}
              </Link>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="block w-full px-4 py-2 text-sm text-gray-800 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors"
              >
                退出登录
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                href="/auth/signup"
                className="block w-full px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                注册
              </Link>
              <Link
                href="/auth/signin"
                className="block w-full px-4 py-2 text-sm font-medium text-gray-800 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors"
              >
                登录
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
