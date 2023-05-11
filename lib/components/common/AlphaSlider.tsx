import React, { PureComponent } from 'react';
import { stopReactEventPropagation } from '../../utils/dom';

interface Props {
  hex: string;
  alpha: number;
  onChange: (alpha: number) => void;
}

interface State {
  a: number;
}
export default class AlphSlider extends PureComponent<Props, State> {
  $ABand!: HTMLDivElement;
  static getDerivedStateFromProps(props: Props, state: State) {
    return { ...state, a: props.alpha };
  }

  state: State = {
    a: null as unknown as number,
  };

  setABandRef: React.LegacyRef<HTMLDivElement> = ref => (this.$ABand = ref as HTMLDivElement);

  _getAPointerStyle = (a: number) => ({ left: `${a * 100}%` });

  _getAValue = (x: number) => {
    const ABandRect = this.$ABand.getBoundingClientRect();

    const a = Math.min(1, Math.max(0, x - ABandRect.left) / ABandRect.width);

    return {
      a: Math.round(a * 100) / 100,
    };
  };

  handleDragABand: React.MouseEventHandler<HTMLDivElement> = e => {
    stopReactEventPropagation(e);
    e.preventDefault();

    const { a } = this._getAValue(e.clientX);

    this.props.onChange(a);

    const onMouseMove = (e: MouseEvent) => {
      e.stopPropagation();
      e.stopImmediatePropagation();
      e.preventDefault();

      if (!this.$ABand) return;

      const { a } = this._getAValue(e.clientX);

      this.props.onChange(a);
    };

    const onMouseUp = (e: MouseEvent) => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (!this.$ABand) return;

      const { a } = this._getAValue(e.clientX);

      this.setState({ a });
      this.props.onChange(a);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  render() {
    const { a } = this.state;
    const { hex } = this.props;
    const APointerStyle = this._getAPointerStyle(a);

    return (
      <div className='a-band' onMouseDown={this.handleDragABand}>
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 999,
            overflow: 'hidden',
            background: `linear-gradient(to right, transparent 0%, ${hex} 100%)`,
          }}
        />
        <div className='rail' ref={this.setABandRef}>
          <span className='alpha-slider' style={APointerStyle} />
        </div>
      </div>
    );
  }
}
