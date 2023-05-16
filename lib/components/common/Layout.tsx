import { FC, ComponentType, HTMLAttributes, Suspense, createElement, useState, ReactNode } from 'react';
import { ReactComponent as CloseIcon } from '@/icon/close.svg';
import { RCIconProps } from '@/icon/interface';
import { KEY, checkColorType } from '@/utils/color';

interface Menu {
  key: KEY
  title: string
  icon: ComponentType<RCIconProps>,
  component: () => ReactNode
}
interface LayoutProps extends Omit<HTMLAttributes<HTMLHeadElement>, 'children'> {
  value?: string
  menu: Menu[]
  headerTitle?: string;
  onClose?: () => void;
}

const Header: FC<LayoutProps> = ({ menu, headerTitle, onClose, value, ...rest }) => {
  const [active, setActive] = useState<KEY>(() => checkColorType(value || ''));

  const { component: renderMenu } = menu.find(ins => ins.key === active) || {}
  
  return (
    <>
      <header className='color-picker-header' {...rest}>
        <div className='header-text'>
          {headerTitle ||
            menu.map(item => (
              <div
                key={item.key}
                className='header-icon'
                title={item.title}
                onClick={() => setActive(item.key)}
              >
                {createElement(item.icon, {
                  active: item.key === active,
                })}
              </div>
            ))}
        </div>
        {onClose && <CloseIcon onMouseDown={onClose} className='icon' />}
      </header>

      <div className='color-picker-body'>
        <Suspense fallback={<div>loading...</div>}>
          {renderMenu && renderMenu()}
        </Suspense>
      </div>
    </>
  );
};

export default Header;
