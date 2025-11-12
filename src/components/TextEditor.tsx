'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import ColorWheel from './ColorWheel';
import { useLanguage } from '@/contexts/LanguageContext';

interface TextLayer {
  id: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  fontFamily: string;
  fontWeight: 'normal' | 'bold';
  fontStyle: 'normal' | 'italic';
  color: string;
  opacity: number;
  isEditing?: boolean;
}

interface TextEditorProps {
  imageUrl: string;
  onDownload: (imageDataUrl: string) => void;
}

// 可用的字体列表（Google Fonts）
const AVAILABLE_FONTS = [
  { name: '默认', value: 'Arial, sans-serif' },
  { name: '思源黑体', value: '"Noto Sans SC", sans-serif' },
  { name: '思源宋体', value: '"Noto Serif SC", serif' },
  { name: 'Roboto', value: '"Roboto", sans-serif' },
  { name: 'Open Sans', value: '"Open Sans", sans-serif' },
  { name: 'Lato', value: '"Lato", sans-serif' },
  { name: 'Montserrat', value: '"Montserrat", sans-serif' },
  { name: 'Poppins', value: '"Poppins", sans-serif' },
  { name: 'Inter', value: '"Inter", sans-serif' },
  { name: 'Playfair Display', value: '"Playfair Display", serif' },
  { name: 'Merriweather', value: '"Merriweather", serif' },
  { name: 'Raleway', value: '"Raleway", sans-serif' },
  { name: 'Ubuntu', value: '"Ubuntu", sans-serif' },
  { name: 'Oswald', value: '"Oswald", sans-serif' },
  { name: 'Dancing Script', value: '"Dancing Script", cursive' },
  { name: 'Pacifico', value: '"Pacifico", cursive' },
  { name: 'Comfortaa', value: '"Comfortaa", sans-serif' },
  { name: 'Nunito', value: '"Nunito", sans-serif' },
  { name: 'Source Sans Pro', value: '"Source Sans Pro", sans-serif' },
  { name: 'Crimson Text', value: '"Crimson Text", serif' },
];

// 常用颜色
const COMMON_COLORS = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
  '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
  '#FFC0CB', '#A52A2A', '#808080', '#000080', '#008000',
];

export default function TextEditor({ imageUrl, onDownload }: TextEditorProps) {
  const { t, language } = useLanguage();
  const [textLayers, setTextLayers] = useState<TextLayer[]>([]);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const [showFontModal, setShowFontModal] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);
  const [showOpacityModal, setShowOpacityModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const selectedLayer = textLayers.find(layer => layer.id === selectedLayerId);
  
  // 根据语言获取字体列表
  const getFonts = () => {
    if (language === 'en') {
      return [
        { name: 'Default', value: 'Arial, sans-serif' },
        { name: 'Noto Sans SC', value: '"Noto Sans SC", sans-serif' },
        { name: 'Noto Serif SC', value: '"Noto Serif SC", serif' },
        { name: 'Roboto', value: '"Roboto", sans-serif' },
        { name: 'Open Sans', value: '"Open Sans", sans-serif' },
        { name: 'Lato', value: '"Lato", sans-serif' },
        { name: 'Montserrat', value: '"Montserrat", sans-serif' },
        { name: 'Poppins', value: '"Poppins", sans-serif' },
        { name: 'Inter', value: '"Inter", sans-serif' },
        { name: 'Playfair Display', value: '"Playfair Display", serif' },
        { name: 'Merriweather', value: '"Merriweather", serif' },
        { name: 'Raleway', value: '"Raleway", sans-serif' },
        { name: 'Ubuntu', value: '"Ubuntu", sans-serif' },
        { name: 'Oswald', value: '"Oswald", sans-serif' },
        { name: 'Dancing Script', value: '"Dancing Script", cursive' },
        { name: 'Pacifico', value: '"Pacifico", cursive' },
        { name: 'Comfortaa', value: '"Comfortaa", sans-serif' },
        { name: 'Nunito', value: '"Nunito", sans-serif' },
        { name: 'Source Sans Pro', value: '"Source Sans Pro", sans-serif' },
        { name: 'Crimson Text', value: '"Crimson Text", serif' },
      ];
    }
    return AVAILABLE_FONTS;
  };

  // 当图层进入编辑模式时，自动聚焦输入框
  useEffect(() => {
    if (selectedLayerId && inputRef.current) {
      const layer = textLayers.find(l => l.id === selectedLayerId);
      if (layer && layer.isEditing) {
        // 使用 setTimeout 确保 DOM 已更新
        setTimeout(() => {
          inputRef.current?.focus();
          // 将光标移到文本末尾
          if (inputRef.current) {
            const length = inputRef.current.value.length;
            inputRef.current.setSelectionRange(length, length);
          }
        }, 0);
      }
    }
  }, [selectedLayerId, textLayers]);

  // 加载 Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&family=Noto+Serif+SC:wght@400;700&family=Roboto:wght@400;700&family=Open+Sans:wght@400;700&family=Lato:wght@400;700&family=Montserrat:wght@400;700&family=Poppins:wght@400;700&family=Inter:wght@400;700&family=Playfair+Display:wght@400;700&family=Merriweather:wght@400;700&family=Raleway:wght@400;700&family=Ubuntu:wght@400;700&family=Oswald:wght@400;700&family=Dancing+Script:wght@400;700&family=Pacifico&family=Comfortaa:wght@400;700&family=Nunito:wght@400;700&family=Source+Sans+Pro:wght@400;700&family=Crimson+Text:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  // 加载图片 - 当 imageUrl 变化时，只更新图片，不清空文字图层
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;
    img.onload = () => {
      imageRef.current = img;
      // 使用 requestAnimationFrame 确保平滑更新
      requestAnimationFrame(() => {
        const canvas = canvasRef.current;
        if (!canvas || !imageRef.current) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        canvas.width = imageRef.current.width;
        canvas.height = imageRef.current.height;
        ctx.drawImage(imageRef.current, 0, 0);
      });
    };
    // 注意：不在这里清空 textLayers，保持用户已添加的文字
  }, [imageUrl]); // 移除 drawCanvas 依赖，直接在这里绘制

  // 绘制 Canvas - 页面上只显示图片，不绘制文字（避免重复显示）
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = imageRef.current.width;
    canvas.height = imageRef.current.height;

    // 只绘制图片，不绘制文字（文字在覆盖层显示）
    ctx.drawImage(imageRef.current, 0, 0);
  }, []);

  // 绘制 Canvas 用于下载（包含文字）
  const drawCanvasForDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = imageRef.current.width;
    canvas.height = imageRef.current.height;

    ctx.drawImage(imageRef.current, 0, 0);

    // 绘制所有非编辑状态的文字到 Canvas（用于下载）
    textLayers.forEach(layer => {
      if (layer.isEditing) return; // 编辑中的文字不绘制到 canvas
      
      ctx.save();
      ctx.globalAlpha = layer.opacity;
      ctx.font = `${layer.fontStyle} ${layer.fontWeight} ${layer.fontSize}px ${layer.fontFamily}`;
      ctx.fillStyle = layer.color;
      ctx.textBaseline = 'top';
      
      // 支持多行文本
      const lines = layer.text.split('\n');
      const lineHeight = layer.fontSize * 1.2; // 行高
      
      lines.forEach((line, index) => {
        ctx.fillText(line, layer.x, layer.y + index * lineHeight);
      });
      
      ctx.restore();
    });
  }, [textLayers]);

  useEffect(() => {
    if (imageRef.current) {
      drawCanvas();
    }
  }, [drawCanvas]);

  // 添加文字 - 直接在图片上创建文本框，每次在不同位置
  const handleAddText = () => {
    if (!imageRef.current || !containerRef.current) return;
    
    // 直接添加，不延迟，因为文字层使用绝对定位不会影响布局
    const containerRect = containerRef.current.getBoundingClientRect();
    const scaleX = imageRef.current.width / containerRect.width;
    const scaleY = imageRef.current.height / containerRect.height;
    
    // 随机位置，避免重叠
    const randomX = Math.random() * (containerRect.width * 0.6) + containerRect.width * 0.2;
    const randomY = Math.random() * (containerRect.height * 0.6) + containerRect.height * 0.2;
    
    const newLayer: TextLayer = {
      id: Date.now().toString(),
      text: '',
      x: randomX * scaleX,
      y: randomY * scaleY,
      width: 200 * scaleX,
      height: 100 * scaleY,
      fontSize: 100,
      fontFamily: AVAILABLE_FONTS[0].value,
      fontWeight: 'normal',
      fontStyle: 'normal',
      color: '#FFFFFF',
      opacity: 1,
      isEditing: true,
    };
    
    setTextLayers(prev => [...prev, newLayer]);
    setSelectedLayerId(newLayer.id);
  };

  // 更新文字层
  const updateLayer = (id: string, updates: Partial<TextLayer>) => {
    setTextLayers(layers =>
      layers.map(layer => layer.id === id ? { ...layer, ...updates } : layer)
    );
  };

  // 删除文字层
  const deleteLayer = (id: string) => {
    setTextLayers(layers => layers.filter(layer => layer.id !== id));
    if (selectedLayerId === id) {
      setSelectedLayerId(null);
    }
  };

  // 切换加粗
  const toggleBold = () => {
    if (selectedLayer) {
      updateLayer(selectedLayer.id, {
        fontWeight: selectedLayer.fontWeight === 'bold' ? 'normal' : 'bold'
      });
    }
  };

  // 切换斜体
  const toggleItalic = () => {
    if (selectedLayer) {
      updateLayer(selectedLayer.id, {
        fontStyle: selectedLayer.fontStyle === 'italic' ? 'normal' : 'italic'
      });
    }
  };

  // 设置字体
  const setFont = (fontValue: string) => {
    if (selectedLayer) {
      updateLayer(selectedLayer.id, { fontFamily: fontValue });
    }
    setShowFontModal(false);
  };

  // 设置字体大小
  const setFontSize = (size: number) => {
    if (selectedLayer) {
      updateLayer(selectedLayer.id, { fontSize: size });
    }
  };

  // 设置颜色
  const setColor = (color: string) => {
    if (selectedLayer) {
      updateLayer(selectedLayer.id, { color });
    }
    setShowColorModal(false);
  };

  // 设置透明度
  const setOpacity = (opacity: number) => {
    if (selectedLayer) {
      updateLayer(selectedLayer.id, { opacity: opacity / 100 });
    }
  };

  // 下载图片
  const handleDownload = () => {
    // 下载时绘制包含文字的 Canvas
    drawCanvasForDownload();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');
    onDownload(dataUrl);
    
    // 下载后恢复只显示图片的 Canvas
    setTimeout(() => {
      drawCanvas();
    }, 100);
  };

  // 获取缩放比例
  const getScale = () => {
    if (!containerRef.current || !imageRef.current) return { x: 1, y: 1 };
    const rect = containerRef.current.getBoundingClientRect();
    return {
      x: imageRef.current.width / rect.width,
      y: imageRef.current.height / rect.height
    };
  };

  // 拖拽文字
  const handleMouseDown = (e: React.MouseEvent, layerId: string, corner?: string) => {
    if (!containerRef.current || !imageRef.current) return;
    
    const layer = textLayers.find(l => l.id === layerId);
    if (!layer || layer.isEditing) return;

    if (corner) {
      // 缩放模式
      setIsResizing(corner);
      const scale = getScale();
      setResizeStart({
        x: e.clientX,
        y: e.clientY,
        width: layer.width / scale.x,
        height: layer.height / scale.y,
      });
    } else {
      // 拖拽模式
      setIsDragging(true);
      setSelectedLayerId(layerId);
      const scale = getScale();
      const rect = containerRef.current.getBoundingClientRect();
      const startX = (e.clientX - rect.left) * scale.x - layer.x;
      const startY = (e.clientY - rect.top) * scale.y - layer.y;

      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current || !imageRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const scale = getScale();
        
        const newX = (e.clientX - rect.left) * scale.x - startX;
        const newY = (e.clientY - rect.top) * scale.y - startY;
        updateLayer(layerId, { 
          x: Math.max(0, Math.min(newX, imageRef.current.width)), 
          y: Math.max(0, Math.min(newY, imageRef.current.height)) 
        });
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        setIsDragging(false);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return; // 提前返回，避免执行下面的代码
    }
    
    setSelectedLayerId(layerId);
    e.preventDefault();
    e.stopPropagation();
  };

  // 处理缩放 - 文字大小与文本框保持同样比例，平滑缩放
  useEffect(() => {
    if (!isResizing || !selectedLayer) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !imageRef.current || !selectedLayer) return;
      
      const scale = getScale();
      // 直接使用鼠标移动距离，不使用缩放因子，使缩放更平滑自然
      const deltaX = (e.clientX - resizeStart.x) * scale.x;
      const deltaY = (e.clientY - resizeStart.y) * scale.y;
      
      // 获取初始尺寸（在显示坐标系中）
      const startWidth = resizeStart.width * scale.x;
      const startHeight = resizeStart.height * scale.y;
      
      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = selectedLayer.x;
      let newY = selectedLayer.y;

      switch (isResizing) {
        case 'nw':
          newWidth = Math.max(20 * scale.x, startWidth - deltaX);
          newHeight = Math.max(20 * scale.y, startHeight - deltaY);
          newX = selectedLayer.x + (startWidth - newWidth) / scale.x;
          newY = selectedLayer.y + (startHeight - newHeight) / scale.y;
          break;
        case 'ne':
          newWidth = Math.max(20 * scale.x, startWidth + deltaX);
          newHeight = Math.max(20 * scale.y, startHeight - deltaY);
          newY = selectedLayer.y + (startHeight - newHeight) / scale.y;
          break;
        case 'sw':
          newWidth = Math.max(20 * scale.x, startWidth - deltaX);
          newHeight = Math.max(20 * scale.y, startHeight + deltaY);
          newX = selectedLayer.x + (startWidth - newWidth) / scale.x;
          break;
        case 'se':
          newWidth = Math.max(20 * scale.x, startWidth + deltaX);
          newHeight = Math.max(20 * scale.y, startHeight + deltaY);
          break;
      }

      // 计算缩放比例 - 使用宽度比例，确保文字与文本框保持相同缩放比例
      const widthRatio = newWidth / startWidth;
      
      // 根据宽度缩放比例调整字体大小，保持与文本框相同的缩放比例
      const newFontSize = Math.max(1, Math.min(1000, selectedLayer.fontSize * widthRatio));
      
      // 更新宽度和高度（转回原始图片坐标系）
      const newWidthInImage = newWidth / scale.x;
      const newHeightInImage = newHeight / scale.y;

      updateLayer(selectedLayer.id, {
        width: newWidthInImage,
        height: newHeightInImage,
        x: newX,
        y: newY,
        fontSize: newFontSize,
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      setIsResizing(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, resizeStart, selectedLayer]);

  // 处理文字输入
  const handleTextChange = (id: string, text: string) => {
    // 只更新文字内容，保持编辑状态不变（isEditing 应该始终为 true，直到 blur）
    updateLayer(id, { text });
  };

  const handleTextBlur = (id: string) => {
    const layer = textLayers.find(l => l.id === id);
    if (layer && layer.text.trim() === '') {
      deleteLayer(id);
    } else {
      // 退出编辑模式时，保持当前文本框的大小，不突然改变
      updateLayer(id, { isEditing: false });
    }
  };

  // 处理键盘删除
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedLayerId && (e.key === 'Delete' || e.key === 'Backspace')) {
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault();
          deleteLayer(selectedLayerId);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedLayerId]);

  // 点击外部关闭弹窗
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showFontModal || showSizeModal || showColorModal || showOpacityModal) {
        const target = e.target as HTMLElement;
        if (!target.closest('.modal-container')) {
          setShowFontModal(false);
          setShowSizeModal(false);
          setShowColorModal(false);
          setShowOpacityModal(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showFontModal, showSizeModal, showColorModal, showOpacityModal]);

  return (
    <div className="flex items-center gap-3">
      {/* Canvas 容器 */}
      <div 
        ref={containerRef}
        className="relative bg-gray-100 rounded-lg overflow-visible flex-1"
        style={{ 
          position: 'relative', 
          minHeight: '0',
          display: 'inline-block',
          width: '100%',
        }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-auto"
          style={{ 
            display: 'block', 
            pointerEvents: 'none',
            position: 'relative',
            zIndex: 1,
          }}
        />
        
        {/* 文字层覆盖层（用于交互）- 完全浮在图片上方 */}
        {imageRef.current && textLayers.map(layer => {
          const containerRect = containerRef.current?.getBoundingClientRect();
          if (!containerRect) return null;
          
          const scaleX = containerRect.width / imageRef.current!.width;
          const scaleY = containerRect.height / imageRef.current!.height;
          const isSelected = selectedLayerId === layer.id;
          
          return (
            <div
              key={layer.id}
              className={`absolute ${
                isSelected ? 'ring-2 ring-blue-400' : ''
              }`}
              style={{
                left: `${layer.x * scaleX}px`,
                top: `${layer.y * scaleY}px`,
                width: layer.isEditing ? 'auto' : `${layer.width * scaleX}px`,
                height: layer.isEditing ? 'auto' : `${layer.height * scaleY}px`,
                minWidth: '20px',
                minHeight: '20px',
                position: 'absolute',
                zIndex: 10,
                pointerEvents: 'auto',
              }}
            >
              {layer.isEditing ? (
                <textarea
                  ref={isSelected ? inputRef : null}
                  value={layer.text || ''}
                  onChange={(e) => {
                    e.stopPropagation();
                    const newText = e.target.value;
                    handleTextChange(layer.id, newText);
                    
                    // 自动调整 textarea 高度以适应内容
                    const textarea = e.target;
                    textarea.style.height = 'auto';
                    textarea.style.height = `${Math.max(textarea.scrollHeight, 40)}px`;
                  }}
                  onBlur={(e) => {
                    // 在 blur 时，保持当前输入框的实际显示尺寸，避免突然改变大小
                    if (e.target && imageRef.current && containerRef.current) {
                      const textareaElement = e.target as HTMLTextAreaElement;
                      const containerRect = containerRef.current.getBoundingClientRect();
                      // 使用与渲染时相同的 scaleX 定义：显示宽度 / 图像宽度
                      const scaleX = containerRect.width / imageRef.current.width;
                      const scaleY = containerRect.height / imageRef.current.height;
                      
                      // 获取输入框的实际显示尺寸（包括 padding 和 border）
                      const textareaRect = textareaElement.getBoundingClientRect();
                      const displayWidth = textareaRect.width;
                      const displayHeight = textareaRect.height;
                      
                      // 转换为图像坐标：显示坐标 / scaleX = 图像坐标
                      const imageWidth = displayWidth / scaleX;
                      const imageHeight = displayHeight / scaleY;
                      
                      // 始终更新为当前输入框的显示尺寸，确保输入框和显示框大小一致
                      // 这样退出编辑后，文本框大小与输入框一致，不会突然变大或变小
                      updateLayer(layer.id, {
                        width: imageWidth,
                        height: imageHeight,
                      });
                    }
                    handleTextBlur(layer.id);
                  }}
                  onKeyDown={(e) => {
                    // Ctrl+Enter 或 Cmd+Enter：换行（插入换行符）
                    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                      // 不阻止默认行为，让 textarea 自然换行
                      // 不调用 stopPropagation，允许事件正常传播
                      return;
                    }
                    // Enter：确认输入（退出编辑模式）
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      e.stopPropagation();
                      e.currentTarget.blur();
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-transparent border-2 border-blue-400 rounded px-2 outline-none resize-none"
                  style={{
                    fontSize: `${layer.fontSize * scaleX}px`,
                    fontFamily: layer.fontFamily,
                    fontWeight: layer.fontWeight,
                    fontStyle: layer.fontStyle,
                    color: layer.color,
                    opacity: layer.opacity,
                    caretColor: layer.color,
                    lineHeight: '1.2',
                    padding: '4px 8px',
                    margin: '0',
                    display: 'block',
                    minWidth: '100px',
                    width: '200px',
                    minHeight: '40px',
                    height: 'auto',
                    overflow: 'auto',
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-wrap',
                    resize: 'none',
                  }}
                  autoFocus
                />
              ) : (
                <>
                  <div
                    onClick={() => setSelectedLayerId(layer.id)}
                    onDoubleClick={(e) => {
                      // 双击进入编辑模式
                      e.stopPropagation();
                      updateLayer(layer.id, { isEditing: true });
                      setSelectedLayerId(layer.id);
                    }}
                    onMouseDown={(e) => {
                      // 如果点击的不是控制点，则开始拖拽
                      const target = e.target as HTMLElement;
                      if (!target.closest('.resize-handle') && !target.closest('.delete-button')) {
                        handleMouseDown(e, layer.id);
                      }
                    }}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      deleteLayer(layer.id);
                    }}
                    className="w-full h-full cursor-move flex items-center justify-center overflow-hidden"
                    style={{
                      fontSize: `${layer.fontSize * scaleX}px`,
                      fontFamily: layer.fontFamily,
                      fontWeight: layer.fontWeight,
                      fontStyle: layer.fontStyle,
                      color: layer.color,
                      opacity: layer.opacity,
                      userSelect: 'none',
                      lineHeight: '1.2',
                      whiteSpace: 'pre-wrap',
                      padding: '4px 8px',
                      boxSizing: 'border-box',
                      textAlign: 'center',
                      wordBreak: 'break-word',
                      overflow: 'hidden',
                    }}
                  >
                    {layer.text}
                  </div>
                  
                  {isSelected && (
                    <>
                      {/* 四个角的缩放控制点 - 缩小尺寸 */}
                      {['nw', 'ne', 'sw', 'se'].map(corner => (
                        <div
                          key={corner}
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            handleMouseDown(e, layer.id, corner);
                          }}
                          className="resize-handle absolute bg-blue-500 border border-white rounded-full z-10"
                          style={{
                            width: '8px',
                            height: '8px',
                            left: corner.includes('w') ? '-4px' : 'auto',
                            right: corner.includes('e') ? '-4px' : 'auto',
                            top: corner.includes('n') ? '-4px' : 'auto',
                            bottom: corner.includes('s') ? '-4px' : 'auto',
                            cursor: corner === 'nw' || corner === 'se' ? 'nwse-resize' : 'nesw-resize',
                          }}
                        />
                      ))}
                    </>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* 按钮区域 */}
      <div className="flex-shrink-0">
        <div className="space-y-1.5" style={{ width: '80px' }}>
          <button
            onClick={handleAddText}
            className="w-full px-2 py-1.5 bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100 text-xs whitespace-nowrap"
          >
            {t('textEditor.addText')}
          </button>
          
          <div className="relative modal-container">
            <button
              onClick={() => {
                if (selectedLayer) {
                  setShowFontModal(!showFontModal);
                  setShowSizeModal(false);
                  setShowColorModal(false);
                  setShowOpacityModal(false);
                }
              }}
              className="w-full px-2 py-1.5 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-xs whitespace-nowrap"
            >
              {t('textEditor.font')}
            </button>
            {showFontModal && selectedLayer && (
              <div className="absolute left-full ml-2 top-0 bg-white border border-gray-300 rounded-md shadow-lg z-50 p-2 min-w-[200px]">
                {getFonts().map(font => (
                  <button
                    key={font.value}
                    onClick={() => setFont(font.value)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm flex items-center justify-between"
                  >
                    <span style={{ fontFamily: font.value }}>Aa</span>
                    <span>{font.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="relative modal-container">
            <button
              onClick={() => {
                if (selectedLayer) {
                  setShowSizeModal(!showSizeModal);
                  setShowFontModal(false);
                  setShowColorModal(false);
                  setShowOpacityModal(false);
                }
              }}
              className="w-full px-2 py-1.5 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-xs whitespace-nowrap"
            >
              {t('textEditor.size')}
            </button>
            {showSizeModal && selectedLayer && (
              <div className="absolute left-full ml-2 top-0 bg-white border border-gray-300 rounded-md shadow-lg z-50 p-3 min-w-[150px]">
                <input
                  type="range"
                  min="1"
                  max="1000"
                  value={selectedLayer.fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full mb-2"
                />
                <div className="text-xs text-center text-gray-600">
                  {selectedLayer.fontSize}px
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={toggleItalic}
            className={`w-full px-2 py-1.5 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-xs whitespace-nowrap ${
              selectedLayer?.fontStyle === 'italic' ? 'bg-blue-50 border-blue-300' : ''
            }`}
          >
            {t('textEditor.italic')}
          </button>
          
          <button
            onClick={toggleBold}
            className={`w-full px-2 py-1.5 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-xs whitespace-nowrap ${
              selectedLayer?.fontWeight === 'bold' ? 'bg-blue-50 border-blue-300' : ''
            }`}
          >
            {t('textEditor.bold')}
          </button>
          
          <div className="relative modal-container">
            <button
              onClick={() => {
                if (selectedLayer) {
                  setShowColorModal(!showColorModal);
                  setShowFontModal(false);
                  setShowSizeModal(false);
                  setShowOpacityModal(false);
                }
              }}
              className="w-full px-2 py-1.5 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-xs whitespace-nowrap"
            >
              {t('textEditor.color')}
            </button>
            {showColorModal && selectedLayer && (
              <div className="absolute left-full ml-2 top-0 bg-white border border-gray-300 rounded-md shadow-lg z-50 p-3 min-w-[250px]">
                {/* 常用颜色 */}
                <div className="mb-3">
                  <div className="text-xs text-gray-600 mb-2">{t('textEditor.commonColors')}</div>
                  <div className="grid grid-cols-5 gap-2">
                    {COMMON_COLORS.map(color => (
                      <button
                        key={color}
                        onClick={() => setColor(color)}
                        className="w-8 h-8 rounded border border-gray-300 hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                
                {/* 色轮 */}
                <div>
                  <div className="text-xs text-gray-600 mb-2">{t('textEditor.colorWheel')}</div>
                  <div className="flex justify-center">
                    <ColorWheel
                      size={200}
                      currentColor={selectedLayer.color}
                      onColorChange={(color) => setColor(color)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="relative modal-container">
            <button
              onClick={() => {
                if (selectedLayer) {
                  setShowOpacityModal(!showOpacityModal);
                  setShowFontModal(false);
                  setShowSizeModal(false);
                  setShowColorModal(false);
                }
              }}
              className="w-full px-2 py-1.5 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-xs whitespace-nowrap"
            >
              {t('textEditor.opacity')}
            </button>
            {showOpacityModal && selectedLayer && (
              <div className="absolute left-full ml-2 top-0 bg-white border border-gray-300 rounded-md shadow-lg z-50 p-3 min-w-[120px]">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={selectedLayer.opacity * 100}
                  onChange={(e) => setOpacity(parseInt(e.target.value))}
                  className="w-full mb-2"
                />
                <div className="text-xs text-center text-gray-600">
                  {Math.round(selectedLayer.opacity * 100)}%
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={handleDownload}
            className="w-full px-2 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs whitespace-nowrap"
          >
            {t('textEditor.download')}
          </button>
        </div>
      </div>
    </div>
  );
}
