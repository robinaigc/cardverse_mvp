'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getGroupImages, getCardByFilename, firstImages, getGroupName } from '@/lib/cards';
import LicenseBadge from '@/components/LicenseBadge';
import TextEditor from '@/components/TextEditor';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CardPage() {
  const params = useParams();
  const router = useRouter();
  const { t, language } = useLanguage();
  const folder = decodeURIComponent(params.folder as string);
  const filename = decodeURIComponent(params.filename as string);
  
  const [currentImage, setCurrentImage] = useState(filename);
  const [groupImages, setGroupImages] = useState<string[]>([]);
  const [cardInfo, setCardInfo] = useState<any>(null);

  // 只在 folder 变化时获取 group 信息和图片列表，不依赖 language
  useEffect(() => {
    // 获取该组所有图片
    const images = getGroupImages(folder);
    setGroupImages(images);
    
    // 获取该组的第一张图片信息作为默认卡片信息（不依赖 filename，保持稳定）
    const firstCard = firstImages.find(img => img.folder === folder);
    if (firstCard) {
      setCardInfo({
        ...firstCard,
        filename: firstCard.filename // 使用第一张图片的 filename，保持稳定
      });
    }
  }, [folder]); // 只依赖 folder，不依赖 language

  // 当 URL 中的 filename 变化时（比如直接访问新 URL），更新 currentImage
  useEffect(() => {
    setCurrentImage(filename);
  }, [filename]);

  // 使用 useMemo 缓存 group 名称，避免每次渲染都重新计算
  const groupName = useMemo(() => getGroupName(folder), [folder]);

  // 使用 useMemo 缓存英文名计算，避免每次渲染都重新计算
  const englishName = useMemo(() => 
    currentImage
      .replace(/^CV_\d+_\w+_/, '')
      .replace(/_\d+-\d+\.png$/, '')
      .replace(/_/g, ' '),
    [currentImage]
  );

  const handleThumbnailClick = (imageFilename: string) => {
    // 只更新当前图片，不更新 URL，避免触发整个组件重新渲染
    setCurrentImage(imageFilename);
    // 静默更新 URL（不触发导航）
    const encodedFolder = encodeURIComponent(folder);
    const encodedFilename = encodeURIComponent(imageFilename);
    window.history.replaceState({}, '', `/card/${encodedFolder}/${encodedFilename}`);
  };

  const handleDownload = (imageDataUrl: string) => {
    const link = document.createElement('a');
    link.download = `${currentImage.replace('.png', '')}_with_text.png`;
    link.href = imageDataUrl;
    link.click();
  };

  if (!cardInfo) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">{t('card.loading')}</p>
        </div>
      </div>
    );
  }

  const currentImagePath = `/images/groups/${folder}/${currentImage}`;

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
      
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 左侧：卡片大图区域 */}
            <div className="space-y-4">
              {/* 大图和按钮区域 */}
              <div className="flex items-center gap-3">
                {/* 大图容器 - 居中略靠左，保持原始大小 */}
                <div className="flex-1 flex justify-start" style={{ paddingLeft: '10%' }}>
                  <div className="w-full">
                    <TextEditor 
                      imageUrl={currentImagePath}
                      onDownload={handleDownload}
                    />
                  </div>
                </div>
              </div>
              
              {/* 缩略图区域 */}
              <div>
                {groupName ? (
                  <div className="mb-3">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">{groupName.chinese}</h3>
                    <p className="text-xs text-gray-500">{groupName.english}</p>
                  </div>
                ) : (
                  <h3 className="text-sm font-medium text-gray-600 mb-3">{t('card.series.all')}</h3>
                )}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {groupImages.map((imageFilename) => {
                    const isActive = imageFilename === currentImage;
                    return (
                      <button
                        key={imageFilename}
                        onClick={() => handleThumbnailClick(imageFilename)}
                        className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                          isActive 
                            ? 'border-blue-600 ring-2 ring-blue-200' 
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                        style={{ width: '80px', height: '60px' }}
                      >
                        <img
                          src={`/images/groups/${folder}/${imageFilename}`}
                          alt={imageFilename}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* 右侧：卡片信息区域 */}
            <div className="space-y-6">
              <div>
                {/* 标题 */}
                <h1 className="text-2xl font-bold mb-1">
                  {language === 'en' && cardInfo.titleEn ? cardInfo.titleEn : cardInfo.title}
                </h1>
                {/* 副标题 - 从文件名提取或使用英文标题 */}
                <p className="text-lg text-gray-500 mb-3 font-normal">
                  {language === 'en' ? englishName : (cardInfo.titleEn || englishName)}
                </p>
                <p className="text-gray-600 mb-4">
                  {language === 'en' && cardInfo.captionEn ? cardInfo.captionEn : cardInfo.caption}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{t('card.author')}: Cardverse</span>
                  <span>{t('card.uploadTime')}: 2024-01-01</span>
                  <span>{t('card.downloads')}: {Math.floor(Math.random() * 1000)}</span>
                </div>
              </div>
              
              {/* 操作按钮 */}
              <div className="flex gap-4">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  {t('card.favorite')}
                </button>
                <button className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  {t('card.share')}
                </button>
              </div>
              
              {/* 相似推荐 */}
              <div>
                <h3 className="font-medium mb-4">{t('card.similar')}</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square bg-gray-100 rounded cursor-pointer hover:bg-gray-200">
                      <span className="text-xs text-gray-500">{t('card.recommend')} {i}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 版权说明 - 移到相似风格下方 */}
              <LicenseBadge licenseType="personal" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
