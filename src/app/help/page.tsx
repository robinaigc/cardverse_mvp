'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HelpPage() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const faqItems = [
    { id: 'tech1', q: 'help.faq.tech1.q', a: 'help.faq.tech1.a' },
    { id: 'tech2', q: 'help.faq.tech2.q', a: 'help.faq.tech2.a' },
    { id: 'tech3', q: 'help.faq.tech3.q', a: 'help.faq.tech3.a' },
    { id: 'account1', q: 'help.faq.account1.q', a: 'help.faq.account1.a' },
    { id: 'account2', q: 'help.faq.account2.q', a: 'help.faq.account2.a' },
    { id: 'account3', q: 'help.faq.account3.q', a: 'help.faq.account3.a' },
    { id: 'license1', q: 'help.faq.license1.q', a: 'help.faq.license1.a' },
    { id: 'license2', q: 'help.faq.license2.q', a: 'help.faq.license2.a' },
    { id: 'license3', q: 'help.faq.license3.q', a: 'help.faq.license3.a' },
    { id: 'payment1', q: 'help.faq.payment1.q', a: 'help.faq.payment1.a' },
    { id: 'payment2', q: 'help.faq.payment2.q', a: 'help.faq.payment2.a' },
    { id: 'payment3', q: 'help.faq.payment3.q', a: 'help.faq.payment3.a' },
  ];

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

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* 标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('help.title')}</h1>
        </div>

        {/* 快速入门 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">1. {t('help.gettingStarted.title')}</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">1.1 {t('help.gettingStarted.browse.title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('help.gettingStarted.browse.content')}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">1.2 {t('help.gettingStarted.detail.title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('help.gettingStarted.detail.content')}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">1.3 {t('help.gettingStarted.editor.title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('help.gettingStarted.editor.content')}</p>
            </div>
          </div>
        </section>

        {/* 账户与会员 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">2. {t('help.account.title')}</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">2.1 {t('help.account.register.title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('help.account.register.content')}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">2.2 {t('help.account.membership.title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('help.account.membership.content')}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">2.3 {t('help.account.upgrade.title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('help.account.upgrade.content')}</p>
            </div>
          </div>
        </section>

        {/* 下载与授权 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">3. {t('help.download.title')}</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">3.1 {t('help.download.how.title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('help.download.how.content')}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">3.2 {t('help.download.license.title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('help.download.license.content')}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">3.3 {t('help.download.file.title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('help.download.file.content')}</p>
            </div>
          </div>
        </section>

        {/* 常见问题 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">4. {t('help.faq.title')}</h2>
          
          <div className="space-y-4">
            {faqItems.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{t(item.q)}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === item.id ? 'transform rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === item.id && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed">{t(item.a)}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 使用规范 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">5. {t('help.guidelines.title')}</h2>
          
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">5.1 {t('help.guidelines.content.title')}</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>{t('help.guidelines.content.allowed')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">✗</span>
                  <span>{t('help.guidelines.content.prohibited')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">ℹ</span>
                  <span>{t('help.guidelines.content.copyright')}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 联系我们 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">6. {t('help.contact.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">6.1 {t('help.contact.support.title')}</h3>
              <p className="text-gray-600 mb-2">{t('help.contact.support.email')}</p>
              <p className="text-gray-600 text-sm">{t('help.contact.support.time')}</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">6.2 {t('help.contact.feedback.title')}</h3>
              <p className="text-gray-600">{t('help.contact.feedback.content')}</p>
            </div>
          </div>
          
          <div className="mt-6 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">6.3 {t('help.contact.social.title')}</h3>
            <p className="text-gray-600">{t('help.contact.social.content')}</p>
          </div>
        </section>
      </div>
    </div>
  );
}

