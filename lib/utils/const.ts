export enum INPUT_MODE {
  HEX = 'Hex',
  RGB = 'Rgb'
}

export enum SELECT_MODE {
  PALETTE = 'palette',
  PRESET = 'preset',
}

export const TRANSPARENT = 'transparent'

export const STANDARD_TRANSPARENT = 'TRANSPARENT'

export const DEFAULT_THEME = {
  light: {
    bgColor: '#fff',
    tc: '#415058',
    lightTc: '#415058',
    darkTc: '#8d9ea7',
    borderColor: '#dedee4',
    colorBlock: {
      border: 'rgba(0, 0, 0, 0.08)',
    },
    icon: {
      close: {
        hover: '#415058',
      },
      piker: {
        bg: '#fff',
        border: '#8d9ea7',
      },
      drop: {
        tc: '#8D9EA7',
        hover: '#5B6B73',
      },
      select: '#8D9EA7',
    },
    input: {
      bg: '#f6f7f8',
      border: '#f2f2f3',
      hover: {
        border: '#1e98ea',
      },
    },
    menu: {
      bg: '#fff',
      shadow: '0 2px 10px 0 rgba(39,54,78,0.08), 4px 12px 40px 0 rgba(39,54,78,0.1)',
      hover: {
        optionBg: '#f6f7f8',
        tc: '#298df8',
      },
    },
  },
};