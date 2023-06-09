// -----------------------
// referring to:
// https://gist.github.com/mjackson/5311256

import { TRANSPARENT } from "../utils/const";

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

/**
 * Ensure that the length of hex is 6
 * @param hex 
 */
export const normalizeHexValue = (hex: string) => {
  // let _hex = hex.match(/^#/) ? hex : `#${hex}`;
  let _hex = hex.replace(/^#/, '');

  if (_hex.length === 3) {
    _hex = _hex[0] + _hex[0] + _hex[1] + _hex[1] + _hex[2] + _hex[2];
  }

  return _hex.toUpperCase()
}

export const hex2rgb = (hex: string) => {
  if (hex.toLowerCase() === TRANSPARENT) {
    return { r: 255, g: 255, b: 255 };
  } else {
    let _hex = hex.replace(/^#/, '');

    if (_hex.length === 3) {
      _hex = _hex[0] + _hex[0] + _hex[1] + _hex[1] + _hex[2] + _hex[2];
    }

    return {
      r: parseInt(_hex.substring(0, 2), 16),
      g: parseInt(_hex.substring(2, 4), 16),
      b: parseInt(_hex.substring(4, 6), 16)
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

/**
 * Ensure 'value' is hex
 */
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

const gradientRegex = /^(linear-gradient)\((to [a-z]+), ?((rgba?\([\d\s.,]+\)|[#a-fA-F0-9])+ (\d+%)(, (rgba?\([\d\s.,]+\)|[#a-fA-F0-9])+ (\d+%))*)\)$/

const colorAndPosRegx = /(rgba?\([^)]*\)|#[0-9a-fA-F]{3,6})\s+(\d+%)/g

interface MatchLinearGradientRes {
  linearColor: string
  direction: string
  colors: string[]
  pos: number[]
}
export const matchLinearGradient = (gradientVal: string): MatchLinearGradientRes => {
  const match = gradientVal.match(gradientRegex)
  if (!match) {
    gradientVal = 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgb(228, 255, 0) 10%, #dd3b3b 90%, rgba(255, 255, 255, 0) 100%)'
    return matchLinearGradient(gradientVal)
  }
  
  const [, , direction] = match

  const colors: string[] = []
  const stops: number[] = []
  gradientVal.replace(colorAndPosRegx, (_, color, percent) => {
    colors.push(color);
    stops.push(parseFloat(percent) / 100);

    return ''
  })

  return {
    linearColor: gradientVal,
    direction,
    colors,
    pos: stops
  }
}

export const genLinearGradient = (param: Pick<MatchLinearGradientRes, 'colors' | 'direction' | 'pos'>) => {
  const { direction, colors, pos } = param
  
  const linearVal = colors.reduce<string[]>((result, color, index) => {
    const curPos = pos[index] * 100
    const curColor = color

    result.push(`${curColor} ${curPos}%`)
    return result 
  }, []).join(',')

  return `linear-gradient(${direction}, ${linearVal})`
}

export enum KEY {
  PURE = 'PURE',
  LINEAR = 'LINEAR',
  RADIAL = 'RADIAL',
}
const REGX_RULES = [
  {
    key: KEY.PURE,
    regx: /^#?([a-fA-F0-9]{3}$)|([a-fA-F0-9]{6}$)|((rgba|RGB)\(\s*((25[0-5]|2[0-4]\d|1\d{1,2}|\d{1,2})\s*,){2}\s*(25[0-5]|2[0-4]\d|1\d{1,2}|\d{1,2})\s*(,\s*([01](\.\d+)?))?\))$/
  },
  {
    key: KEY.LINEAR,
    regx: /linear-gradient\([^(]*(\([^)]*\)[^(]*)*[^)]*\)/
  },
  {
    key: KEY.RADIAL,
    regx: /radial-gradient\([^(]*(\([^)]*\)[^(]*)*[^)]*\)/
  }
]
export const checkColorType = (color: string) => {
  for (const { key, regx } of REGX_RULES) {
    if (regx.test(color)) {
      return key
    }
  }

  return KEY.PURE
}
