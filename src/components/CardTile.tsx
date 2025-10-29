import Image from 'next/image';

interface CardTileProps {
  id: string;
  title: string;
  caption: string;
  previewUrl: string;
  thumbUrl: string;
  series: string;
  style: string;
  tags: string[];
  downloads: number;
  onClick?: (id: string) => void;
}

export default function CardTile({
  id,
  title,
  caption,
  previewUrl,
  thumbUrl,
  series,
  style,
  tags,
  downloads,
  onClick
}: CardTileProps) {
  return (
    <div 
      className="group cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
      onClick={() => onClick?.(id)}
    >
      <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
        <Image
          src={thumbUrl || '/placeholder-card.jpg'}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* 半透明叠加层 - 只在 hover 时显示 */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-end">
          <div className="w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-white bg-white bg-opacity-20 px-2 py-1 rounded backdrop-blur-sm">
                {series}
              </span>
              <span className="text-xs text-white">
                {downloads} 下载
              </span>
            </div>
            
            <h3 className="font-semibold text-white mb-1 line-clamp-1">
              {title}
            </h3>
            
            <p className="text-sm text-white mb-3 line-clamp-2 opacity-90">
              {caption}
            </p>
            
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 3).map((tag) => (
                <span 
                  key={tag}
                  className="text-xs text-white bg-white bg-opacity-20 px-2 py-1 rounded backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="text-xs text-white opacity-70">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
