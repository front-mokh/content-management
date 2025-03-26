import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';

// Define the props type for the KPICard component
interface KPICardProps {
  title: string;
  value: number | string;
  subtext?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendPercentage?: number;
  variant?: 'default' | 'gradient' | 'outline';
  hoverColor?: string; // New prop for custom hover color
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  subtext,
  icon,
  trend = 'neutral',
  trendPercentage,
  variant = 'default',
  hoverColor = 'bg-blue-500' // Default to blue if not specified
}) => {
  // Determine trend icon and color
  const getTrendIcon = () => {
    switch(trend) {
      case 'up':
        return <TrendingUp className="text-green-500 w-4 h-4" />;
      case 'down':
        return <TrendingDown className="text-red-500 w-4 h-4" />;
      default:
        return null;
    }
  };

  // Determine trend color and text
  const getTrendColor = () => {
    switch(trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  // Variant-based styling
  const getVariantClasses = () => {
    switch(variant) {
      case 'gradient':
        return 'bg-gradient-to-br from-white/10 to-white/30 border-2 border-white/20 shadow-xl';
      case 'outline':
        return 'border-2 border-gray-200 bg-white/50 backdrop-blur-sm';
      default:
        return 'bg-white border border-gray-100 shadow-md';
    }
  };

  return (
    <Card 
      className={`
        ${getVariantClasses()} 
        rounded-2xl 
        overflow-hidden 
        relative 
        transform 
        transition-all 
        duration-300 
        hover:-translate-y-2 
        hover:shadow-2xl
        group
      `}
    >
      {/* Subtle Background Motif */}
      <div 
        className="
          absolute 
          top-0 
          left-0 
          w-full 
          h-full 
          opacity-5 
          bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] 
          from-blue-100 
          via-transparent 
          to-transparent 
          pointer-events-none
        "
      />

      <CardContent className="p-6 relative z-10">
        <div className="flex items-center justify-between">
          {/* Left: Title and Value */}
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {title}
              </h3>
              {/* Optional Trend Indicator */}
              {trendPercentage !== undefined && (
                <div className={`flex items-center text-xs ${getTrendColor()}`}>
                  {getTrendIcon()}
                  <span className="ml-1">{Math.abs(trendPercentage)}%</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
              
              {/* Icon */}
              {icon && (
                <div className="
                  ml-4 
                  text-gray-400 
                  opacity-75 
                  group-hover:opacity-100 
                  group-hover:text-primary 
                  transition-all
                ">
                  {icon}
                </div>
              )}
            </div>

            {subtext && (
              <p className="mt-2 text-sm text-gray-600 flex items-center">
                {subtext}
                <ChevronRight className="ml-1 w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </p>
            )}
          </div>
        </div>
      </CardContent>

      {/* Hover Effect Indicator with Dynamic Color */}
      <div 
        className={`
          absolute 
          bottom-0 
          left-0 
          w-full 
          h-1 
          ${hoverColor}
          transform 
          scale-x-0 
          group-hover:scale-x-100 
          transition-transform 
          origin-left
        `}
      />
    </Card>
  );
};

export default KPICard;