import React, { PureComponent } from 'react';
import { DefaultTheme } from 'styled-components';
import { format3DigitValue } from '../../utils/color';
import { STANDARD_TRANSPARENT, TRANSPARENT } from '../../utils/const';
import { StyledRGBInput } from '../../styles';

interface Props {
  hex: string;
  handleChange: (hex: string) => void;
  theme?: DefaultTheme;
}
interface State {
  hex?: string;
  prevHexValueFromProps?: string;
}
export default class HexInput extends PureComponent<Props, State> {
  // _invalid:
  // default to false if do not change
  _invalid = false;
  _originalValueOfInput? = '';
  _changedMannually = false;

  state: State = {
    // naming `hex` here cause we store the value without `#`
    hex: undefined,
    prevHexValueFromProps: undefined,
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    const propsValue = props.hex;

    if (propsValue !== state.prevHexValueFromProps) {
      return { prevHexValueFromProps: propsValue, hex: propsValue };
    } else {
      return null;
    }
  }

  selectWhenClick: React.MouseEventHandler<HTMLInputElement> = e => {
    const input = e.currentTarget;
    input.select();
    this._originalValueOfInput = input.value;
  };

  _correctInput = (value: string) =>
    value
      .toUpperCase()
      .replace(/[^0-9A-F]/g, '')
      .slice(0, 6);

  handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    this._changedMannually = true;

    const value = this._correctInput(e.target.value);

    if (value.length === 3 || value.length === 6) {
      this._invalid = false;
    } else {
      this._invalid = true;
    }

    this.setState({ hex: value });
  };

  formatAndHandleChange = () => {
    if (!this._changedMannually) return;

    const { hex } = this.state;

    if (hex && hex.length === 3) {
      const formattedValue = format3DigitValue(hex);
      this.setState({ hex: formattedValue });
      return formattedValue;
    } else {
      this.props.handleChange(hex as string);
      return hex;
    }
  };

  handleBlur = () => {
    if (this._invalid) {
      this.setState({ hex: this._originalValueOfInput });
    } else {
      this.formatAndHandleChange();
    }

    this._invalid = false;
    this._originalValueOfInput = '';
  };

  handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    if (this._invalid) {
      this.setState({ hex: this._originalValueOfInput });
    } else {
      const formattedValue = this.formatAndHandleChange();
      this._originalValueOfInput = formattedValue;
    }

    this._invalid = false;

    e.currentTarget.select();
  };

  render() {
    const { hex } = this.state;
    const { theme } = this.props;

    const inputValue = [undefined, null, STANDARD_TRANSPARENT, TRANSPARENT].includes(hex)
      ? 'FFFFFF'
      : hex;

    return (
      <StyledRGBInput className='color-input hex-input' theme={theme}>
        <input
          value={inputValue}
          onClick={this.selectWhenClick}
          onKeyUp={this.handleEnter}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
      </StyledRGBInput>
    );
  }
}
