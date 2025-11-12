'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { auth } from '@/lib/auth';
import type { User } from '@/lib/auth';

export default function Sidebar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { t, language, toggleLanguage } = useLanguage();

  // 检查当前用户并监听认证状态变化
  useEffect(() => {
    let mounted = true;

    // 检查当前用户
    auth.getCurrentUser().then((currentUser) => {
      if (mounted && currentUser) {
        setUser(currentUser);
        setIsLoggedIn(true);
      }
    });

    // 监听认证状态变化
    try {
      const { data: { subscription } } = auth.getAuthStateSubscription((currentUser) => {
        if (mounted) {
          setUser(currentUser);
          setIsLoggedIn(!!currentUser);
        }
      });

      return () => {
        mounted = false;
        if (subscription) {
          subscription.unsubscribe();
        }
      };
    } catch (error) {
      console.error('Failed to set up auth state subscription:', error);
      return () => {
        mounted = false;
      };
    }
  }, []);

  const categories = [
    { id: 'free', name: t('sidebar.category.free'), href: '/?series=free' },
    { id: 'architecture', name: t('sidebar.category.architecture'), href: '/?series=architecture' },
    { id: 'city', name: t('sidebar.category.city'), href: '/?series=city' },
    { id: 'gods', name: t('sidebar.category.gods'), href: '/?series=gods' },
    { id: 'chinese', name: t('sidebar.category.chinese'), href: '/?series=chinese' },
    { id: 'ai-lab', name: t('sidebar.category.aiLab'), href: '/?series=ai-lab' }
  ];

  const bottomButtons = [
    { id: 'pricing', name: t('sidebar.button.pricing'), href: '/pricing' },
    { id: 'help', name: t('sidebar.button.help'), href: '#' }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-96 bg-white border-r border-gray-200 z-50">
      <div className="p-6">
        {/* Logo 区域 */}
        <div className="mb-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Cardverse Logo" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  // 如果PNG不存在，尝试SVG
                  const target = e.target as HTMLImageElement;
                  if (target.src.includes('.png')) {
                    target.src = '/logo.svg';
                  }
                }}
              />
            </div>
            <h1 className="text-lg font-bold text-gray-900 mb-1">{t('sidebar.logo.title')}</h1>
            <p className="text-sm text-gray-600">Cardverse</p>
          </div>
        </div>
        
        {/* 分类导航 */}
        <nav className="mb-8">
          <h2 className="text-sm font-medium text-gray-600 mb-4">{t('sidebar.categories.title')}</h2>
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
          {/* 语言切换按钮 */}
          <button
            onClick={toggleLanguage}
            className="block w-full px-4 py-2 text-sm text-gray-800 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 hover:border-gray-300 transition-colors text-left"
          >
            中文/EN
          </button>
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
                {user?.nickname || user?.email || t('sidebar.user.center')}
              </Link>
              <button
                onClick={async () => {
                  await auth.signOut();
                  setIsLoggedIn(false);
                  setUser(null);
                  router.refresh();
                }}
                className="block w-full px-4 py-2 text-sm text-gray-800 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {t('sidebar.user.logout')}
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                href="/auth/signup"
                className="block w-full px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {t('sidebar.user.signup')}
              </Link>
              <Link
                href="/auth/signin"
                className="block w-full px-4 py-2 text-sm font-medium text-gray-800 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {t('sidebar.user.signin')}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
