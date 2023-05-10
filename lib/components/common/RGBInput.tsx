import React, { PureComponent } from 'react'
import { DefaultTheme } from 'styled-components'
import { hex2rgb } from '../../utils/color'
import { TRANSPARENT } from '../../const'
import { StyledRGBInput } from '../../styles'

interface Props {
  hex: string,
  handleChange: (params: { r: number, g: number, b: number }) => void,
  theme?: DefaultTheme
}

interface State {
  r: number,
  g: number,
  b: number,
  prevHexFromProps: string
}

export default class RGBInput extends PureComponent<Props, State> {

  _originalValueOfInput?: number
  _invalidFace = ''
  _changedMannually = false

  state: State = {
    r: null as unknown as number,
    g: null as unknown as number,
    b: null as unknown as number,
    prevHexFromProps: null as unknown as string
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.hex !== state.prevHexFromProps && props.hex !== TRANSPARENT) {
      return { ...hex2rgb(props.hex), prevHexFromProps: props.hex }
    } else if (props.hex !== state.prevHexFromProps && props.hex === TRANSPARENT) {
      return {
        r: 255,
        g: 255,
        b: 255,
        prevHexFromProps: TRANSPARENT
      }
    } else {
      return null
    }
  }

  selectWhenClick: React.MouseEventHandler<HTMLInputElement> = e => {
    const input = e.currentTarget
    input.select()
    this._originalValueOfInput = Number(input.value)
  }

  _correctInput = (value: string) => Number(value.replace(/\D/g, '').slice(0, 3))

  handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    this._changedMannually = true

    const { face } = e.target.dataset as {
      face: 'r' | 'g' | 'b'
    }
    const value = this._correctInput(e.target.value)

    this.validate(face, value)

    this.setState({
      [face as 'r']: value
    })
  }

  validate = (face: keyof State, value: number) => {
    if (value > 255) {
      this._invalidFace = face
      return false
    } else {
      this._invalidFace = ''
      return true
    }
  }

  emitChange = () => {
    if (!this._changedMannually) return

    const { r, g, b } = this.state
    this.props.handleChange({ r, g, b })
  }

  handleBlur: React.FocusEventHandler<HTMLInputElement> = e => {
    const { face } = e.target.dataset as {
      face: 'r' | 'g' | 'b'
    }

    if (face === this._invalidFace) {
      this.setState({
        [face as 'r']: Number(this._originalValueOfInput)
      })
    } else {
      this.emitChange()
    }

    this._invalidFace = ''
    this._originalValueOfInput = undefined
  }

  handleEnter: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key !== 'Enter') return

    const input = e.currentTarget

    const { face } = input.dataset as {
      face: 'r' | 'g' | 'b'
    }

    if (face === this._invalidFace) {
      this.setState({
        [face as 'r']: Number(this._originalValueOfInput)
      })
    } else {
      this._originalValueOfInput = this.state[face]

      this.emitChange()
    }

    this._invalidFace = ''

    input.select()
  }

  render() {
    const { r, g, b } = this.state
    const { theme } = this.props

    return (
      <React.Fragment>
        <StyledRGBInput className="color-input" theme={theme}>
          <input
            className={this._invalidFace === 'r' ? 'invalid' : ''}
            data-face="r"
            value={r}
            onClick={this.selectWhenClick}
            onKeyUp={this.handleEnter}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
        </StyledRGBInput>

        <StyledRGBInput className="color-input" theme={theme}>
          <input
            className={this._invalidFace === 'g' ? 'invalid' : ''}
            data-face="g"
            value={g}
            onClick={this.selectWhenClick}
            onKeyUp={this.handleEnter}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
        </StyledRGBInput>

        <StyledRGBInput className="color-input" theme={theme}>
          <input
            className={this._invalidFace === 'b' ? 'invalid' : ''}
            data-face="b"
            value={b}
            onClick={this.selectWhenClick}
            onKeyUp={this.handleEnter}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
        </StyledRGBInput>
      </React.Fragment>
    )
  }
}
