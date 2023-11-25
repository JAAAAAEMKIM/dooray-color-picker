import { SERVICE, THEME_COLOR_HSL } from '../constants';

export type RGB = { r: number; g: number; b: number };
export type HSL = { h: number; s: number; l: number };
export type HEX = string;
export type RgbString = string;

export const hslToRgb = ({ h, s, l }: HSL) => {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  r = Math.min(Math.max(0, r), 255);
  g = Math.min(Math.max(0, g), 255);
  b = Math.min(Math.max(0, b), 255);

  return { r, g, b };
};
export const toRgbString = ({ r, g, b }: RGB) => `rgb(${r}, ${g}, ${b})`;

export const getTheme = ({ h, s, l }: HSL) => [
  { h, s, l },
  { h, s: 100, l: 94 },
  { h, s: 82, l: 89 },
  { h, s: 82, l: 21 },
];

export const hexToRgb = (hex: HEX): RGB => {
  const cleanHex = hex.replace('#', '');
  const bigint = parseInt(cleanHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
};

export const rgbToHsl = ({ r, g, b }: RGB): HSL => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  // Calculate the lightness
  const lightness = (max + min) / 2;

  // Calculate the saturation
  let saturation;
  if (max === min) {
    saturation = 0;
  } else {
    const delta = max - min;
    saturation = delta / (1 - Math.abs(2 * lightness - 1));
  }

  // Calculate the hue
  let hue = 0;
  if (max !== min) {
    if (max === r) {
      hue = ((g - b) / (max - min)) % 6;
    } else if (max === g) {
      hue = (b - r) / (max - min) + 2;
    } else {
      hue = (r - g) / (max - min) + 4;
    }
  }
  hue *= 60;
  if (hue < 0) {
    hue += 360;
  }

  return { h: hue, s: saturation * 100, l: lightness * 100 };
};

const componentToHex = (c: number) => {
  const hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
};

export const rgbToHex = ({ r, g, b }: RGB): HEX => {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

export const hexToHsl = (hex: HEX) => rgbToHsl(hexToRgb(hex));
export const hslToHex = (hsl: HSL) => rgbToHex(hslToRgb(hsl));
export const hslToRgbString = (hsl: HSL) => toRgbString(hslToRgb(hsl));

export const getColorMappingByService = (service: SERVICE, value: HEX) => {
  const targetColors = getTheme(THEME_COLOR_HSL[service]).map(hslToRgbString);
  const toBeColors = getTheme(hexToHsl(value)).map(hslToRgbString);
  return Object.fromEntries(
    targetColors.map((target, index) => [target, toBeColors[index]])
  );
};

const rgbStringToRgb = (str: RgbString) => {
  const [r, g, b] = str.substring(4, str.length - 1).split(', ');
  return { r: Number(r), g: Number(g), b: Number(b) };
};
export const rgbSringToHsl = (str: RgbString) => rgbToHsl(rgbStringToRgb(str));
export const rgbStringToHex = (str: RgbString) => rgbToHex(rgbStringToRgb(str));
