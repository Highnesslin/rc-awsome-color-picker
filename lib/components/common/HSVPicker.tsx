import React, { PureComponent } from 'react';
import { DefaultTheme } from 'styled-components';
import Slider from './Slider/Slider';
import { TRANSPARENT } from '../../utils/const';
import { stopReactEventPropagation } from '../../utils/dom';
import { rgb2hsv, hex2rgb, hsv2rgb, rgb2hex } from '../../utils/color';
import { StyledHSVPicker } from '../../styles';

interface Props {
  hex: string;
  theme?: DefaultTheme;
  onChange: (hex: string) => void;
}

interface State {
  h: number;
  s: number;
  v: number;
  hex: null | string;
  changingFromInside: boolean;
}
export default class HSVPicker extends PureComponent<Props, State> {
  $SVPlane!: HTMLElement;
  static getDerivedStateFromProps(props: Props, state: State) {
    if (!state.changingFromInside && props.hex !== state.hex && props.hex !== TRANSPARENT) {
      return {
        ...state,
        hex: props.hex,
        ...rgb2hsv(hex2rgb(props.hex)),
      };
    }

    return null;
  }

  state: State = {
    h: null as unknown as number,
    s: null as unknown as number,
    v: null as unknown as number,
    hex: null as unknown as string,
    // changingFromInside: this value indicates that color changes from inside
    // component, which we choose not to accept changes from outside, cause when
    // `v` in hsv is near 0, the output of converting hsv value to rgb, or vice versa,
    // becomes unstable(`h` value and `s` value), which causing pointer to tremble
    changingFromInside: false,
  };

  setSVPlaneRef: React.LegacyRef<HTMLElement> = ref => (this.$SVPlane = ref as HTMLElement);

  _getBaseHue = (h: number) => rgb2hex(hsv2rgb({ h, s: 1, v: 1 }));

  _getSVPointerStyle = (s: number, v: number) => {
    // s for x, v for y, remember v decreases while y increases
    return {
      top: `${100 - v * 100}%`,
      left: `${s * 100}%`,
    };
  };

  _getSVValue = (x: number, y: number) => {
    // s for x, v for y, remember v decreases while y increases
    const SVPlaneRect = this.$SVPlane?.getBoundingClientRect();

    return {
      s: Math.min(1, Math.max(0, x - SVPlaneRect.left) / SVPlaneRect.width),
      v: 1 - Math.min(1, Math.max(0, y - SVPlaneRect.top) / SVPlaneRect.height),
    };
  };

  handleDragSVPlane: React.MouseEventHandler<HTMLElement> = e => {
    stopReactEventPropagation(e);
    e.preventDefault();

    const { s, v } = this._getSVValue(e.clientX, e.clientY);
    const { h } = this.state;
    const hex = rgb2hex(hsv2rgb({ h, s, v }));

    this.setState({
      h,
      s,
      v,
      hex,
      changingFromInside: true,
    });

    this.props.onChange(hex);

    const onMouseMove = (e: MouseEvent) => {
      e.stopPropagation();
      e.stopImmediatePropagation();
      e.preventDefault();

      if (!this.$SVPlane) return;

      const { s, v } = this._getSVValue(e.clientX, e.clientY);
      const { h } = this.state;
      const hex = rgb2hex(hsv2rgb({ h, s, v }));

      this.setState({ h, s, v, hex });

      this.props.onChange(hex);
    };

    const onMouseUp = (e: MouseEvent) => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (!this.$SVPlane) return;

      const { s, v } = this._getSVValue(e.clientX, e.clientY);
      const { h } = this.state;
      const hex = rgb2hex(hsv2rgb({ h, s, v }));

      this.setState({ h, s, v, hex });
      this.props.onChange(hex);

      this.setState({ changingFromInside: false });
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  handleDragStart = (h: number) => {
    this.handleDrag(h);

    this.setState({
      changingFromInside: true,
    });
  };

  handleDrag = (h: number) => {
    const { s, v } = this.state;
    const hex = rgb2hex(hsv2rgb({ h, s, v }));

    this.setState({ h, s, v, hex });

    this.props.onChange(hex);
  };

  handleDragEnd = (h: number) => {
    this.handleDrag(h);
    this.setState({ changingFromInside: false });
  };

  render() {
    const { h, s, v } = this.state;
    const { theme } = this.props;
    const baseHue = this._getBaseHue(h);
    const SVPointerStyle = this._getSVPointerStyle(s, v);

    return (
      <StyledHSVPicker className='hsv-picker' theme={theme}>
        {/* 颜色面板 */}
        <section className='color-plane'>
          <section
            className='s-v-plane'
            ref={this.setSVPlaneRef}
            onMouseDown={this.handleDragSVPlane}
          >
            <div className='base-hue-layer' style={{ background: baseHue }} />
            <div className='s-layer' />
            <div className='v-layer' />

            <i className='pointer' style={SVPointerStyle} />
          </section>
          {/* 颜色滑动选择器 */}
          <Slider
            className='color-slider'
            mode='vertical'
            value={h}
            onDragStart={this.handleDragStart}
            onDrag={this.handleDrag}
            onDragEnd={this.handleDragEnd}
          />
        </section>
      </StyledHSVPicker>
    );
  }
}
