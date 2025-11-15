'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import CardTile from './CardTile';
import { firstImages, getGroupName } from '@/lib/cards';
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
  groupName: string;
  groupNameEn?: string;
  style: string;
  tags: string[];
  tagsEn?: string[];
  downloads: number;
  aspectRatio?: string; // 宽高比，如 "3-4" 或 "2-3"
}

/**
 * 从文件名中提取宽高比信息
 * 例如：CV_000001_xxx_3-4.png -> "3-4"
 */
function extractAspectRatio(filename: string): string {
  const match = filename.match(/(\d+)-(\d+)\.(png|jpg|jpeg|webp)$/i);
  if (match) {
    return `${match[1]}-${match[2]}`;
  }
  return 'unknown'; // 如果没有匹配到，返回 'unknown'
}

/**
 * 智能打乱算法：严格确保相邻图片的宽高比不同
 * 使用严格的轮询策略，绝对不允许相邻元素宽高比相同
 */
function shuffleWithHeightConstraint<T extends { aspectRatio?: string }>(items: T[]): T[] {
  if (items.length <= 1) return items;
  
  // 按宽高比分组
  const groups = new Map<string, T[]>();
  items.forEach(item => {
    const ratio = item.aspectRatio || 'unknown';
    if (!groups.has(ratio)) {
      groups.set(ratio, []);
    }
    groups.get(ratio)!.push(item);
  });
  
  // 如果只有一种宽高比，使用普通随机打乱（无法避免相邻相同）
  if (groups.size <= 1) {
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  
  // 对每个组内的元素进行随机打乱
  groups.forEach((group) => {
    for (let i = group.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [group[i], group[j]] = [group[j], group[i]];
    }
  });
  
  // 将分组转换为数组，每个元素包含宽高比和该组的卡片数组
  const groupEntries = Array.from(groups.entries()).map(([ratio, cards]) => ({
    ratio,
    cards: [...cards],
    index: 0 // 当前在该组中取到第几个
  }));
  
  // 不排序，保持原始顺序以增加随机性
  // 但我们可以随机打乱组顺序
  for (let i = groupEntries.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [groupEntries[i], groupEntries[j]] = [groupEntries[j], groupEntries[i]];
  }
  
  const result: T[] = [];
  
  // 严格的轮询策略：确保相邻元素宽高比绝对不同
  // 使用更智能的分配策略，避免最后只剩下相同宽高比的情况
  while (result.length < items.length) {
    // 找出所有还有剩余卡片的组
    const availableGroups = groupEntries.filter(g => g.index < g.cards.length);
    
    if (availableGroups.length === 0) break;
    
    // 获取上一个元素的宽高比
    const lastRatio = result.length > 0 ? result[result.length - 1].aspectRatio : null;
    
    // 严格过滤：必须与上一个不同
    const differentGroups = availableGroups.filter(g => g.ratio !== lastRatio);
    
    let selectedGroup;
    
    if (differentGroups.length > 0) {
      // 优先从不同的组中选择
      // 智能选择：优先选择那些选择后仍能保持多样性的组
      // 计算每个组选择后，剩余的不同宽高比数量
      const groupScores = differentGroups.map(group => {
        // 模拟选择这个组后的情况
        const remainingAfterSelect = availableGroups
          .filter(g => g !== group || g.index + 1 < g.cards.length)
          .map(g => g.ratio);
        const uniqueRatiosAfter = new Set(remainingAfterSelect);
        return {
          group,
          score: uniqueRatiosAfter.size // 剩余的不同宽高比数量
        };
      });
      
      // 优先选择分数高的组（选择后仍能保持更多多样性）
      groupScores.sort((a, b) => b.score - a.score);
      const bestScore = groupScores[0].score;
      const bestGroups = groupScores.filter(gs => gs.score === bestScore).map(gs => gs.group);
      
      // 从最佳组中随机选择一个
      selectedGroup = bestGroups[Math.floor(Math.random() * bestGroups.length)];
    } else {
      // 极端情况：所有剩余组都与上一个相同
      // 这种情况理论上不应该发生（因为我们已经按组分散了）
      // 但如果发生了，说明所有剩余卡片都是同一个宽高比，无法避免
      console.warn('警告：所有剩余卡片都与上一个相同，无法避免相邻相同');
      selectedGroup = availableGroups[0];
    }
    
    // 最终验证：如果选择的组与上一个相同，且还有不同的组可用，强制选择不同的
    if (lastRatio !== null && selectedGroup.ratio === lastRatio && differentGroups.length > 0) {
      console.warn('检测到算法错误，强制修复相邻相同问题');
      selectedGroup = differentGroups[0];
    }
    
    result.push(selectedGroup.cards[selectedGroup.index]);
    selectedGroup.index++;
  }
  
  // 最终验证：检查是否有相邻相同的情况，如果有则尝试修复
  let fixed = false;
  for (let i = 1; i < result.length; i++) {
    if (result[i].aspectRatio === result[i - 1].aspectRatio) {
      // 尝试与后面的元素交换
      for (let j = i + 1; j < result.length; j++) {
        if (result[j].aspectRatio !== result[i - 1].aspectRatio && 
            result[j].aspectRatio !== result[i].aspectRatio) {
          [result[i], result[j]] = [result[j], result[i]];
          fixed = true;
          break;
        }
      }
    }
  }
  
  if (fixed) {
    console.log('已修复相邻相同的问题');
  }
  
  return result;
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
    groupName: (() => {
      const group = getGroupName(img.folder);
      if (!group) return '';
      return language === 'en' && group.english ? group.english : group.chinese;
    })(),
    groupNameEn: (() => {
      const group = getGroupName(img.folder);
      return group?.english;
    })(),
    style: 'illustration',
    tags: language === 'en' && img.tagsEn ? img.tagsEn : img.tags,
    tagsEn: img.tagsEn,
    downloads: Math.floor(Math.random() * 1000),
    aspectRatio: extractAspectRatio(img.filename)
  }));
  
  // 使用带高度约束的智能打乱算法
  return shuffleWithHeightConstraint(cards);
}

export default function MasonryGrid() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // 只在 page 变化时加载新卡片，不依赖 language
  useEffect(() => {
    loadCards();
  }, [page]);

  // 当语言切换时，只更新现有卡片的文本内容，不重新加载图片
  useEffect(() => {
    if (cards.length > 0) {
      setCards(prevCards => {
        return prevCards.map(card => {
          const originalCard = firstImages.find(img => img.id === card.id);
          if (originalCard) {
            return {
              ...card,
              title: language === 'en' && originalCard.titleEn ? originalCard.titleEn : originalCard.title,
              caption: language === 'en' && originalCard.captionEn ? originalCard.captionEn : originalCard.caption,
              series: language === 'en' && originalCard.seriesEn ? originalCard.seriesEn : originalCard.series,
              groupName: (() => {
                const group = getGroupName(originalCard.folder);
                if (!group) return card.groupName;
                return language === 'en' && group.english ? group.english : group.chinese;
              })(),
              tags: language === 'en' && originalCard.tagsEn ? originalCard.tagsEn : originalCard.tags,
            };
          }
          return card;
        });
      });
    }
  }, [language]); // 只依赖 language，用于更新文本

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
