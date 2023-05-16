import { FC, HTMLAttributes, lazy } from 'react';
import { stopReactEventPropagation } from '@utils/dom';
import { DEFAULT_THEME } from '@utils/const';
import { StyledColorPicker } from '@/styles';
import PureIcon from '@/icon/pure';
import LinearIcon from '@/icon/linear';
import RadialIcon from '@/icon/radial';
import Layout, { KEY } from './common/Layout';

const PureColor = lazy(() => import ('./Tab/PureColor/PureColor'))
const GradientLinear= lazy(() => import ('./Tab/GradientLinear/GradientLinear'))
const GradientRadial= lazy(() => import ('./Tab/GradientRadial/GradientRadial'))

export interface ColorPickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  headerTitle?: string;
  onChange?: (color: string) => void;
  onClose?: () => void;
}
const ColorPlane : FC<ColorPickerProps> = ({ className, style, headerTitle = '颜色设置', onClose, value, onChange }) => {
  const menus = [
    {
      key: KEY.PURE,
      title: '纯色填充',
      icon: PureIcon,
      component: () => <PureColor value={value} onChange={onChange} />
    },
    {
      key: KEY.LINEAR,
      title: '线性渐变',
      icon: LinearIcon,
      component: () => <GradientLinear value={value} onChange={onChange} />
    },
    {
      key: KEY.RADIAL,
      title: '径向渐变',
      icon: RadialIcon,
      component: () => <GradientRadial />
    },
  ];

  return (
    <StyledColorPicker
      className={'rc-awsome-color-picker-body' + (className ? ` ${className}` : '')}
      style={style}
      onMouseDown={stopReactEventPropagation}
      onClick={stopReactEventPropagation}
      theme={DEFAULT_THEME.light}
    >
      <Layout headerTitle={headerTitle} menu={menus} onClose={onClose} />
    </StyledColorPicker>
  );
}

export default ColorPlane
