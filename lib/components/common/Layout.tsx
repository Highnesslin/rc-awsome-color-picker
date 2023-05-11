import { FC, HTMLAttributes, ReactNode, createElement, useState } from 'react';
import { ReactComponent as CloseIcon } from '../../icon/close.svg';
import PureIcon from '../../icon/pure';
import LinearIcon from '../../icon/linear';
import RadialIcon from '../../icon/radial';

export enum KEY {
  PURE = 'PURE',
  LINEAR = 'LINEAR',
  RADIAL = 'RADIAL',
}
const menus = [
  {
    key: KEY.PURE,
    title: '纯色填充',
    icon: PureIcon,
  },
  {
    key: KEY.LINEAR,
    title: '线性渐变',
    icon: LinearIcon,
  },
  {
    key: KEY.RADIAL,
    title: '径向渐变',
    icon: RadialIcon,
  },
];

interface LayoutProps extends Omit<HTMLAttributes<HTMLHeadElement>, 'children'> {
  headerTitle?: string;
  onClose?: () => void;
  children: (key: KEY) => ReactNode | null
}

const Header: FC<LayoutProps> = ({ headerTitle, onClose, children, ...rest }) => {
  const [active, setActive] = useState<KEY>(KEY.PURE);

  return (
    <>
      <header className='color-picker-header' {...rest}>
        <div className='header-text'>
          {headerTitle ||
            menus.map(menu => (
              <div
                key={menu.key}
                className='header-icon'
                title={menu.title}
                onClick={() => setActive(menu.key)}
              >
                {createElement(menu.icon, {
                  active: menu.key === active,
                })}
              </div>
            ))}
        </div>
        {onClose && <CloseIcon onMouseDown={onClose} className='icon' />}
      </header>
      {children(active)}
    </>
  );
};

export default Header;
