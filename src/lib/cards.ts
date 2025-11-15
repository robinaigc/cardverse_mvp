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
    filename: 'CV_000011_InkPaper_Landscape_3-4.png',
    series: '国风系列',
    seriesEn: 'Chinese Style',
    title: '水墨山水',
    titleEn: 'Ink Landscape',
    caption: '传统水墨风格的山水卡片，展现东方美学的韵味。',
    captionEn: 'Traditional ink painting style landscape card showcasing the charm of Eastern aesthetics.',
    tags: ['国风', '水墨', '山水', '传统', '东方美学'],
    tagsEn: ['Chinese Style', 'Ink', 'Landscape', 'Traditional', 'Eastern Aesthetics']
  },
  {
    id: 'card-021',
    folder: '0003_HighCloud',
    filename: 'CV_000021_HighCloud_GoldenBlue_3-4.png',
    series: '自然系列',
    seriesEn: 'Nature Series',
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
    series: '建筑系列',
    seriesEn: 'Architecture Series',
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
    series: '建筑系列',
    seriesEn: 'Architecture Series',
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
    series: '国风系列',
    seriesEn: 'Chinese Style',
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
    series: '自然系列',
    seriesEn: 'Nature Series',
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
    series: '自然系列',
    seriesEn: 'Nature Series',
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
  },
  {
    id: 'card-091',
    folder: '0010_RiverForest',
    filename: 'CV_000091_RiverForest_RiverPath_9-16.png',
    series: '自然系列',
    seriesEn: 'Nature Series',
    title: '河流小径',
    titleEn: 'River Path',
    caption: '优美的河流森林系列卡片，展现自然河流与森林的和谐之美。',
    captionEn: 'Beautiful river forest series card showcasing the harmonious beauty of natural rivers and forests.',
    tags: ['河流', '森林', '自然', '风景', '宁静'],
    tagsEn: ['River', 'Forest', 'Nature', 'Landscape', 'Serene']
  },
  {
    id: 'card-101',
    folder: '0011_PirateShip',
    filename: 'CV_000101_PirateShip_StormWake_9-16.png',
    series: '海盗船系列',
    seriesEn: 'Pirate Ship',
    title: '日暮海盗船',
    titleEn: 'Dusk Pirate Ship',
    caption: '壮观的海盗船系列卡片，展现海洋冒险与勇气的魅力。',
    captionEn: 'Spectacular pirate ship series card showcasing the charm of maritime adventure and courage.',
    tags: ['海盗船', '海洋', '冒险', '勇气', '壮观'],
    tagsEn: ['Pirate Ship', 'Ocean', 'Adventure', 'Courage', 'Spectacular']
  },
  {
    id: 'card-111',
    folder: '0012_LonelyMilkyWay',
    filename: 'CV_000111_LonelyMilkyWay_LonelyStarlight_9-16.png',
    series: '自然系列',
    seriesEn: 'Nature Series',
    title: '孤独星光',
    titleEn: 'Lonely Starlight',
    caption: '神秘的孤独银河系列卡片，展现宇宙的浩瀚与孤独之美。',
    captionEn: 'Mysterious lonely Milky Way series card showcasing the vastness and beauty of cosmic solitude.',
    tags: ['银河', '星空', '自然', '宇宙', '神秘'],
    tagsEn: ['Milky Way', 'Starry Sky', 'Nature', 'Universe', 'Mysterious']
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
      'CV_000011_InkPaper_Landscape_3-4.png',
      'CV_000012_InkPaper_Flower_3-4.png',
      'CV_000013_InkPaper_Flower_3-4.png',
      'CV_000014_InkPaper_Flower_3-4.png',
      'CV_000015_InkPaper_Flower_3-4.png',
      'CV_000016_InkPaper_Flower_3-4.png',
      'CV_000017_InkPaper_Flower_3-4.png',
      'CV_000018_InkPaper_Flower_3-4.png',
      'CV_000019_InkPaper_Landscape_3-4.png',
      'CV_000020_InkPaper_Flower_3-4.png'
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
    ],
    '0010_RiverForest': [
      'CV_000091_RiverForest_RiverPath_9-16.png',
      'CV_000092_RiverForest_GoldenHills_9-16.png',
      'CV_000093_RiverForest_ForestBend_9-16.png',
      'CV_000094_RiverForest_SunsetStream_9-16.png',
      'CV_000095_RiverForest_AutumnCanyon_9-16.png',
      'CV_000096_RiverForest_MistyValley_9-16.png',
      'CV_000097_RiverForest_AmberWoods_9-16.png',
      'CV_000098_RiverForest_MorningFlow_9-16.png',
      'CV_000099_RiverForest_CrimsonRiver_9-16.png',
      'CV_000100_RiverForest_SilentHorizon_9-16.png'
    ],
    '0011_PirateShip': [
      'CV_000101_PirateShip_StormWake_9-16.png',
      'CV_000102_PirateShip_WaveStrike_9-16.png',
      'CV_000103_PirateShip_DuskChase_9-16.png',
      'CV_000104_PirateShip_FireTrail_9-16.png',
      'CV_000105_PirateShip_SunsetVoyage_9-16.png',
      'CV_000106_PirateShip_GoldSail_9-16.png',
      'CV_000107_PirateShip_CalmHarbor_9-16.png',
      'CV_000108_PirateShip_BladeWave_9-16.png',
      'CV_000109_PirateShip_SkyBreaker_9-16.png',
      'CV_000110_PirateShip_MoonCurrent_9-16.png'
    ],
    '0012_LonelyMilkyWay': [
      'CV_000111_LonelyMilkyWay_LonelyStarlight_9-16.png',
      'CV_000112_LonelyMilkyWay_SilentGalaxy_9-16.png',
      'CV_000113_LonelyMilkyWay_SolitaryBeam_9-16.png',
      'CV_000114_LonelyMilkyWay_CrimsonMilky_9-16.png',
      'CV_000115_LonelyMilkyWay_ForestHalo_9-16.png',
      'CV_000116_LonelyMilkyWay_HorizonGlow_9-16.png',
      'CV_000117_LonelyMilkyWay_AzureSpiral_9-16.png',
      'CV_000118_LonelyMilkyWay_MidnightRise_9-16.png',
      'CV_000119_LonelyMilkyWay_CelestialPath_9-16.png',
      'CV_000120_LonelyMilkyWay_EternalNight_9-16.png'
    ]
  };
  
  return groupMap[folder] || [];
}

// 从文件名中提取图片名称（英文）
function extractImageNameFromFilename(filename: string): string {
  // 格式: CV_000061_DreamyForest_FireflyGlow_2-3.png
  // 或者: CV_000061_DreamyForest_Firefly_Glow_2-3.png
  // 提取最后一个下划线和数字比例之间的部分
  const match = filename.match(/CV_\d+_\w+_(.+?)_\d+-\d+\.png$/);
  if (match && match[1]) {
    // 将下划线或驼峰命名转换为可读格式
    // FireflyGlow -> Firefly Glow
    // Firefly_Glow -> Firefly Glow
    return match[1]
      .replace(/_/g, ' ') // 先替换下划线
      .replace(/([A-Z])/g, ' $1') // 再处理驼峰
      .replace(/\s+/g, ' ') // 合并多个空格
      .trim();
  }
  return '';
}

// 图片中英文名称映射表（按文件夹组织）
const imageTitleMap: Record<string, Record<string, { chinese: string; english: string }>> = {
  '0001_OrphismCity': {
    'Paris Eiffel Tower': { chinese: '巴黎 - 埃菲尔铁塔', english: 'Paris - Eiffel Tower' },
    'London Big Ben': { chinese: '伦敦 - 大本钟', english: 'London - Big Ben' },
    'Dubai Khalifa': { chinese: '迪拜 - 哈利法塔', english: 'Dubai - Khalifa' },
    'Kyoto Golden Pavilion': { chinese: '京都 - 金阁寺', english: 'Kyoto - Golden Pavilion' },
    'Rio De Janeiro Street View': { chinese: '里约热内卢 - 街景', english: 'Rio De Janeiro - Street View' },
    'Edinburgh Castle And City': { chinese: '爱丁堡 - 城堡与城市', english: 'Edinburgh - Castle And City' },
    'Istanbul Bosphorus Bridge': { chinese: '伊斯坦布尔 - 博斯普鲁斯大桥', english: 'Istanbul - Bosphorus Bridge' },
    'Istanbul Byzantine Cathedral': { chinese: '伊斯坦布尔 - 拜占庭大教堂', english: 'Istanbul - Byzantine Cathedral' },
    'Hong Kong Street Neon': { chinese: '香港 - 霓虹街景', english: 'Hong Kong - Street Neon' },
    'Venice Gondola': { chinese: '威尼斯 - 贡多拉', english: 'Venice - Gondola' }
  },
  '0002_InkPaper': {
    'Landscape': { chinese: '水墨山水', english: 'Ink Landscape' },
    'Flower': { chinese: '水墨花卉', english: 'Ink Flower' }
  },
  '0003_HighCloud': {
    'Golden Blue': { chinese: '金色云彩', english: 'Golden Cloud' },
    'Warm Gray': { chinese: '暖灰云彩', english: 'Warm Gray Cloud' },
    'Golden': { chinese: '金色云朵', english: 'Golden Cloud' },
    'Blue': { chinese: '蓝色云彩', english: 'Blue Cloud' },
    'Dark Blue': { chinese: '深蓝云彩', english: 'Dark Blue Cloud' }
  },
  '0004_BaroqueFrame': {
    'White': { chinese: '白色巴洛克', english: 'White Baroque' },
    'Softred': { chinese: '柔红巴洛克', english: 'Soft Red Baroque' },
    'Whitegold': { chinese: '白金巴洛克', english: 'White Gold Baroque' }
  },
  '0005_RococoFrame': {
    'White Gold': { chinese: '白金洛可可', english: 'White Gold Rococo' },
    'Flower': { chinese: '花卉洛可可', english: 'Flower Rococo' },
    'White': { chinese: '白色洛可可', english: 'White Rococo' },
    'Warm Gray': { chinese: '暖灰洛可可', english: 'Warm Gray Rococo' }
  },
  '0006_WatercolorFlower': {
    'Alstroemeria': { chinese: '水彩花卉', english: 'Watercolor Flower' },
    'Plum Bossom': { chinese: '梅花', english: 'Plum Blossom' },
    'Wisteria': { chinese: '紫藤', english: 'Wisteria' },
    'Flower': { chinese: '水彩花卉', english: 'Watercolor Flower' }
  },
  '0007_DreamyForest': {
    'Firefly Glow': { chinese: '萤火之光', english: 'Firefly Glow' },
    'Starry Mist': { chinese: '星雾', english: 'Starry Mist' },
    'Golden Weeds': { chinese: '金色草丛', english: 'Golden Weeds' },
    'Misty Path': { chinese: '迷雾小径', english: 'Misty Path' },
    'Magic Pond': { chinese: '魔法池塘', english: 'Magic Pond' },
    'Amber Light': { chinese: '琥珀之光', english: 'Amber Light' },
    'Blue Veil': { chinese: '蓝色面纱', english: 'Blue Veil' },
    'Luminescent Trees': { chinese: '发光树', english: 'Luminescent Trees' },
    'Spark Rain': { chinese: '火花雨', english: 'Spark Rain' }
  },
  '0008_FlowerGarden': {
    'Spring Whisper': { chinese: '春日低语', english: 'Spring Whisper' },
    'Sun Petals': { chinese: '阳光花瓣', english: 'Sun Petals' },
    'Golden Bloom': { chinese: '金色绽放', english: 'Golden Bloom' },
    'Cloud Field': { chinese: '云朵田野', english: 'Cloud Field' },
    'Pastel Dream': { chinese: '粉彩梦境', english: 'Pastel Dream' },
    'Flower Horizon': { chinese: '花海地平线', english: 'Flower Horizon' },
    'Crinum Lily': { chinese: '文殊兰', english: 'Crinum Lily' },
    'Datura Stramonium': { chinese: '曼陀罗', english: 'Datura Stramonium' },
    'Lupin flower': { chinese: '羽扇豆', english: 'Lupin Flower' },
    'Torch Lily': { chinese: '火炬百合', english: 'Torch Lily' }
  },
  '0009_AntsRoad': {
    'Morning Trail': { chinese: '晨间小径', english: 'Morning Trail' },
    'Rain Path': { chinese: '雨中小径', english: 'Rain Path' },
    'Dew Journey': { chinese: '露珠之旅', english: 'Dew Journey' },
    'Green Tunnel': { chinese: '绿色隧道', english: 'Green Tunnel' },
    'Leaf Way': { chinese: '叶片之路', english: 'Leaf Way' },
    'Mist Road': { chinese: '迷雾之路', english: 'Mist Road' },
    'Bloom Trail': { chinese: '花开小径', english: 'Bloom Trail' },
    'Tiny World': { chinese: '微观世界', english: 'Tiny World' },
    'Sun Field': { chinese: '阳光田野', english: 'Sun Field' },
    'Ants March': { chinese: '蚂蚁行军', english: 'Ants March' }
  },
  '0010_RiverForest': {
    'River Path': { chinese: '河流小径', english: 'River Path' },
    'Golden Hills': { chinese: '金色山丘', english: 'Golden Hills' },
    'Forest Bend': { chinese: '森林弯道', english: 'Forest Bend' },
    'Sunset Stream': { chinese: '日落溪流', english: 'Sunset Stream' },
    'Autumn Canyon': { chinese: '秋日峡谷', english: 'Autumn Canyon' },
    'Misty Valley': { chinese: '迷雾山谷', english: 'Misty Valley' },
    'Amber Woods': { chinese: '琥珀森林', english: 'Amber Woods' },
    'Morning Flow': { chinese: '晨流', english: 'Morning Flow' },
    'Crimson River': { chinese: '深红河流', english: 'Crimson River' },
    'Silent Horizon': { chinese: '寂静地平线', english: 'Silent Horizon' }
  },
  '0011_PirateShip': {
    'Storm Wake': { chinese: '日暮海盗船', english: 'Dusk Pirate Ship' },
    'Wave Strike': { chinese: '波浪冲击', english: 'Wave Strike' },
    'Dusk Chase': { chinese: '黄昏追逐', english: 'Dusk Chase' },
    'Fire Trail': { chinese: '火焰轨迹', english: 'Fire Trail' },
    'Sunset Voyage': { chinese: '日落航行', english: 'Sunset Voyage' },
    'Gold Sail': { chinese: '金色帆', english: 'Gold Sail' },
    'Calm Harbor': { chinese: '平静港湾', english: 'Calm Harbor' },
    'Blade Wave': { chinese: '刀刃波浪', english: 'Blade Wave' },
    'Sky Breaker': { chinese: '天空破晓', english: 'Sky Breaker' },
    'Moon Current': { chinese: '月光流', english: 'Moon Current' }
  },
  '0012_LonelyMilkyWay': {
    'Lonely Starlight': { chinese: '孤独星光', english: 'Lonely Starlight' },
    'Silent Galaxy': { chinese: '寂静银河', english: 'Silent Galaxy' },
    'Solitary Beam': { chinese: '孤独光束', english: 'Solitary Beam' },
    'Crimson Milky': { chinese: '深红银河', english: 'Crimson Milky' },
    'Forest Halo': { chinese: '森林光环', english: 'Forest Halo' },
    'Horizon Glow': { chinese: '地平线光芒', english: 'Horizon Glow' },
    'Azure Spiral': { chinese: '天蓝螺旋', english: 'Azure Spiral' },
    'Midnight Rise': { chinese: '午夜升起', english: 'Midnight Rise' },
    'Celestial Path': { chinese: '天路', english: 'Celestial Path' },
    'Eternal Night': { chinese: '永恒之夜', english: 'Eternal Night' }
  }
};

// 根据文件夹和英文名称获取中英文标题
function getImageTitle(folder: string, englishName: string): { chinese: string; english: string } | null {
  const folderMap = imageTitleMap[folder];
  if (!folderMap) return null;
  
  // 尝试精确匹配
  if (folderMap[englishName]) {
    return folderMap[englishName];
  }
  
  // 尝试不区分大小写匹配
  const lowerEnglishName = englishName.toLowerCase();
  for (const [key, value] of Object.entries(folderMap)) {
    if (key.toLowerCase() === lowerEnglishName) {
      return value;
    }
  }
  
  return null;
}

// 根据文件夹和文件名获取卡片信息
export function getCardByFilename(folder: string, filename: string): CardImage | null {
  const firstImage = firstImages.find(img => img.folder === folder);
  if (!firstImage) return null;
  
  // 如果是第一张图片，直接返回
  if (firstImage.filename === filename) {
    return {
      ...firstImage,
      id: `card-${folder}-${filename}`,
      filename: filename
    };
  }
  
  // 对于其他图片，从文件名中提取名称
  const imageNameEn = extractImageNameFromFilename(filename);
  
  // 尝试从映射表中获取中英文标题
  const titleMapping = imageNameEn ? getImageTitle(folder, imageNameEn) : null;
  
  return {
    ...firstImage,
    id: `card-${folder}-${filename}`,
    filename: filename,
    title: titleMapping?.chinese || imageNameEn || firstImage.title, // 优先使用映射表中的中文名
    titleEn: titleMapping?.english || imageNameEn || firstImage.titleEn, // 优先使用映射表中的英文名
    // caption 和 captionEn 保持第一张图片的描述（整组概括）
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
  },
  '0010_RiverForest': {
    chinese: '河流森林',
    english: 'River Forest'
  },
  '0011_PirateShip': {
    chinese: '海盗船',
    english: 'Pirate Ship'
  },
  '0012_LonelyMilkyWay': {
    chinese: '孤独银河',
    english: 'Lonely Milky Way'
  }
};

// 根据文件夹获取 group 的中英文名称
export function getGroupName(folder: string): GroupName | null {
  return groupNames[folder] || null;
}

