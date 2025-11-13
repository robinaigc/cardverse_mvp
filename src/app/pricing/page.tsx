'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PricingPage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-white">
      {/* 返回按钮 */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4">
        <Link 
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t('card.back')}
        </Link>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('pricing.title')}</h1>
          <p className="text-xl text-gray-600">{t('pricing.subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 游客 */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">{t('pricing.visitor.title')}</h3>
            <div className="text-3xl font-bold mb-4">{t('pricing.visitor.price')}</div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                {t('pricing.visitor.browse')}
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                {t('pricing.visitor.favorite')}
              </li>
              <li className="flex items-center">
                <span className="text-red-500 mr-2">✗</span>
                {t('pricing.visitor.hdDownload')}
              </li>
              <li className="flex items-center">
                <span className="text-red-500 mr-2">✗</span>
                {t('pricing.visitor.commercial')}
              </li>
            </ul>
            <button className="w-full py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              {t('pricing.visitor.current')}
            </button>
          </div>
          
          {/* 个人会员 */}
          <div className="border-2 border-blue-500 rounded-lg p-6 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">{t('pricing.personal.recommended')}</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">{t('pricing.personal.title')}</h3>
            <div className="text-3xl font-bold mb-4">¥29<span className="text-lg text-gray-500">{t('pricing.personal.price')}</span></div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                {t('pricing.personal.hdDownload')}
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                {t('pricing.personal.personalLicense')}
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                {t('pricing.personal.noWatermark')}
              </li>
              <li className="flex items-center">
                <span className="text-red-500 mr-2">✗</span>
                {t('pricing.visitor.commercial')}
              </li>
            </ul>
            <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              {t('pricing.personal.subscribe')}
            </button>
          </div>
          
          {/* 商业会员 */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">{t('pricing.business.title')}</h3>
            <div className="text-3xl font-bold mb-4">¥99<span className="text-lg text-gray-500">{t('pricing.personal.price')}</span></div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                {t('pricing.business.batchDownload')}
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                {t('pricing.business.commercialLicense')}
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                {t('pricing.business.apiAccess')}
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                {t('pricing.business.prioritySupport')}
              </li>
            </ul>
            <button className="w-full py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
              {t('pricing.personal.subscribe')}
            </button>
          </div>
        </div>
        
        {/* 授权说明 */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">{t('pricing.license.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3">{t('pricing.license.personal.title')}</h3>
              <p className="text-gray-600">
                {t('pricing.license.personal.description')}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">{t('pricing.license.commercial.title')}</h3>
              <p className="text-gray-600">
                {t('pricing.license.commercial.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
