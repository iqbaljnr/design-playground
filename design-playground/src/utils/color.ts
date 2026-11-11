export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export function normalizeHex(input: string): string | null {
  const cleaned = input.trim().replace(/^#/, '');
  if (/^[0-9a-fA-F]{3}$/.test(cleaned)) {
    const expanded = cleaned
      .split('')
      .map((c) => c + c)
      .join('');
    return `#${expanded.toUpperCase()}`;
  }
  if (/^[0-9a-fA-F]{6}$/.test(cleaned)) {
    return `#${cleaned.toUpperCase()}`;
  }
  return null;
}

export function hexToRgb(hex: string): RGB {
  const norm = normalizeHex(hex) ?? '#171717';
  const raw = norm.slice(1);
  return {
    r: parseInt(raw.slice(0, 2), 16),
    g: parseInt(raw.slice(2, 4), 16),
    b: parseInt(raw.slice(4, 6), 16),
  };
}

export function rgbToHex({ r, g, b }: RGB): string {
  const toHex = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, '0')
      .toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function rgbToHsl({ r, g, b }: RGB): HSL {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l: Math.round(l * 100) };
  }

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;

  if (max === rn) {
    h = (gn - bn) / d + (gn < bn ? 6 : 0);
  } else if (max === gn) {
    h = (bn - rn) / d + 2;
  } else {
    h = (rn - gn) / d + 4;
  }

  h /= 6;
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function hslToHex({ h, s, l }: HSL): string {
  const hn = (((h % 360) + 360) % 360) / 360;
  const sn = Math.max(0, Math.min(100, s)) / 100;
  const ln = Math.max(0, Math.min(100, l)) / 100;

  if (sn === 0) {
    const val = Math.round(ln * 255);
    return rgbToHex({ r: val, g: val, b: val });
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    let tn = t;
    if (tn < 0) tn += 1;
    if (tn > 1) tn -= 1;
    if (tn < 1 / 6) return p + (q - p) * 6 * tn;
    if (tn < 1 / 2) return q;
    if (tn < 2 / 3) return p + (q - p) * (2 / 3 - tn) * 6;
    return p;
  };

  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
  const p = 2 * ln - q;

  return rgbToHex({
    r: hue2rgb(p, q, hn + 1 / 3) * 255,
    g: hue2rgb(p, q, hn) * 255,
    b: hue2rgb(p, q, hn - 1 / 3) * 255,
  });
}

function relativeChannel(c: number): number {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

export function getRelativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  return (
    0.2126 * relativeChannel(r) +
    0.7152 * relativeChannel(g) +
    0.0722 * relativeChannel(b)
  );
}

export function getContrastRatio(fgHex: string, bgHex: string): number {
  const l1 = getRelativeLuminance(fgHex);
  const l2 = getRelativeLuminance(bgHex);
  const hi = Math.max(l1, l2);
  const lo = Math.min(l1, l2);
  return (hi + 0.05) / (lo + 0.05);
}

export function getWcagAssessment(ratio: number) {
  return {
    ratio: Number(ratio.toFixed(2)),
    aaNormal: ratio >= 4.5,
    aaLarge: ratio >= 3.0,
    aaaNormal: ratio >= 7.0,
    aaaLarge: ratio >= 4.5,
  };
}

export type HarmonyType =
  | 'complementary'
  | 'analogous'
  | 'triadic'
  | 'split-complementary'
  | 'monochromatic';

export function buildColorHarmony(baseHex: string, harmony: HarmonyType): string[] {
  const hsl = rgbToHsl(hexToRgb(baseHex));
  const { h, s, l } = hsl;

  switch (harmony) {
    case 'complementary':
      return [
        hslToHex({ h, s, l }),
        hslToHex({ h, s: Math.max(15, s - 20), l: Math.min(90, l + 26) }),
        hslToHex({ h: h + 180, s, l }),
        hslToHex({ h: h + 180, s: Math.max(15, s - 15), l: Math.max(15, l - 22) }),
      ];
    case 'analogous':
      return [
        hslToHex({ h: h - 30, s, l }),
        hslToHex({ h, s, l }),
        hslToHex({ h: h + 30, s, l }),
        hslToHex({ h: h + 60, s: Math.max(20, s - 10), l: Math.min(88, l + 15) }),
      ];
    case 'triadic':
      return [
        hslToHex({ h, s, l }),
        hslToHex({ h: h + 120, s, l }),
        hslToHex({ h: h + 240, s, l }),
        hslToHex({ h, s: Math.max(10, s - 40), l: 92 }),
      ];
    case 'split-complementary':
      return [
        hslToHex({ h, s, l }),
        hslToHex({ h: h + 150, s, l }),
        hslToHex({ h: h + 210, s, l }),
        hslToHex({ h: h + 180, s: Math.max(15, s - 30), l: Math.max(18, l - 25) }),
      ];
    case 'monochromatic':
      return [
        hslToHex({ h, s, l: Math.max(14, l - 28) }),
        hslToHex({ h, s, l: Math.max(22, l - 12) }),
        hslToHex({ h, s, l }),
        hslToHex({ h, s: Math.max(12, s - 15), l: Math.min(92, l + 24) }),
      ];
  }
}

export function getBestInkForBackground(bgHex: string): '#171717' | '#FFFFFF' {
  const darkRatio = getContrastRatio('#171717', bgHex);
  const lightRatio = getContrastRatio('#FFFFFF', bgHex);
  return darkRatio >= lightRatio ? '#171717' : '#FFFFFF';
}

