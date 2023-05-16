import { FC, useReducer } from 'react';
import { StyledGradientLinear } from '@/styles';
import Slider from '@/components/common/Slider/Slider';
import { matchLinearGradient, genLinearGradient } from '@/utils/color';
import PureColor from '../PureColor/PureColor';
import LinearPointer from './LinearPointer';

interface GradientLinearProps {
  value?: string
  onChange?: (value: string) => void
}
interface State extends ReturnType<typeof matchLinearGradient> {
  active: number
  linearColor: string,
}
const GradientLinear: FC<GradientLinearProps> = ({ value, onChange }) => {
  const [state, setState] = useReducer<(p:State, n: Partial<State>) => State, string>(
    (pre, next) => ({...pre, ...next}),
    value || '',
    initial => {
      const {
        linearColor,
        direction,
        colors,
        pos
      } = matchLinearGradient(initial)

      // if (linearColor !== value && onChange) {
      //   onChange(linearColor)
      // }

      return {
        active: 0,
        linearColor,
        direction,
        colors,
        pos
      }
    }
  )

  const { active, linearColor, direction, colors, pos } = state

  const handleChange = (pos: number[]) => {
    const nextLinearColor = genLinearGradient({
      direction,
      colors,
      pos
    })
    setState({
      pos,
      linearColor: nextLinearColor
    })
    onChange && onChange(nextLinearColor)
  }

  const handleActiveChange = (active: number) => setState({ active })

  const handleColorChange = (hex: string) => {
    const nextColors = colors.map((pre, index) => index === active ? hex : pre)
    const nextLinearColor = genLinearGradient({
      direction,
      colors: nextColors,
      pos
    })
    setState({
      linearColor: nextLinearColor,
      colors: nextColors
    })
    onChange && onChange(nextLinearColor)
  }

  const curActive = colors[active]

  return (
    <StyledGradientLinear>
      <Slider
        mode='horizontal'
        className='linear-slider'
        value={pos}
        onDrag={handleChange}
        onActiveChange={handleActiveChange}
        renderPointer={(index, props) => <LinearPointer {...props}>{index + 1}</LinearPointer>}
        extra={
          <div
            style={{
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              backgroundImage: linearColor,
            }}
          />
        }
      />
      <PureColor value={curActive} onChange={handleColorChange} />
    </StyledGradientLinear>
  );
};

export default GradientLinear;
