'use client';

import { useState, useRef, useEffect } from 'react';

interface ColorWheelProps {
  size?: number;
  onColorChange: (color: string) => void;
  currentColor: string;
}

export default function ColorWheel({ size = 200, onColorChange, currentColor }: ColorWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 10;

    // 绘制色轮 - 使用更精细的角度步进
    for (let angle = 0; angle < 360; angle += 1) {
      const startAngle = (angle - 0.5) * Math.PI / 180;
      const endAngle = (angle + 0.5) * Math.PI / 180;
      
      // 根据角度计算色相
      const hue = angle;
      
      // 绘制从中心到边缘的扇形
      for (let r = 0; r <= radius; r += 2) {
        const distanceRatio = r / radius;
        // 饱和度从中心100%到边缘100%（保持不变）
        const saturation = 100;
        // 亮度从中心100%（白色）到边缘50%（纯色）再到边缘0%（黑色）
        let lightness;
        if (distanceRatio < 0.5) {
          lightness = 100 - distanceRatio * 100; // 从100%到50%
        } else {
          lightness = 50 - (distanceRatio - 0.5) * 100; // 从50%到0%
        }
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, startAngle, endAngle);
        ctx.arc(centerX, centerY, Math.min(r + 2, radius), endAngle, startAngle, true);
        ctx.closePath();
        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        ctx.fill();
      }
    }
  }, [size]);

  const getColorAtPoint = (x: number, y: number): string => {
    const canvas = canvasRef.current;
    if (!canvas) return currentColor;

    const centerX = size / 2;
    const centerY = size / 2;
    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const radius = size / 2 - 10;

    if (distance > radius) return currentColor;

    const angle = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360;
    const saturation = 100;
    
    // 亮度计算：从中心100%到边缘0%
    const distanceRatio = distance / radius;
    let lightness;
    if (distanceRatio < 0.5) {
      lightness = 100 - distanceRatio * 100; // 从100%到50%
    } else {
      lightness = 50 - (distanceRatio - 0.5) * 100; // 从50%到0%
    }

    return `hsl(${angle}, ${saturation}%, ${lightness}%)`;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const color = getColorAtPoint(x, y);
    onColorChange(color);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const color = getColorAtPoint(x, y);
    onColorChange(color);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const color = getColorAtPoint(x, y);
      onColorChange(color);
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, onColorChange]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="cursor-crosshair rounded-full"
      style={{ display: 'block' }}
    />
  );
}

