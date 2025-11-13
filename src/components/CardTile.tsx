'use client';

import { useLanguage } from '@/contexts/LanguageContext';

interface CardTileProps {
  id: string;
  title: string;
  titleEn?: string;
  caption: string;
  captionEn?: string;
  previewUrl: string;
  thumbUrl: string;
  series: string;
  seriesEn?: string;
  groupName: string;
  groupNameEn?: string;
  style: string;
  tags: string[];
  tagsEn?: string[];
  downloads: number;
  onClick?: (id: string) => void;
}

export default function CardTile({
  id,
  title,
  titleEn,
  caption,
  captionEn,
  previewUrl,
  thumbUrl,
  series,
  seriesEn,
  groupName,
  groupNameEn,
  style,
  tags,
  tagsEn,
  downloads,
  onClick
}: CardTileProps) {
  const { t, language } = useLanguage();
  
  // 根据语言选择显示的文本
  const displayTitle = language === 'en' && titleEn ? titleEn : title;
  const displayCaption = language === 'en' && captionEn ? captionEn : caption;
  const displaySeries = language === 'en' && seriesEn ? seriesEn : series;
  const displayTags = language === 'en' && tagsEn ? tagsEn : tags;
  const displayGroupName = language === 'en' && groupNameEn ? groupNameEn : groupName || displayTitle;
  return (
    <div 
      className="group cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
      onClick={() => onClick?.(id)}
    >
      <div className="relative overflow-hidden rounded-lg" style={{ backgroundColor: '#f3f4f6' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbUrl || '/placeholder-card.jpg'}
          alt={title}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            zIndex: 1
          }}
          className="group-hover:scale-105 transition-transform duration-300"
          loading="eager"
        />
        
        {/* 半透明叠加层 - 只在 hover 时显示 */}
        <div 
          className="absolute top-0 left-0 right-0 bottom-0 flex items-end z-20 pointer-events-none group-hover:pointer-events-auto transition-all duration-300"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0)';
          }}
        >
          <div className="w-full p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center justify-between mb-2">
              {/* 所属系列 */}
              <span className="text-xs font-medium text-white opacity-80">
                {displaySeries}
              </span>
              <span className="text-xs text-white bg-black bg-opacity-50 px-2 py-0.5 rounded">
                {downloads} {t('card.downloads')}
              </span>
            </div>
            
            {/* Group ID 中的名字 */}
            <h3 className="font-semibold text-white mb-1 line-clamp-1">
              {displayGroupName}
            </h3>
            
            {/* 整组10张图片的概括简介 */}
            <p className="text-sm text-white mb-3 line-clamp-2 opacity-90">
              {displayCaption}
            </p>
            
            <div className="flex flex-wrap gap-2 text-xs text-white opacity-70">
              {displayTags.slice(0, 3).map((tag, index) => (
                <span key={index}>{tag}</span>
              ))}
              {displayTags.length > 3 && (
                <span>
                  +{displayTags.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
