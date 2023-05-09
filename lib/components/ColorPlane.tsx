import React, { HTMLAttributes } from 'react'
import { DefaultTheme } from 'styled-components'
import HSVPicker from './HSVPicker'
import RGBInput from './RGBInput'
import HexInput from './HexInput'
import AlphaInput from './AlphaInput'
import ColorSucker from './ColorSucker'
import { hex2rgbaStr, parseColor, rgb2hex } from '../utils/color'
import { stopReactEventPropagation } from '../utils/DOM'
import { MODE, STANDARD_TRANSPARENT, TRANSPARENT } from '../const'
import { StyledColorPicker } from '../styles'

const CLOSE_SVG = <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg"><path d="M5.95 4.536l2.828 2.828a1 1 0 0 1-1.414 1.414L4.536 5.95 1.707 8.778A1 1 0 0 1 .293 7.364L3.12 4.536.293 1.707A1 1 0 0 1 1.707.293L4.536 3.12 7.364.293a1 1 0 0 1 1.414 1.414L5.95 4.536z" fill="#B8BCBF" fillRule="evenodd" /></svg>

const defaultPalette = {
  light: {
    bgColor: '#fff',
    tc: '#415058',
    lightTc: '#415058',
    darkTc: '#8d9ea7',
    borderColor: '#dedee4',
    colorBlock: {
      border: 'rgba(0, 0, 0, 0.08)'
    },
    icon: {
      close: {
        hover: '#415058'
      },
      piker: {
        bg: '#fff',
        border: '#8d9ea7'
      },
      drop: {
        tc: '#8D9EA7',
        hover: '#5B6B73'
      },
      select: '#8D9EA7'
    },
    input: {
      bg: '#f6f7f8',
      border: '#f2f2f3',
      hover: {
        border: '#1e98ea'
      }
    },
    menu: {
      bg: '#fff',
      shadow: '0 2px 10px 0 rgba(39,54,78,0.08), 4px 12px 40px 0 rgba(39,54,78,0.1)',
      hover: {
        optionBg: '#f6f7f8',
        tc: '#298df8'
      }
    }
  }
}
export interface ColorPickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  theme?: string
  value?: string,
  headerText?: string,
  palette?: DefaultTheme,
  onChange: (color: string) => void,
  onClose?: (e: React.MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => void,
}
interface State {
  hex: string,
  alpha: number,
  mode: MODE
}
export default class ColorPlane extends React.PureComponent<ColorPickerProps, State> {
  static defaultProps = {
    headerText: '颜色设置',
    palette: defaultPalette['light']
  }

  static getDerivedStateFromProps(props: ColorPickerProps, state: State) {
    const { hex, alpha } = parseColor(props.value || '')

    if (hex && hex.toLowerCase() === state.hex && alpha === state.alpha) {
      return null
    } else {
      return {
        hex,
        alpha,
      }
    }
  }

  state: State = {
    hex: '',
    alpha: 1,
    mode: MODE.HEX
  }

  handleRgbChange = (rgb: { r: number; g: number; b: number }) => {
    const hex = rgb2hex(rgb)
    const changeFromTransparent = this.state.hex === TRANSPARENT
    this.hsvConfirm({ hex, a: changeFromTransparent ? 1 : this.state.alpha })
  }

  handleHexChange = (hexValue: string) => {
    const hex = hexValue.match(/^#/) ? hexValue : `#${hexValue}`
    const changeFromTransparent = this.state.hex === TRANSPARENT
    this.hsvConfirm({ hex, a: changeFromTransparent ? 1 : this.state.alpha })
  }

  hsvChange = ({ hex, a }: { hex?: string, a?: number }) => {
    const { hex: propsHex } = parseColor(this.props.value || '')
    if (!hex) hex = this.state.hex
    if (!a && a !== 0) a = this.state.alpha

    if (hex === TRANSPARENT && a === 0) {
      this.props.onChange(TRANSPARENT)
    } else if (hex === TRANSPARENT && a !== 0) {
      this.props.onChange(hex2rgbaStr('FFFFFF', a))
    } else {
      this.props.onChange(hex2rgbaStr(hex, propsHex === TRANSPARENT ? 1 : a))
    }
  }

  hsvConfirm = ({ hex, a }: { hex?: string, a?: number }) => {
    const { hex: propsHex } = parseColor(this.props.value || '')
    if (!hex) hex = this.state.hex
    if (!a && a !== 0) a = this.state.alpha

    if (hex === TRANSPARENT) {
      this.props.onChange && this.props.onChange(TRANSPARENT)
    } else {
      this.props.onChange && this.props.onChange(hex2rgbaStr(hex, propsHex === TRANSPARENT ? 1 : a))
    }
  }

  handleChangeAlpha = (a: number) => this.hsvConfirm({ hex: this.state.hex, a })

  handleChangeMode: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const mode = e.target.value as MODE
    this.setState({ mode })
  }

  render() {
    const { headerText, palette, className, style, onClose } = this.props
    const { hex, alpha, mode } = this.state

    const hexValue = (!hex || hex === TRANSPARENT) ? STANDARD_TRANSPARENT : hex.slice(1)

    return (
      <StyledColorPicker
        className={'rc-awsome-color-picker-body' + (className ? ` ${className}` : '')}
        style={style}
        onMouseDown={stopReactEventPropagation}
        onClick={stopReactEventPropagation}
        theme={palette}
      >

        <header className="color-picker-header">
          <div className="header-text">{headerText}</div>
          {onClose && <span className="icon" onMouseDown={onClose}>{CLOSE_SVG}</span>}
        </header>

        <div className="color-picker-body">
          <HSVPicker
            hex={hex}
            alpha={alpha}
            onChange={this.hsvChange}
            onConfirm={this.hsvConfirm}
            theme={palette}
            extra={(
              <ColorSucker onSucker={this.handleHexChange} />
            )}
          />

          <div className="input-section">
            <select className='text' value={mode} onChange={this.handleChangeMode}>
              <option>{MODE.HEX}</option>
              <option>{MODE.RGB}</option>
            </select>

            {mode === MODE.HEX && (
              <HexInput
                hexValue={hexValue}
                handleChange={this.handleHexChange}
                theme={palette}
              />
            )}

            {mode === MODE.RGB && <RGBInput
              hex={hex}
              handleChange={this.handleRgbChange}
              theme={palette}
            />}

            <AlphaInput
              a={alpha * 100}
              handleChangeAlpha={this.handleChangeAlpha}
              theme={palette}
            />
          </div>
        </div>
      </StyledColorPicker>
    )
  }
}
