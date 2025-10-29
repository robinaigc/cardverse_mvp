interface LicenseBadgeProps {
  licenseType: 'personal' | 'commercial' | 'enterprise';
  className?: string;
}

export default function LicenseBadge({ licenseType, className = '' }: LicenseBadgeProps) {
  const getLicenseInfo = (type: string) => {
    switch (type) {
      case 'personal':
        return {
          label: '个人使用授权',
          description: '仅限个人非商业用途使用',
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: '👤'
        };
      case 'commercial':
        return {
          label: '商业使用授权',
          description: '可用于商业项目、品牌营销等',
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: '💼'
        };
      case 'enterprise':
        return {
          label: '企业授权',
          description: '企业级授权，包含API访问权限',
          color: 'bg-purple-100 text-purple-800 border-purple-200',
          icon: '🏢'
        };
      default:
        return {
          label: '未知授权',
          description: '授权类型未知',
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
            <p>• 禁止二次分发或转售</p>
            <p>• 使用时需保留版权信息</p>
            <p>• 授权文件具有法律效力</p>
          </div>
        </div>
      </div>
      
      {/* 下载授权文件按钮 */}
      <div className="mt-4 pt-3 border-t border-current border-opacity-20">
        <button className="w-full py-2 px-4 bg-white bg-opacity-20 rounded-md hover:bg-opacity-30 transition-colors text-sm font-medium">
          下载授权文件 (PDF)
        </button>
      </div>
    </div>
  );
}
