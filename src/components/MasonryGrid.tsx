'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import CardTile from './CardTile';
import { firstImages } from '@/lib/cards';
import { useLanguage } from '@/contexts/LanguageContext';

interface Card {
  id: string;
  title: string;
  titleEn?: string;
  caption: string;
  captionEn?: string;
  previewUrl: string;
  thumbUrl: string;
  series: string;
  seriesEn?: string;
  style: string;
  tags: string[];
  tagsEn?: string[];
  downloads: number;
}

function generateCards(language: 'zh' | 'en' = 'zh'): Card[] {
  const cards = firstImages.map((img) => ({
    id: img.id,
    title: language === 'en' && img.titleEn ? img.titleEn : img.title,
    titleEn: img.titleEn,
    caption: language === 'en' && img.captionEn ? img.captionEn : img.caption,
    captionEn: img.captionEn,
    previewUrl: `/images/groups/${img.folder}/${img.filename}`,
    thumbUrl: `/images/groups/${img.folder}/${img.filename}`,
    series: language === 'en' && img.seriesEn ? img.seriesEn : img.series,
    seriesEn: img.seriesEn,
    style: 'illustration',
    tags: language === 'en' && img.tagsEn ? img.tagsEn : img.tags,
    tagsEn: img.tagsEn,
    downloads: Math.floor(Math.random() * 1000)
  }));
  
  // 随机打乱顺序
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  
  return cards;
}

export default function MasonryGrid() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadCards();
  }, [page, language]);

  const loadCards = async () => {
    try {
      setLoading(true);
      
      // 生成所有卡片数据（每组只显示第一张）
      const allCards = generateCards(language);
      
      // 分页处理
      const pageSize = 20;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const pageCards = allCards.slice(startIndex, endIndex);
      
      if (page === 1) {
        setCards(pageCards);
      } else {
        setCards(prev => [...prev, ...pageCards]);
      }
      
      setHasMore(endIndex < allCards.length);
    } catch (error) {
      console.error('Failed to load cards:', error);
    } finally {
      setLoading(false);
    }
  };

  // 滚动监听函数
  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // 当滚动到距离底部100px时触发加载
    if (scrollTop + windowHeight >= documentHeight - 100) {
      setPage(prev => prev + 1);
    }
  }, [loading, hasMore]);

  // 添加滚动监听
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  const handleCardClick = (id: string) => {
    // 从 firstImages 中找到对应的卡片
    const card = firstImages.find(img => img.id === id);
    if (card) {
      router.push(`/card/${encodeURIComponent(card.folder)}/${encodeURIComponent(card.filename)}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* 瀑布流网格 - 5列布局，极窄间距 */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-1">
        {cards.map((card) => (
          <div key={card.id} className="break-inside-avoid mb-1">
            <CardTile
              {...card}
              onClick={handleCardClick}
            />
          </div>
        ))}
      </div>
      
      {/* 加载指示器 */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-flex items-center space-x-2 text-gray-600">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></div>
            <span>{t('home.loading')}</span>
          </div>
        </div>
      )}
      
      {/* 加载完成提示 */}
      {!hasMore && cards.length > 0 && (
        <div className="text-center text-gray-500 py-8">
          {t('home.loadedAll')}
        </div>
      )}
    </div>
  );
}
