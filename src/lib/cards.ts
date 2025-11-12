// 卡片数据工具函数

export interface CardImage {
  id: string;
  folder: string;
  filename: string;
  series: string;
  seriesEn: string;
  title: string;
  titleEn: string;
  caption: string;
  captionEn: string;
  tags: string[];
  tagsEn: string[];
}

// 每组的第一张图片配置
export const firstImages: CardImage[] = [
  {
    id: 'card-001',
    folder: '0001_OrphismCity',
    filename: 'CV_000001_OrphismCity_Paris_EiffelTower_3-4.png',
    series: '城市系列',
    seriesEn: 'City Series',
    title: '巴黎 - 埃菲尔铁塔',
    titleEn: 'Paris - Eiffel Tower',
    caption: '精美的城市系列卡片，展现巴黎埃菲尔铁塔的独特魅力。',
    captionEn: 'Exquisite city series card showcasing the unique charm of the Eiffel Tower in Paris.',
    tags: ['城市', '建筑', '巴黎', '埃菲尔铁塔', '现代艺术'],
    tagsEn: ['City', 'Architecture', 'Paris', 'Eiffel Tower', 'Modern Art']
  },
  {
    id: 'card-011',
    folder: '0002_InkPaper',
    filename: 'CV_000011_InkPaper_Flower_3-4.png',
    series: '国风系列',
    seriesEn: 'Chinese Style',
    title: '水墨花卉',
    titleEn: 'Ink Flower',
    caption: '传统水墨风格的花卉卡片，展现东方美学的韵味。',
    captionEn: 'Traditional ink painting style flower card showcasing the charm of Eastern aesthetics.',
    tags: ['国风', '水墨', '花卉', '传统', '东方美学'],
    tagsEn: ['Chinese Style', 'Ink', 'Flower', 'Traditional', 'Eastern Aesthetics']
  },
  {
    id: 'card-021',
    folder: '0003_HighCloud',
    filename: 'CV_000021_HighCloud_GoldenBlue_3-4.png',
    series: '云彩系列',
    seriesEn: 'Cloud Series',
    title: '金色云彩',
    titleEn: 'Golden Cloud',
    caption: '梦幻的云彩系列卡片，展现天空的壮美与诗意。',
    captionEn: 'Dreamy cloud series card showcasing the magnificence and poetry of the sky.',
    tags: ['云彩', '天空', '自然', '风景', '梦幻'],
    tagsEn: ['Cloud', 'Sky', 'Nature', 'Landscape', 'Dreamy']
  },
  {
    id: 'card-031',
    folder: '0004_BaroqueFrame',
    filename: 'CV_000031_BaroqueFrame_White_3-4.png',
    series: '巴洛克系列',
    seriesEn: 'Baroque Series',
    title: '白色巴洛克',
    titleEn: 'White Baroque',
    caption: '华丽的巴洛克风格卡片，展现古典装饰艺术的精致。',
    captionEn: 'Magnificent Baroque style card showcasing the refinement of classical decorative art.',
    tags: ['巴洛克', '装饰', '古典', '华丽', '艺术'],
    tagsEn: ['Baroque', 'Decoration', 'Classical', 'Magnificent', 'Art']
  },
  {
    id: 'card-041',
    folder: '0005_RococoFrame',
    filename: 'CV_000041_RococoFrame_WhiteGold_2-3.png',
    series: '洛可可系列',
    seriesEn: 'Rococo Series',
    title: '白金洛可可',
    titleEn: 'White Gold Rococo',
    caption: '精致的洛可可风格卡片，展现优雅的装饰美学。',
    captionEn: 'Exquisite Rococo style card showcasing elegant decorative aesthetics.',
    tags: ['洛可可', '精致', '优雅', '装饰', '艺术'],
    tagsEn: ['Rococo', 'Exquisite', 'Elegant', 'Decoration', 'Art']
  },
  {
    id: 'card-051',
    folder: '0006_WatercolorFlower',
    filename: 'CV_000051_WatercolorFlower_Alstroemeria_2-3.png',
    series: '水彩花卉',
    seriesEn: 'Watercolor Flower',
    title: '水彩花卉',
    titleEn: 'Watercolor Flower',
    caption: '清新的水彩花卉卡片，展现自然之美与艺术创作。',
    captionEn: 'Fresh watercolor flower card showcasing the beauty of nature and artistic creation.',
    tags: ['水彩', '花卉', '自然', '清新', '艺术'],
    tagsEn: ['Watercolor', 'Flower', 'Nature', 'Fresh', 'Art']
  },
  {
    id: 'card-061',
    folder: '0007_DreamyForest',
    filename: 'CV_000061_DreamyForest_FireflyGlow_2-3.png',
    series: '梦幻森林',
    seriesEn: 'Dreamy Forest',
    title: '萤火之光',
    titleEn: 'Firefly Glow',
    caption: '神秘的梦幻森林系列卡片，展现自然的神秘与美丽。',
    captionEn: 'Mysterious dreamy forest series card showcasing the mystery and beauty of nature.',
    tags: ['森林', '梦幻', '自然', '神秘', '美丽'],
    tagsEn: ['Forest', 'Dreamy', 'Nature', 'Mysterious', 'Beautiful']
  },
  {
    id: 'card-071',
    folder: '0008_FlowerGarden',
    filename: 'CV_000071_FlowerGarden_SpringWhisper_2-3.png',
    series: '花园系列',
    seriesEn: 'Flower Garden',
    title: '春日低语',
    titleEn: 'Spring Whisper',
    caption: '美丽的花园系列卡片，展现花卉的绚烂与生机。',
    captionEn: 'Beautiful flower garden series card showcasing the brilliance and vitality of flowers.',
    tags: ['花园', '花卉', '自然', '美丽', '生机'],
    tagsEn: ['Garden', 'Flower', 'Nature', 'Beautiful', 'Vitality']
  },
  {
    id: 'card-081',
    folder: '0009_AntsRoad',
    filename: 'CV_000081_AntsRoad_MorningTrail_2-3.png',
    series: '蚂蚁之路',
    seriesEn: 'Ants Road',
    title: '晨间小径',
    titleEn: 'Morning Trail',
    caption: '独特的微观世界卡片，展现自然细节的奇妙。',
    captionEn: 'Unique microcosm card showcasing the wonder of natural details.',
    tags: ['微观', '自然', '创意', '独特', '细节'],
    tagsEn: ['Micro', 'Nature', 'Creative', 'Unique', 'Detail']
  }
];

// 根据文件夹获取该组所有图片的文件名（按ID排序）
export function getGroupImages(folder: string): string[] {
  const groupMap: Record<string, string[]> = {
    '0001_OrphismCity': [
      'CV_000001_OrphismCity_Paris_EiffelTower_3-4.png',
      'CV_000002_OrphismCity_London_BigBen_3-4.png',
      'CV_000003_OrphismCity_Dubai_Khalifa_3-4.png',
      'CV_000004_OrphismCity_Kyoto_GoldenPavilion_3-4.png',
      'CV_000005_OrphismCity_RioDeJaneiro_StreetView_3-4.png',
      'CV_000006_OrphismCity_Edinburgh_CastleAndCity_3-4.png',
      'CV_000007_OrphismCity_Istanbul_BosphorusBridge_3-4.png',
      'CV_000008_OrphismCity_Istanbul_ByzantineCathedral_3-4.png',
      'CV_000009_OrphismCity_HongKong_StreetNeon_3-4.png',
      'CV_000010_OrphismCity_Venice_Gondola_3-4.png'
    ],
    '0002_InkPaper': [
      'CV_000011_InkPaper_Flower_3-4.png',
      'CV_000012_InkPaper_Flower_3-4.png',
      'CV_000013_InkPaper_Flower_3-4.png',
      'CV_000014_InkPaper_Flower_3-4.png',
      'CV_000015_InkPaper_Flower_3-4.png',
      'CV_000016_InkPaper_Flower_3-4.png',
      'CV_000017_InkPaper_Flower_3-4.png',
      'CV_000018_InkPaper_Flower_3-4.png',
      'CV_000019_InkPaper_Landscape_3-4.png',
      'CV_000020_InkPaper_Landscape_3-4.png'
    ],
    '0003_HighCloud': [
      'CV_000021_HighCloud_GoldenBlue_3-4.png',
      'CV_000022_HighCloud_GoldenBlue_3-4.png',
      'CV_000023_HighCloud_WarmGray_3-4.png',
      'CV_000024_HighCloud_WarmGray_3-4.png',
      'CV_000025_HighCloud_Golden_3-4.png',
      'CV_000026_HighCloud_Golden_3-4.png',
      'CV_000027_HighCloud_Blue_3-4.png',
      'CV_000028_HighCloud_Blue_3-4.png',
      'CV_000029_HighCloud_DarkBlue_3-4.png',
      'CV_000030_HighCloud_Golden_3-4.png'
    ],
    '0004_BaroqueFrame': [
      'CV_000031_BaroqueFrame_White_3-4.png',
      'CV_000032_BaroqueFrame_White_3-4.png',
      'CV_000033_BaroqueFrame_White_3-4.png',
      'CV_000034_BaroqueFrame_White_3-4.png',
      'CV_000035_BaroqueFrame_White_3-4.png',
      'CV_000036_BaroqueFrame_Softred_3-4.png',
      'CV_000037_BaroqueFrame_Softred_3-4.png',
      'CV_000038_BaroqueFrame_Softred_3-4.png',
      'CV_000039_BaroqueFrame_Whitegold_3-4.png',
      'CV_000040_BaroqueFrame_Whitegold_3-4.png'
    ],
    '0005_RococoFrame': [
      'CV_000041_RococoFrame_WhiteGold_2-3.png',
      'CV_000042_RococoFrame_WhiteGold_2-3.png',
      'CV_000043_RococoFrame_Flower_2-3.png',
      'CV_000044_RococoFrame_White_2-3.png',
      'CV_000045_RococoFrame_White_2-3.png',
      'CV_000046_RococoFrame_White_2-3.png',
      'CV_000047_RococoFrame_White_2-3.png',
      'CV_000048_RococoFrame_White_2-3.png',
      'CV_000049_RococoFrame_White_2-3.png',
      'CV_000050_RococoFrame_WarmGray_2-3.png'
    ],
    '0006_WatercolorFlower': [
      'CV_000051_WatercolorFlower_Alstroemeria_2-3.png',
      'CV_000052_WatercolorFlower_PlumBossom_2-3.png',
      'CV_000053_WatercolorFlower_PlumBossom_2-3.png',
      'CV_000054_WatercolorFlower_PlumBossom_2-3.png',
      'CV_000055_WatercolorFlower_PlumBossom_2-3.png',
      'CV_000056_WatercolorFlower_Wisteria_2-3.png',
      'CV_000057_WatercolorFlower_Flower_2-3.png',
      'CV_000058_WatercolorFlower_Flower_2-3.png',
      'CV_000059_WatercolorFlower_Flower_2-3.png',
      'CV_000060_WatercolorFlower_Flower_2-3.png'
    ],
    '0007_DreamyForest': [
      'CV_000061_DreamyForest_FireflyGlow_2-3.png',
      'CV_000062_DreamyForest_StarryMist_2-3.png',
      'CV_000063_DreamyForest_GoldenWeeds_2-3.png',
      'CV_000064_DreamyForest_MistyPath_2-3.png',
      'CV_000065_DreamyForest_MagicPond_2-3.png',
      'CV_000066_DreamyForest_AmberLight_2-3.png',
      'CV_000067_DreamyForest_BlueVeil_2-3.png',
      'CV_000068_DreamyForest_LuminescentTrees_2-3.png',
      'CV_000069_DreamyForest_LuminescentTrees_2-3.png',
      'CV_000070_DreamyForest_SparkRain_2-3.png'
    ],
    '0008_FlowerGarden': [
      'CV_000071_FlowerGarden_SpringWhisper_2-3.png',
      'CV_000072_FlowerGarden_SunPetals_2-3.png',
      'CV_000073_FlowerGarden_GoldenBloom_2-3.png',
      'CV_000074_FlowerGarden_CloudField_2-3.png',
      'CV_000075_FlowerGarden_PastelDream_2-3.png',
      'CV_000076_FlowerGarden_FlowerHorizon_2-3.png',
      'CV_000077_FlowerGarden_CrinumLily_2-3.png',
      'CV_000078_FlowerGarden_DaturaStramonium_2-3.png',
      'CV_000079_FlowerGarden_Lupin flower_2-3.png',
      'CV_000080_FlowerGarden_Torch Lily_2-3.png'
    ],
    '0009_AntsRoad': [
      'CV_000081_AntsRoad_MorningTrail_2-3.png',
      'CV_000082_AntsRoad_RainPath_2-3.png',
      'CV_000083_AntsRoad_DewJourney_2-3.png',
      'CV_000084_AntsRoad_GreenTunnel_2-3.png',
      'CV_000085_AntsRoad_LeafWay_2-3.png',
      'CV_000086_AntsRoad_MistRoad_2-3.png',
      'CV_000087_AntsRoad_BloomTrail_2-3.png',
      'CV_000088_AntsRoad_TinyWorld_2-3.png',
      'CV_000089_AntsRoad_SunField_2-3.png',
      'CV_000090_AntsRoad_AntsMarch_2-3.png'
    ]
  };
  
  return groupMap[folder] || [];
}

// 根据文件夹和文件名获取卡片信息
export function getCardByFilename(folder: string, filename: string): CardImage | null {
  const firstImage = firstImages.find(img => img.folder === folder);
  if (!firstImage) return null;
  
  return {
    ...firstImage,
    id: `card-${folder}-${filename}`,
    filename: filename
  };
}

// Group 中英文名称映射
interface GroupName {
  chinese: string;
  english: string;
}

const groupNames: Record<string, GroupName> = {
  '0001_OrphismCity': {
    chinese: '奥弗斯主义城市',
    english: 'Orphism City'
  },
  '0002_InkPaper': {
    chinese: '水墨纸本',
    english: 'Ink Paper'
  },
  '0003_HighCloud': {
    chinese: '高云',
    english: 'High Cloud'
  },
  '0004_BaroqueFrame': {
    chinese: '巴洛克框架',
    english: 'Baroque Frame'
  },
  '0005_RococoFrame': {
    chinese: '洛可可框架',
    english: 'Rococo Frame'
  },
  '0006_WatercolorFlower': {
    chinese: '水彩花卉',
    english: 'Watercolor Flower'
  },
  '0007_DreamyForest': {
    chinese: '梦幻森林',
    english: 'Dreamy Forest'
  },
  '0008_FlowerGarden': {
    chinese: '花园',
    english: 'Flower Garden'
  },
  '0009_AntsRoad': {
    chinese: '蚂蚁之路',
    english: 'Ants Road'
  }
};

// 根据文件夹获取 group 的中英文名称
export function getGroupName(folder: string): GroupName | null {
  return groupNames[folder] || null;
}

