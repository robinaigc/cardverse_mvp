'use client';

import { useState, useEffect } from 'react';
import CardTile from './CardTile';

interface Card {
  id: string;
  title: string;
  caption: string;
  previewUrl: string;
  thumbUrl: string;
  series: string;
  style: string;
  tags: string[];
  downloads: number;
}

export default function MasonryGrid() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadCards();
  }, [page]);

  const loadCards = async () => {
    try {
      setLoading(true);
      // TODO: 实现真实的 API 调用
      // const response = await fetch(`/api/cards?page=${page}&limit=20`);
      // const data = await response.json();
      
      // 模拟数据
      const mockCards: Card[] = Array.from({ length: 20 }, (_, i) => ({
        id: `card-${page}-${i}`,
        title: `卡片标题 ${page}-${i}`,
        caption: `这是一张精美的卡片描述，展示了设计的美感和创意。`,
        previewUrl: '/placeholder-card.jpg',
        thumbUrl: '/placeholder-card.jpg',
        series: ['免费系列', '建筑系列', '城市系列', '诸神系列', '国风系列'][i % 5],
        style: ['minimal', 'illustration', 'photo', 'abstract'][i % 4],
        tags: ['设计', '创意', '美学', '艺术'],
        downloads: Math.floor(Math.random() * 1000)
      }));
      
      if (page === 1) {
        setCards(mockCards);
      } else {
        setCards(prev => [...prev, ...mockCards]);
      }
      
      setHasMore(page < 5); // 模拟最多5页
    } catch (error) {
      console.error('Failed to load cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  const handleCardClick = (id: string) => {
    window.location.href = `/card/${id}`;
  };

  return (
    <div className="space-y-6">
      {/* 瀑布流网格 */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
        {cards.map((card) => (
          <div key={card.id} className="break-inside-avoid mb-6">
            <CardTile
              {...card}
              onClick={handleCardClick}
            />
          </div>
        ))}
      </div>
      
      {/* 加载更多按钮 */}
      {hasMore && (
        <div className="text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '加载中...' : '加载更多'}
          </button>
        </div>
      )}
      
      {/* 加载完成提示 */}
      {!hasMore && cards.length > 0 && (
        <div className="text-center text-gray-500 py-8">
          已加载全部内容
        </div>
      )}
    </div>
  );
}
