import { FC } from 'react';
import { RCIconProps } from './interface';

const PureIcon: FC<RCIconProps> = ({ active }) => {
  return (
    <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg'>
      <circle
        cx='8'
        cy='8'
        r='7.5'
        {
          ...active ? {
            fill: '#1684fc',
            stroke: '#1684fc',
            strokeWidth: 1
          } : {
            fill: '#6c6c6c',
            stroke: '#6c6c6c',
            strokeWidth: 0.5,
          }
        }
        fillRule='evenodd'
        fillOpacity='.54'
      ></circle>
    </svg>
  );
};

export default PureIcon;
