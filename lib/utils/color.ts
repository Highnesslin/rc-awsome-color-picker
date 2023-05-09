// -----------------------
// referring to:
// https://gist.github.com/mjackson/5311256

import { TRANSPARENT } from "../const";

// Assumes:
// h, s, and v in the set [0, 1]
// r, g, and b in the set [0, 255]

export const hsv2rgb = ({ h, s, v }: { h: number; s: number; v: number }) => {
  let _r, _g, _b;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      (_r = v), (_g = t), (_b = p);
      break;
    case 1:
      (_r = q), (_g = v), (_b = p);
      break;
    case 2:
      (_r = p), (_g = v), (_b = t);
      break;
    case 3:
      (_r = p), (_g = q), (_b = v);
      break;
    case 4:
      (_r = t), (_g = p), (_b = v);
      break;
    case 5:
      (_r = v), (_g = p), (_b = q);
      break;
  }

  return {
    r: Math.round((_r as number) * 255),
    g: Math.round((_g as number) * 255),
    b: Math.round((_b as number) * 255),
  };
};

export const rgb2hsv = ({ r, g, b }: { r: number; g: number; b: number }) => {
  const _r = r / 255;
  const _g = g / 255;
  const _b = b / 255;

  const max = Math.max(_r, _g, _b);
  const min = Math.min(_r, _g, _b);

  let h;
  const v = max;

  const d = max - min;
  const s = max == 0 ? 0 : d / max;

  if (max == min) {
    h = 0;
  } else {
    if (max == _r) {
      h = (_g - _b) / d + (_g < _b ? 6 : 0);
    } else if (max == _g) {
      h = (_b - _r) / d + 2;
    } else if (max == _b) {
      h = (_r - _g) / d + 4;
    }

    (h as number) /= 6;
  }

  return {
    h: h || 0,
    s: s || 0,
    v: v || 0,
  };
};

export const hex2rgb = (hex: string) => {
  if (hex.toLowerCase() === TRANSPARENT) {
    return { r: 255, g: 255, b: 255 };
  } else {
    const _hex = hex.replace(/^#/, '');

    return {
      r: parseInt(_hex.substr(0, 2), 16),
      g: parseInt(_hex.substr(2, 2), 16),
      b: parseInt(_hex.substr(4, 2), 16),
    };
  }
};

const dec2twoDigitHex = (dec: number) => dec.toString(16).replace(/(^.$)/, '0$1');

export const rgb2hex = ({ r, g, b }: { r: number; g: number; b: number }) => {
  return `#${dec2twoDigitHex(r)}${dec2twoDigitHex(g)}${dec2twoDigitHex(b)}`;
};

export const hex2rgbaStr = (hex: string, alpha: number) => {
  const { r, g, b } = hex2rgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const rgb2rgbaStr = ({ r, g, b, a = 1 }: { r: number; g: number; b: number; a?: number }) => `rgba(${r}, ${g}, ${b}, ${a})`;

const DEFAULT_COLOR = {
  hex: '#fff',
  alpha: 1
}

export const parseColor = (c: string) => {
  const color = c.trim().toLowerCase() // keep lower cases hex in the component
  const rgbaExtractor = /^rgba?\((.*)\)$/
  const hexExtractor = /^#([a-f0-9]{6}|[a-f0-9]{3})([a-f0-9]{2})?$/i

  let retMatch
  if (color.match(/transparent/)) {
    return {
      hex: TRANSPARENT,
      alpha: 0
    }
  } else if (retMatch = color.match(hexExtractor)) {
    const alphaHex = retMatch[2] || 'ff'
    const alphaDecimal = Number((parseInt(alphaHex, 16) / 255).toFixed(2));

    return {
      hex: '#' + retMatch[1],
      alpha: alphaDecimal
    }
  } else if (retMatch = color.match(rgbaExtractor)) {
    const rgbaStr = retMatch[1]

    const [r, g, b, a] = rgbaStr.split(',').map(i => i.trim())

    return {
      hex: rgb2hex({
        r: parseInt(r),
        g: parseInt(g),
        b: parseInt(b),
      }),
      alpha: !a ? 1 : parseFloat(a)
    }
  } else {
    return DEFAULT_COLOR
  }
}


export const format3DigitValue = (hex: string) => `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
