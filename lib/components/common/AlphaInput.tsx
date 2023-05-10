import React, { PureComponent } from 'react'
import { DefaultTheme } from 'styled-components'
import { StyledRGBInput } from '../../styles'

interface Props {
  a: number,
  handleChangeAlpha: (a: number) => void,
  theme?: DefaultTheme
}

interface State {
  a: number,
  prevAFromProps: number
}

export default class AlphaInput extends PureComponent<Props, State> {
  state: State = {
    a: null as unknown as number,
    prevAFromProps: null as unknown as number
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.a !== state.prevAFromProps) return { a: props.a, prevAFromProps: props.a }

    return null
  }

  selectWhenClick: React.MouseEventHandler<HTMLInputElement> = e => {
    const input = e.currentTarget

    input.select()
  }

  handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    let value = e.target.value.replace(/\D/g, '')

    value = value.replace(/^0*(?=[0-9])/, '') // 000000

    if (value.match(/^100/)) {
      value = value.slice(0, 3)
    } else {
      value = value.slice(0, 2)
    }

    this.setState({ a: Number(value) })
  }

  handleBlur = () => this.props.handleChangeAlpha(this.state.a / 100)

  handleEnter: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key !== 'Enter') return

    this.props.handleChangeAlpha(this.state.a / 100)

    e.currentTarget.select()
  }

  render() {
    const { a } = this.state
    const { theme } = this.props

    return (
      <StyledRGBInput className="alpha-input color-input" theme={theme}>
        <input
          value={a}
          onClick={this.selectWhenClick}
          onKeyUp={this.handleEnter}
          onChange={this.handleChange}
          onBlur={this.handleBlur} />
      </StyledRGBInput>
    )
  }
}
