'use client';

import { useLanguage } from '@/contexts/LanguageContext';

interface LicenseBadgeProps {
  licenseType: 'personal' | 'commercial' | 'enterprise';
  className?: string;
}

export default function LicenseBadge({ licenseType, className = '' }: LicenseBadgeProps) {
  const { t } = useLanguage();
  
  const getLicenseInfo = (type: string) => {
    switch (type) {
      case 'personal':
        return {
          label: t('license.personal.label'),
          description: t('license.personal.description'),
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: '👤'
        };
      case 'commercial':
        return {
          label: t('license.commercial.label'),
          description: t('license.commercial.description'),
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: '💼'
        };
      case 'enterprise':
        return {
          label: t('license.enterprise.label'),
          description: t('license.enterprise.description'),
          color: 'bg-purple-100 text-purple-800 border-purple-200',
          icon: '🏢'
        };
      default:
        return {
          label: t('license.unknown.label'),
          description: t('license.unknown.description'),
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: '❓'
        };
    }
  };

  const info = getLicenseInfo(licenseType);

  return (
    <div className={`border rounded-lg p-4 ${info.color} ${className}`}>
      <div className="flex items-start gap-3">
        <span className="text-lg">{info.icon}</span>
        <div className="flex-1">
          <h3 className="font-semibold mb-1">{info.label}</h3>
          <p className="text-sm opacity-80">{info.description}</p>
          
          {/* 授权条款 */}
          <div className="mt-3 text-xs opacity-70">
            <p>• {t('license.terms.noRedistribution')}</p>
            <p>• {t('license.terms.keepCopyright')}</p>
            <p>• {t('license.terms.legalEffect')}</p>
          </div>
        </div>
      </div>
      
      {/* 下载授权文件按钮 */}
      <div className="mt-4 pt-3 border-t border-current border-opacity-20">
        <button className="w-full py-2 px-4 bg-white bg-opacity-20 rounded-md hover:bg-opacity-30 transition-colors text-sm font-medium">
          {t('license.downloadPdf')}
        </button>
      </div>
    </div>
  );
}
