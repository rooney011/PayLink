import React, { useEffect, useRef } from 'react';

interface TradingChartProps {
  timeframe: '1D' | '7D' | '1M' | '3M' | '1Y';
  theme: 'light' | 'dark';
}

const TradingChart: React.FC<TradingChartProps> = ({ timeframe, theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Generate mock data based on timeframe
    const generateData = (points: number) => {
      const data = [];
      let baseValue = 1000;
      for (let i = 0; i < points; i++) {
        baseValue += (Math.random() - 0.5) * 100;
        data.push(Math.max(0, baseValue));
      }
      return data;
    };

    const dataPoints = {
      '1D': generateData(24),
      '7D': generateData(7),
      '1M': generateData(30),
      '3M': generateData(90),
      '1Y': generateData(365)
    };

    const data = dataPoints[timeframe];
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue;

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Colors based on theme
    const colors = {
      line: theme === 'dark' ? '#10b981' : '#059669',
      gradient: theme === 'dark' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(5, 150, 105, 0.1)',
      grid: theme === 'dark' ? 'rgba(75, 85, 99, 0.3)' : 'rgba(156, 163, 175, 0.3)',
      text: theme === 'dark' ? '#d1d5db' : '#6b7280'
    };

    // Draw grid
    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = (rect.height / 5) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(rect.width, y);
      ctx.stroke();
    }

    // Vertical grid lines
    const verticalLines = Math.min(data.length, 10);
    for (let i = 0; i <= verticalLines; i++) {
      const x = (rect.width / verticalLines) * i;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, rect.height);
      ctx.stroke();
    }

    // Draw area under curve
    const gradient = ctx.createLinearGradient(0, 0, 0, rect.height);
    gradient.addColorStop(0, colors.line);
    gradient.addColorStop(1, colors.gradient);
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(0, rect.height);
    
    data.forEach((value, index) => {
      const x = (rect.width / (data.length - 1)) * index;
      const y = rect.height - ((value - minValue) / range) * rect.height;
      if (index === 0) {
        ctx.lineTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.lineTo(rect.width, rect.height);
    ctx.closePath();
    ctx.fill();

    // Draw line
    ctx.strokeStyle = colors.line;
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    data.forEach((value, index) => {
      const x = (rect.width / (data.length - 1)) * index;
      const y = rect.height - ((value - minValue) / range) * rect.height;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();

    // Draw data points
    ctx.fillStyle = colors.line;
    data.forEach((value, index) => {
      const x = (rect.width / (data.length - 1)) * index;
      const y = rect.height - ((value - minValue) / range) * rect.height;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });

  }, [timeframe, theme]);

  return (
    <div className="relative w-full h-80">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default TradingChart;