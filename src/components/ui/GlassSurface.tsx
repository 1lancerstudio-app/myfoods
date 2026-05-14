import React, { useEffect, useState, useMemo } from 'react';

export interface GlassSurfaceProps {
  children?: React.ReactNode;
  borderRadius?: number;
  backgroundOpacity?: number;
  saturation?: number;
  blur?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Whether to enable advanced SVG refraction (performance intensive) */
  advanced?: boolean;
}

const GlassSurface: React.FC<GlassSurfaceProps> = React.memo(({
  children,
  borderRadius = 32,
  backgroundOpacity = 0.25,
  saturation = 1.8,
  blur = 20,
  className = '',
  style = {},
  advanced = false
}) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const containerStyle = useMemo((): React.CSSProperties => {
    const bg = isDark 
      ? `rgba(255, 255, 255, 0.08)` 
      : `rgba(255, 255, 255, ${backgroundOpacity * 0.8})`; // Mix with brand tint
      
    const brandTint = isDark ? '' : `linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(47, 116, 61, 0.05))`;

    return {
      ...style,
      borderRadius: `${borderRadius}px`,
      background: brandTint ? `${brandTint}, ${bg}` : bg,
      backdropFilter: `blur(${blur}px) saturate(${saturation})`,
      WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation})`,
      border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(255, 255, 255, 0.4)',
      boxShadow: isDark 
        ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1)' 
        : '0 8px 32px rgba(31, 38, 135, 0.07), inset 0 0 0 1px rgba(255, 255, 255, 0.4)',
      position: 'relative',
      overflow: 'hidden',
    };
  }, [isDark, borderRadius, backgroundOpacity, saturation, blur, style]);

  return (
    <div className={`glass-surface-container ${className}`} style={containerStyle}>
      {/* Optional: Add a subtle inner shine/gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
});

GlassSurface.displayName = 'GlassSurface';

export default GlassSurface;
