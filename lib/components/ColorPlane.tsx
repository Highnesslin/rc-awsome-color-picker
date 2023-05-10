import React, { HTMLAttributes } from 'react';
import TabLine from './common/TabLine';
import Layout, { KEY } from './common/Layout';
import RGBInput from './common/RGBInput';
import HexInput from './common/HexInput';
import HSVPicker from './common/HSVPicker';
import AlphaInput from './common/AlphaInput';
import ColorSucker from './common/ColorSucker';
import ColorPreset from './common/ColorPreset';
import AlphSlider from './common/AlphaSlider';
import { stopReactEventPropagation } from '../utils/DOM';
import { hex2rgbaStr, normalizeHexValue, parseColor, rgb2hex } from '../utils/color';
import { INPUT_MODE, SELECT_MODE, STANDARD_TRANSPARENT, TRANSPARENT } from '../const';
import { StyledColorPicker } from '../styles';

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
    if (!this.props.onChange) return;

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
    if (!this.props.onChange) return;

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
        <Layout headerTitle={headerTitle} onClose={onClose}>
          {key => (
            <div className='color-picker-body'>
              {key === KEY.LINEAR && <span>线性渐变</span>}

              {key === KEY.RADIAL && <span>径向渐变</span>}

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
          )}
        </Layout>
      </StyledColorPicker>
    );
  }
}
