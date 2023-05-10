import React, { HTMLAttributes } from 'react';
import HSVPicker from './HSVPicker';
import RGBInput from './RGBInput';
import HexInput from './HexInput';
import AlphaInput from './AlphaInput';
import ColorSucker from './ColorSucker';
import TabLine from './TabLine';
import { hex2rgbaStr, normalizeHexValue, parseColor, rgb2hex } from '../utils/color';
import { stopReactEventPropagation } from '../utils/DOM';
import { INPUT_MODE, SELECT_MODE, STANDARD_TRANSPARENT, TRANSPARENT } from '../const';
import { StyledColorPicker } from '../styles';
import ColorPreset from './ColorPreset';
import AlphSlider from './AlphaSlider';

const defaultTheme = {
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
export interface ColorPickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  // theme?: DefaultTheme
  value?: string;
  headerTitle?: string;
  onChange?: (color: string) => void;
  onClose?: () => void;
}
interface State {
  hex: string;
  alpha: number;
  inputMode: INPUT_MODE;
  selectMode: SELECT_MODE;
}
export default class ColorPlane extends React.PureComponent<ColorPickerProps, State> {
  static defaultProps = {
    headerTitle: '颜色设置',
  };

  static getDerivedStateFromProps(props: ColorPickerProps, state: State) {
    const { hex, alpha } = parseColor(props.value || '');

    if (hex && hex.toLowerCase() === state.hex && alpha === state.alpha) {
      return null;
    } else {
      return {
        hex,
        alpha,
      };
    }
  }

  state: State = {
    hex: '',
    alpha: 1,
    inputMode: INPUT_MODE.HEX,
    selectMode: SELECT_MODE.PALETTE,
  };

  handleRgbChange = (rgb: { r: number; g: number; b: number }) => {
    const hex = rgb2hex(rgb);
    const changeFromTransparent = this.state.hex === TRANSPARENT;
    this.hsvConfirm({ hex, a: changeFromTransparent ? 1 : this.state.alpha });
  };

  handleHexChange = (hexValue: string) => {
    const hex = hexValue.match(/^#/) ? hexValue : `#${hexValue}`;
    const changeFromTransparent = this.state.hex === TRANSPARENT;
    this.hsvConfirm({ hex, a: changeFromTransparent ? 1 : this.state.alpha });
  };

  hsvChange = ({ hex, a }: { hex?: string; a?: number }) => {
    if (!this.props.onChange) return

    const { hex: propsHex } = parseColor(this.props.value || '');
    if (!hex) hex = this.state.hex;
    if (!a && a !== 0) a = this.state.alpha;

    if (hex === TRANSPARENT && a === 0) {
      this.props.onChange(TRANSPARENT);
    } else if (hex === TRANSPARENT && a !== 0) {
      this.props.onChange(hex2rgbaStr('FFFFFF', a));
    } else {
      this.props.onChange(hex2rgbaStr(hex, propsHex === TRANSPARENT ? 1 : a));
    }
  };

  hsvConfirm = ({ hex, a }: { hex?: string; a?: number }) => {
    if (!this.props.onChange) return

    const { hex: propsHex } = parseColor(this.props.value || '');
    if (!hex) hex = this.state.hex;
    if (!a && a !== 0) a = this.state.alpha;

    if (hex === TRANSPARENT) {
      this.props.onChange(TRANSPARENT);
    } else {
      this.props.onChange(hex2rgbaStr(hex, propsHex === TRANSPARENT ? 1 : a));
    }
  };

  handleChangeAlpha = (a: number) => this.hsvConfirm({ hex: this.state.hex, a });

  handleChangeMode: React.ChangeEventHandler<HTMLSelectElement> = e => {
    const inputMode = e.target.value as INPUT_MODE;
    this.setState({ inputMode });
  };

  handleSelectMode = (selectMode: SELECT_MODE) => this.setState({ selectMode });

  render() {
    const { headerTitle, className, style, onClose } = this.props;
    const { hex, alpha, inputMode, selectMode } = this.state;

    const hexValue = !hex || hex === TRANSPARENT ? STANDARD_TRANSPARENT : normalizeHexValue(hex);

    return (
      <StyledColorPicker
        className={'rc-awsome-color-picker-body' + (className ? ` ${className}` : '')}
        style={style}
        onMouseDown={stopReactEventPropagation}
        onClick={stopReactEventPropagation}
        theme={defaultTheme.light}
      >
        <header className='color-picker-header'>
          <div className='header-text'>
            {headerTitle || (
              <>
                <div className='header-icon' title='纯色填充'>
                  <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg'>
                    <circle
                      cx='8'
                      cy='8'
                      r='7.5'
                      fill='#1684fc'
                      stroke='#1684fc'
                      strokeWidth='1px'
                      fillRule='evenodd'
                      fillOpacity='.54'
                    ></circle>
                  </svg>
                </div>
                <div className='header-icon' title='线性渐变'>
                  <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg'>
                    <defs>
                      <linearGradient x1='50%' y1='39.897%' x2='50%' y2='81.179%' id='LINEAR_ICON'>
                        <stop stopColor='#f9f9f9' offset='0%'></stop>
                        <stop stopColor='#939393' offset='100%'></stop>
                      </linearGradient>
                    </defs>
                    <circle
                      cx='32'
                      cy='8'
                      r='7.5'
                      transform='translate(-24)'
                      fill='url(#LINEAR_ICON)'
                      stroke='#6c6c6c'
                      strokeWidth='0.5px'
                      fillRule='evenodd'
                    ></circle>
                  </svg>
                </div>
                <div className='header-icon' title='径向渐变'>
                  <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg'>
                    <defs>
                      <radialGradient cx='50%' cy='50%' fx='50%' fy='50%' r='50%' id='RADIAL_ICON'>
                        <stop stopColor='#ffffff' offset='0%'></stop>
                        <stop stopColor='#ffffff' offset='37.844%'></stop>
                        <stop stopColor='#a0a0a0' offset='100%'></stop>
                      </radialGradient>
                    </defs>
                    <circle
                      cx='56'
                      cy='8'
                      r='7.5'
                      transform='translate(-48)'
                      fill='url(#RADIAL_ICON)'
                      stroke='#6c6c6c'
                      strokeWidth='0.5px'
                      fillRule='evenodd'
                    ></circle>
                  </svg>
                </div>
              </>
            )}
          </div>
          {onClose && (
            <svg
              onMouseDown={onClose}
              className='icon'
              width='12'
              height='12'
              viewBox='0 0 10 10'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M5.95 4.536l2.828 2.828a1 1 0 0 1-1.414 1.414L4.536 5.95 1.707 8.778A1 1 0 0 1 .293 7.364L3.12 4.536.293 1.707A1 1 0 0 1 1.707.293L4.536 3.12 7.364.293a1 1 0 0 1 1.414 1.414L5.95 4.536z'
                fill='#B8BCBF'
                fillRule='evenodd'
              />
            </svg>
          )}
        </header>

        <div className='color-picker-body'>
          <TabLine value={selectMode} onChange={this.handleSelectMode} />

          {selectMode === SELECT_MODE.PALETTE ? (
            <HSVPicker
              hex={hex}
              onChange={this.hsvChange}
              onConfirm={this.hsvConfirm}
              theme={defaultTheme.light}
            />
          ) : SELECT_MODE.PRESET ? (
            <ColorPreset value={hexValue} onChange={this.hsvChange} />
          ) : null}

          {/* 吸管 透明度选择器 */}
          <div className='row'>
            <div className='outside-color-picker-btn'>
              <ColorSucker onSucker={this.handleHexChange} />
            </div>

            <AlphSlider
              hex={hex}
              alpha={alpha}
              onChange={this.hsvChange}
              onConfirm={this.hsvConfirm}
            />
          </div>

          {/* 颜色输入器 */}
          <div className='input-section'>
            <select className='text' value={inputMode} onChange={this.handleChangeMode}>
              <option>{INPUT_MODE.HEX}</option>
              <option>{INPUT_MODE.RGB}</option>
            </select>

            {inputMode === INPUT_MODE.HEX && (
              <HexInput
                hexValue={hexValue}
                handleChange={this.handleHexChange}
                theme={defaultTheme.light}
              />
            )}

            {inputMode === INPUT_MODE.RGB && (
              <RGBInput
                hex={hexValue}
                handleChange={this.handleRgbChange}
                theme={defaultTheme.light}
              />
            )}

            <AlphaInput
              a={alpha * 100}
              handleChangeAlpha={this.handleChangeAlpha}
              theme={defaultTheme.light}
            />
          </div>
        </div>
      </StyledColorPicker>
    );
  }
}
