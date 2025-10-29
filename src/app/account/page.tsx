export default function AccountPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">个人中心</h1>
          <p className="text-gray-600">管理您的账户、收藏和授权</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 个人信息 */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-500">头像</span>
                </div>
                <h2 className="font-semibold">用户名</h2>
                <p className="text-sm text-gray-500">user@example.com</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">会员等级</span>
                  <span className="font-medium">个人会员</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">到期时间</span>
                  <span className="font-medium">2024-12-31</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">下载次数</span>
                  <span className="font-medium">15/100</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 主要内容区域 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 我的收藏 */}
            <div>
              <h3 className="text-xl font-semibold mb-4">我的收藏</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
                    <span className="text-xs text-gray-500">收藏 {i}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 我的购买记录 */}
            <div>
              <h3 className="text-xl font-semibold mb-4">购买记录</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <div>
                      <p className="font-medium">个人会员 - 月度订阅</p>
                      <p className="text-sm text-gray-500">2024-01-01</p>
                    </div>
                    <span className="text-green-600 font-medium">¥29</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <div>
                      <p className="font-medium">单张卡片购买</p>
                      <p className="text-sm text-gray-500">2024-01-15</p>
                    </div>
                    <span className="text-green-600 font-medium">¥9</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 我的授权 */}
            <div>
              <h3 className="text-xl font-semibold mb-4">我的授权</h3>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">卡片标题</p>
                      <p className="text-sm text-gray-500">授权编号：CV-20240101-123456-789012-0001</p>
                      <p className="text-sm text-gray-500">授权类型：个人使用</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      下载授权文件
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 我的上传作品 */}
            <div>
              <h3 className="text-xl font-semibold mb-4">我的上传作品</h3>
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500 mb-4">暂无上传作品</p>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  上传作品
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
