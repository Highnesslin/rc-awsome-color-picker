import React, { PureComponent } from 'react';
import { DefaultTheme } from 'styled-components';
import { format3DigitValue } from '../../utils/color';
import { STANDARD_TRANSPARENT, TRANSPARENT } from '../../const';
import { StyledRGBInput } from '../../styles';

interface Props {
  hexValue: string;
  handleChange: (hex: string) => void;
  theme?: DefaultTheme;
}
interface State {
  hexValue?: string;
  prevHexValueFromProps?: string;
}
export default class HexInput extends PureComponent<Props, State> {
  // _invalid:
  // default to false if do not change
  _invalid = false;
  _originalValueOfInput? = '';
  _changedMannually = false;

  state: State = {
    // naming `hexValue` here cause we store the value without `#`
    hexValue: undefined,
    prevHexValueFromProps: undefined,
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    const propsValue = props.hexValue;

    if (propsValue !== state.prevHexValueFromProps) {
      return { prevHexValueFromProps: propsValue, hexValue: propsValue };
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

    this.setState({ hexValue: value });
  };

  formatAndHandleChange = () => {
    if (!this._changedMannually) return;

    const { hexValue } = this.state;

    if (hexValue && hexValue.length === 3) {
      const formattedValue = format3DigitValue(hexValue);
      this.setState({ hexValue: formattedValue });
      return formattedValue;
    } else {
      this.props.handleChange(hexValue as string);
      return hexValue;
    }
  };

  handleBlur = () => {
    if (this._invalid) {
      this.setState({ hexValue: this._originalValueOfInput });
    } else {
      this.formatAndHandleChange();
    }

    this._invalid = false;
    this._originalValueOfInput = '';
  };

  handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    if (this._invalid) {
      this.setState({ hexValue: this._originalValueOfInput });
    } else {
      const formattedValue = this.formatAndHandleChange();
      this._originalValueOfInput = formattedValue;
    }

    this._invalid = false;

    e.currentTarget.select();
  };

  render() {
    const { hexValue } = this.state;
    const { theme } = this.props;

    const inputValue = [undefined, null, STANDARD_TRANSPARENT, TRANSPARENT].includes(hexValue)
      ? 'FFFFFF'
      : hexValue;

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
