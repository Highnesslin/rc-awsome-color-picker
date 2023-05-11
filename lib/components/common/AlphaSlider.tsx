import { FC } from 'react';
import Slider, { SliderProps } from '../Slider/Slider';

interface AlphaSliderProps extends Omit<SliderProps, 'mode'> {
  hex: string;
}
// className='color-slider'
// mode='vertical'
// value={h}
// onDragStart={this.handleDragStart}
// onDrag={this.handleDrag}
// onDragEnd={this.handleDragEnd}
const AlphaSlider: FC<AlphaSliderProps> = ({ hex, value, ...rest }) => {
  return (
    <Slider
      mode='horizontal'
      value={value}
      {...rest}
      extra={
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 999,
            overflow: 'hidden',
            background: `linear-gradient(to right, transparent 0%, ${hex} 100%)`,
          }}
        />
      }
    />
  );
};

export default AlphaSlider;
