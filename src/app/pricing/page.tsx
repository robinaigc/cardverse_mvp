export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">定价与授权</h1>
          <p className="text-xl text-gray-600">选择适合您的会员方案</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 游客 */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">游客</h3>
            <div className="text-3xl font-bold mb-4">免费</div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                浏览所有卡片
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                收藏预览
              </li>
              <li className="flex items-center">
                <span className="text-red-500 mr-2">✗</span>
                高清下载
              </li>
              <li className="flex items-center">
                <span className="text-red-500 mr-2">✗</span>
                商用授权
              </li>
            </ul>
            <button className="w-full py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              当前方案
            </button>
          </div>
          
          {/* 个人会员 */}
          <div className="border-2 border-blue-500 rounded-lg p-6 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">推荐</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">个人会员</h3>
            <div className="text-3xl font-bold mb-4">¥29<span className="text-lg text-gray-500">/月</span></div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                高清下载
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                个人使用授权
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                无水印版本
              </li>
              <li className="flex items-center">
                <span className="text-red-500 mr-2">✗</span>
                商用授权
              </li>
            </ul>
            <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              立即订阅
            </button>
          </div>
          
          {/* 商业会员 */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">商业会员</h3>
            <div className="text-3xl font-bold mb-4">¥99<span className="text-lg text-gray-500">/月</span></div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                批量下载
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                商用授权
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                API 访问
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                优先客服
              </li>
            </ul>
            <button className="w-full py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
              立即订阅
            </button>
          </div>
        </div>
        
        {/* 授权说明 */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">授权说明</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3">个人使用授权</h3>
              <p className="text-gray-600">
                仅限个人非商业用途，包括个人社交媒体、个人博客等。禁止用于任何商业目的。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">商业使用授权</h3>
              <p className="text-gray-600">
                可用于品牌营销、出版印刷、广告宣传等商业用途。包含完整的版权保护。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
