import { useId } from 'react';

export interface BrandLogoMarkProps {
  className?: string;
  variant?: 'mark' | 'artwork';
}

export function BrandLogoMark({
  className = 'h-9 w-9 shrink-0',
  variant = 'mark',
}: BrandLogoMarkProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const warmId = `dpWarm-${uid}`;
  const glowId = `dpGlow-${uid}`;

  const isMark = variant === 'mark';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={isMark ? '18 18 324 324' : '0 0 360 360'}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={warmId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C2185B" />
          <stop offset="52%" stopColor="#F04438" />
          <stop offset="100%" stopColor="#FF8A3D" />
        </linearGradient>
        <linearGradient id={glowId} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF8A3D" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#C2185B" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <rect
        x="24"
        y="24"
        width="312"
        height="312"
        rx={isMark ? '44' : '36'}
        fill="#FFFFFF"
        stroke={isMark ? '#D4D2CF' : '#DEDCD9'}
        strokeWidth={isMark ? '5' : '2'}
      />
      <circle cx="212" cy="148" r="106" fill={`url(#${warmId})`} />
      <rect
        x="44"
        y="168"
        width="144"
        height="144"
        rx={isMark ? '26' : '22'}
        fill="#F2F2F2"
        stroke="#171717"
        strokeWidth={isMark ? '6.5' : '2.5'}
      />
      <circle cx="116" cy="240" r="46" fill={`url(#${glowId})`} />
      <path
        d={isMark ? 'M54 84 H158 M54 106 H126' : 'M52 84 H158 M52 104 H126'}
        stroke="#171717"
        strokeWidth={isMark ? '12' : '6'}
        strokeLinecap="round"
      />
      <rect
        x="210"
        y="218"
        width="96"
        height="44"
        rx="22"
        fill="#F2F2F2"
        stroke="#171717"
        strokeWidth={isMark ? '6.5' : '2.5'}
      />
    </svg>
  );
}

