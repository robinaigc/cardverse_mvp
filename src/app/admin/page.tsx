export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">后台管理</h1>
          <p className="text-gray-600">管理用户、内容和系统设置</p>
        </div>
        
        {/* 统计概览 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-2">总用户数</h3>
            <p className="text-2xl font-bold">1,234</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-2">卡片总数</h3>
            <p className="text-2xl font-bold">5,678</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-2">待审核</h3>
            <p className="text-2xl font-bold">23</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-2">今日收入</h3>
            <p className="text-2xl font-bold">¥1,234</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 待审核内容 */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">待审核内容</h2>
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-xs text-gray-500">预览</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">卡片标题 {i}</h3>
                        <p className="text-sm text-gray-500">上传者：用户{i}</p>
                        <p className="text-sm text-gray-500">上传时间：2024-01-{i.toString().padStart(2, '0')}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                          通过
                        </button>
                        <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                          拒绝
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* 管理工具 */}
          <div className="space-y-6">
            {/* 用户管理 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-4">用户管理</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded">
                  查看所有用户
                </button>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded">
                  封禁用户
                </button>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded">
                  会员审批
                </button>
              </div>
            </div>
            
            {/* 内容管理 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-4">内容管理</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded">
                  编辑分类
                </button>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded">
                  批量标签
                </button>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded">
                  置顶推荐
                </button>
              </div>
            </div>
            
            {/* 系统设置 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-4">系统设置</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded">
                  发布公告
                </button>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded">
                  数据导出
                </button>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded">
                  系统日志
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
