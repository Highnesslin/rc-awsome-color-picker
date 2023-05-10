import { FC } from 'react';
import { RCIconProps } from './interface';

const RadialIcon: FC<RCIconProps> = ({ active }) => {
  return (
    <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <radialGradient cx='50%' cy='50%' fx='50%' fy='50%' r='50%' id='RADIAL_ICON'>
          {active ? (
            <>
              <stop stopColor='#ffffff' offset='0%'></stop>
              <stop stopColor='#ffffff' offset='37.844%'></stop>
              <stop stopColor='#1684fc' offset='100%'></stop>
            </>
          ) : (
            <>
              <stop stopColor='#ffffff' offset='0%'></stop>
              <stop stopColor='#ffffff' offset='37.844%'></stop>
              <stop stopColor='#a0a0a0' offset='100%'></stop>
            </>
          )}
        </radialGradient>
      </defs>
      <circle
        cx='56'
        cy='8'
        r='7.5'
        transform='translate(-48)'
        fill='url(#RADIAL_ICON)'
        {...(active
          ? {
              stroke: '#1684fc',
              strokeWidth: 1,
            }
          : {
              stroke: '#6c6c6c',
              strokeWidth: 0.5,
            })}
        strokeWidth='0.5px'
        fillRule='evenodd'
      ></circle>
    </svg>
  );
};

export default RadialIcon;
