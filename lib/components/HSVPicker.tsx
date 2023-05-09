import React, { PureComponent, ReactNode } from 'react'
import { rgb2hsv, hex2rgb, hsv2rgb, rgb2hex, rgb2rgbaStr } from '../utils/color'
import { stopReactEventPropagation } from '../utils/DOM'
import { DefaultTheme } from 'styled-components';
import { TRANSPARENT } from '../const';
import { StyledHSVPicker } from '../styles'

interface Props {
  hex: string,
  alpha: number,
  onChange: (params: { a?: number;hex?: string}) => void,
  onConfirm: (params: { a?: number;hex?: string}) => void,
  theme?: DefaultTheme
  extra?: ReactNode
}

interface State {
  h: number,
  s: number,
  v: number,
  hex: null | string,
  a: number,
  changingFromInside: boolean
}
export default class HSVPicker extends PureComponent<Props, State> {
  $SVPlane!: HTMLElement;
  $HBand!: HTMLDivElement;
  $ABand!: HTMLDivElement;
  static getDerivedStateFromProps(props: Props, state: State) {
    let newState = null

    if (!state.changingFromInside && (props.hex !== state.hex) && props.hex !== TRANSPARENT) {
      newState = {
        ...state,
        hex: props.hex,
        ...rgb2hsv(hex2rgb(props.hex))
      }
    }

    if (props.alpha !== state.a) newState = { ...newState, a: props.alpha }

    return newState
  }

  state: State = {
    h: null as unknown as number,
    s: null as unknown as number,
    v: null as unknown as number,
    hex: null as unknown as string,
    a: null as unknown as number,
    // changingFromInside: this value indicates that color changes from inside
    // component, which we choose not to accept changes from outside, cause when
    // `v` in hsv is near 0, the output of converting hsv value to rgb, or vice versa,
    // becomes unstable(`h` value and `s` value), which causing pointer to tremble
    changingFromInside: false
  }


  setSVPlaneRef: React.LegacyRef<HTMLElement> = ref => this.$SVPlane = ref as HTMLElement
  setHBandRef: React.LegacyRef<HTMLDivElement> = ref => this.$HBand = ref as HTMLDivElement
  setABandRef: React.LegacyRef<HTMLDivElement> = ref => this.$ABand = ref as HTMLDivElement

  handleClickEyedropper = () => {}

  _getBaseHue = (h: number) => rgb2hex(hsv2rgb({ h, s: 1, v: 1 }))

  _getSVPointerStyle = (s: number, v: number) => {  // s for x, v for y, remember v decreases while y increases
    return {
      top: `${100 - v*100}%`,
      left: `${s*100}%`
    }
  }

  _getSVValue = (x: number, y: number) => { // s for x, v for y, remember v decreases while y increases
    const SVPlaneRect = this.$SVPlane?.getBoundingClientRect()

    return {
      s: Math.min(1, Math.max(0, (x - SVPlaneRect.left)) / SVPlaneRect.width),
      v: 1 - Math.min(1, Math.max(0, (y - SVPlaneRect.top)) / SVPlaneRect.height)
    }
  }

  _getHPointerStyle = (h: number) => ({ top: `${h*100}%` })

  _getAPointerStyle = (a: number) => ({ left: `${a*100}%` })

  _getHValue = (y: number) => {
    const HBandRect = this.$HBand.getBoundingClientRect()

    return {
      h: Math.min(1, Math.max(0, (y - HBandRect.top)) / HBandRect.height)
    }
  }

  _getAValue = (x: number) => {
    const ABandRect = this.$ABand.getBoundingClientRect()

    const a = Math.min(1, Math.max(0, (x - ABandRect.left)) / ABandRect.width)

    return {
      a: Math.round(a*100)/100
    }
  }

  handleDragSVPlane: React.MouseEventHandler<HTMLElement> = (e) => {
    stopReactEventPropagation(e)
    e.preventDefault()

    const { s, v } = this._getSVValue(e.clientX, e.clientY)
    const { h } = this.state
    const hex = rgb2hex(hsv2rgb({ h, s, v }))

    this.setState({
      h, s, v,
      hex,
      changingFromInside: true
    })

    this.props.onChange({ hex })

    const onMouseMove = (e: MouseEvent) => {
      e.stopPropagation()
      e.stopImmediatePropagation()
      e.preventDefault()

      if (!this.$SVPlane) return

      const { s, v } = this._getSVValue(e.clientX, e.clientY)
      const { h } = this.state
      const hex = rgb2hex(hsv2rgb({ h, s, v }))

      this.setState({ h, s, v, hex })

      this.props.onChange({ hex })
    }

    const onMouseUp = (e: MouseEvent) => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)

      if (!this.$SVPlane) return

      const { s, v } = this._getSVValue(e.clientX, e.clientY)
      const { h } = this.state
      const hex = rgb2hex(hsv2rgb({ h, s, v }))

      this.setState({ h, s, v, hex })
      this.props.onConfirm({ hex })

      this.setState({ changingFromInside: false })
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  handleDragHBand: React.MouseEventHandler<HTMLDivElement> = e => {
    stopReactEventPropagation(e)
    e.preventDefault()

    const { h } = this._getHValue(e.clientY)
    const { s, v } = this.state
    const hex = rgb2hex(hsv2rgb({ h, s, v }))
    this.setState({
      h, s, v,
      hex,
      changingFromInside: true
    })

    this.props.onChange({ hex })

    const onMouseMove = (e: MouseEvent) => {
      e.stopPropagation()
      e.stopImmediatePropagation()
      e.preventDefault()

      if (!this.$HBand) return

      const { h } = this._getHValue(e.clientY)
      const { s, v } = this.state
      const hex = rgb2hex(hsv2rgb({ h, s, v }))

      this.setState({ h, s, v, hex })

      this.props.onChange({ hex })
    }

    const onMouseUp = (e: MouseEvent) => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)

      if (!this.$HBand) return

      const { h } = this._getHValue(e.clientY)
      const { s, v } = this.state
      const hex = rgb2hex(hsv2rgb({ h, s, v }))

      this.setState({ h, s, v, hex })
      this.props.onConfirm({ hex })

      this.setState({ changingFromInside: false })
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  handleDragABand: React.MouseEventHandler<HTMLDivElement> = e => {
    stopReactEventPropagation(e)
    e.preventDefault()

    const { a } = this._getAValue(e.clientX)

    this.setState({ changingFromInside: true })

    this.props.onChange({ a })

    const onMouseMove = (e: MouseEvent) => {
      e.stopPropagation()
      e.stopImmediatePropagation()
      e.preventDefault()

      if (!this.$ABand) return

      const { a } = this._getAValue(e.clientX)

      this.props.onChange({ a })
    }

    const onMouseUp = (e: MouseEvent) => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)

      if (!this.$ABand) return

      const { a } = this._getAValue(e.clientX)

      this.setState({ a })
      this.props.onConfirm({ a })

      this.setState({ changingFromInside: false })
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  render() {
    const { h, s, v, a } = this.state
    const { theme, extra } = this.props
    const baseHue = this._getBaseHue(h)
    const SVPointerStyle = this._getSVPointerStyle(s, v)
    const HPointerStyle = this._getHPointerStyle(h)
    const APointerStyle = this._getAPointerStyle(a)

    return (
      <StyledHSVPicker className="hsv-picker" theme={theme}>
        {/* 颜色面板 */}
        <section className='color-plane'>
          <section
            className="s-v-plane"
            ref={this.setSVPlaneRef}
            onMouseDown={this.handleDragSVPlane}>

            <div className="base-hue-layer" style={{ background: baseHue }} />
            <div className="s-layer" />
            <div className="v-layer" />

            <i className="pointer" style={SVPointerStyle} />
          </section>
          {/* 颜色滑动选择器 */}
          <div
            className="h-band"
            onMouseDown={this.handleDragHBand}>
            <div className="rail color-rail"
              ref={this.setHBandRef}>
              <span className="color-slider" style={HPointerStyle} />
            </div>
          </div>
        </section>

        <div className="row">
          <div className="outside-color-picker-btn">
            {extra}
          </div>

          <div
            className="a-band"
            onMouseDown={this.handleDragABand}>
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 999,
                overflow: 'hidden',
                background: `linear-gradient(to right, transparent 0%, ${rgb2rgbaStr(hsv2rgb({ h, s, v }))} 100%)`
              }}
            />
            <div className="rail"
              ref={this.setABandRef}>
              <span className="alpha-slider" style={APointerStyle} />
            </div>
          </div>
        </div>
      </StyledHSVPicker>
    )
  }
}
