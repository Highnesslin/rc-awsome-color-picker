import { FC, ReactNode, createElement, useState } from 'react';
import { SELECT_MODE } from '@/utils/const';
import { ReactComponent as paletteIcon } from '@/icon/palette.svg'
import { ReactComponent as presetIcon } from '@/icon/preset.svg'
import { StyledTabLine } from '@/styles';

const SELECT_TEXT = {
  [SELECT_MODE.PALETTE]: '色彩空间',
  [SELECT_MODE.PRESET]: '色板',
};

const menu = [
  {
    key: SELECT_MODE.PALETTE,
    icon: paletteIcon,
  },
  {
    key: SELECT_MODE.PRESET,
    icon: presetIcon,
  },
];

interface BarProps {
  children: (selected: SELECT_MODE) => ReactNode | null
}
const Bar: FC<BarProps> = ({ children }) => {
  const [selected, setSelected] = useState<SELECT_MODE>(SELECT_MODE.PALETTE)

  return (
    <>
      <StyledTabLine className='tab-line'>
        <span>{SELECT_TEXT[selected]}</span>
        <div className='tabs'>
          {menu.map(item => (
            <div
              key={item.key}
              className={item.key === selected ? 'selected' : ''}
              onClick={() => setSelected(item.key)}
            >
              {createElement(item.icon)}
            </div>
          ))}
        </div>
      </StyledTabLine>
      {children(selected)}
    </>
  );
};

export default Bar;
