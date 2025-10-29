import { notFound } from 'next/navigation';
import CardTile from '@/components/CardTile';
import LicenseBadge from '@/components/LicenseBadge';

interface CardPageProps {
  params: {
    id: string;
  };
}

export default async function CardPage({ params }: CardPageProps) {
  const { id } = await params;
  
  // TODO: 从数据库获取卡片详情
  // const card = await getCardById(id);
  
  // if (!card) {
  //   notFound();
  // }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 卡片大图区域 */}
          <div className="space-y-4">
            <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">卡片预览 {id}</span>
            </div>
            
            {/* 文字添加工具 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-3">添加文字</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  字体
                </button>
                <button className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  大小
                </button>
                <button className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  斜体
                </button>
                <button className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  加粗
                </button>
                <button className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  半透明
                </button>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  下载
                </button>
              </div>
            </div>
          </div>
          
          {/* 卡片信息区域 */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">卡片标题</h1>
              <p className="text-gray-600 mb-4">卡片描述和关键词</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>作者：Cardverse</span>
                <span>上传时间：2024-01-01</span>
                <span>下载次数：0</span>
              </div>
            </div>
            
            {/* 版权说明 */}
            <LicenseBadge licenseType="personal" />
            
            {/* 操作按钮 */}
            <div className="flex gap-4">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                收藏
              </button>
              <button className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                分享
              </button>
            </div>
            
            {/* 相似推荐 */}
            <div>
              <h3 className="font-medium mb-4">相似风格</h3>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-square bg-gray-100 rounded cursor-pointer hover:bg-gray-200">
                    <span className="text-xs text-gray-500">推荐 {i}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
