import React, { HTMLAttributes } from 'react';
import TabLine from './common/TabLine';
import Layout, { KEY } from './common/Layout';
import RGBInput from './common/RGBInput';
import HexInput from './common/HexInput';
import HSVPicker from './common/HSVPicker';
import AlphaInput from './common/AlphaInput';
import ColorSucker from './common/ColorSucker';
import ColorPreset from './common/ColorPreset';
import AlphaSlider from './common/AlphaSlider';
import ColorInput from './ColorInput/ColorInput';
import GradientLinear from './GradientLinear/GradientLinear';
import { stopReactEventPropagation } from '../utils/dom';
import { hex2rgbaStr, normalizeHexValue, parseColor } from '../utils/color';
import {
  DEFAULT_THEME,
  INPUT_MODE,
  SELECT_MODE,
  STANDARD_TRANSPARENT,
  TRANSPARENT,
} from '../utils/const';
import { StyledColorPicker } from '../styles';

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
  };

  handleHexChange = (hexValue: string) => {
    const hex = hexValue.match(/^#/) ? hexValue : `#${hexValue}`;
    const changeFromTransparent = this.state.hex === TRANSPARENT;
    this.confirm({ hex, a: changeFromTransparent ? 1 : this.state.alpha });
  };

  handleChangeAlpha = (a: number) => this.confirm({ hex: this.state.hex, a: Number(a.toFixed(2)) });

  confirm = ({ hex, a }: { hex?: string; a?: number }) => {
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

  render() {
    const { headerTitle, className, style, onClose } = this.props;
    const { hex, alpha } = this.state;

    const hexValue = !hex || hex === TRANSPARENT ? STANDARD_TRANSPARENT : normalizeHexValue(hex);

    return (
      <StyledColorPicker
        className={'rc-awsome-color-picker-body' + (className ? ` ${className}` : '')}
        style={style}
        onMouseDown={stopReactEventPropagation}
        onClick={stopReactEventPropagation}
        theme={DEFAULT_THEME.light}
      >
        <Layout headerTitle={headerTitle} onClose={onClose}>
          {key => (
            <div className='color-picker-body'>
              {key === KEY.LINEAR ? (
                <GradientLinear />
              ) : key === KEY.RADIAL ? (
                <span>径向渐变</span>
              ) : null}

              <TabLine>
                {selectMode =>
                  selectMode === SELECT_MODE.PALETTE ? (
                    <HSVPicker
                      hex={hex}
                      onChange={this.handleHexChange}
                      theme={DEFAULT_THEME.light}
                    />
                  ) : SELECT_MODE.PRESET ? (
                    <ColorPreset value={hexValue} onChange={this.handleHexChange} />
                  ) : null
                }
              </TabLine>

              {/* 吸管 透明度选择器 */}
              <div className='row'>
                <div className='outside-color-picker-btn'>
                  <ColorSucker onSucker={this.handleHexChange} />
                </div>

                <AlphaSlider hex={hex} value={alpha} onDrag={this.handleChangeAlpha} />
              </div>

              {/* 颜色输入器 */}
              <ColorInput>
                {inputMode => (
                  <>
                    {inputMode === INPUT_MODE.HEX && (
                      <HexInput
                        hex={hexValue}
                        handleChange={this.handleHexChange}
                        theme={DEFAULT_THEME.light}
                      />
                    )}

                    {inputMode === INPUT_MODE.RGB && (
                      <RGBInput
                        hex={hexValue}
                        handleChange={this.handleHexChange}
                        theme={DEFAULT_THEME.light}
                      />
                    )}

                    <AlphaInput
                      a={alpha * 100}
                      handleChangeAlpha={this.handleChangeAlpha}
                      theme={DEFAULT_THEME.light}
                    />
                  </>
                )}
              </ColorInput>
            </div>
          )}
        </Layout>
      </StyledColorPicker>
    );
  }
}
