import { FC } from 'react';
import { SELECT_MODE } from '../../const';
import { StyledTabLine } from '../../styles';

const SELECT_TEXT = {
  [SELECT_MODE.PALETTE]: '色彩空间',
  [SELECT_MODE.PRESET]: '色板',
};

const paletteIcon = (
  <svg width='22' height='22' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g clipPath='url(#a)'>
      <path
        d='M5.6 11.278c0 .111.043.219.121.298a.41.41 0 0 0 .586 0 .426.426 0 0 0 0-.597.41.41 0 0 0-.586 0 .426.426 0 0 0-.121.299zM6.24 9.145c0 .176.069.344.19.468a.644.644 0 0 0 .92 0 .668.668 0 0 0 0-.936.644.644 0 0 0-.92 0 .668.668 0 0 0-.19.468zM8.64 7.412c0 .226.089.444.246.604a.831.831 0 0 0 1.187 0 .862.862 0 0 0 0-1.208.831.831 0 0 0-1.187 0 .862.862 0 0 0-.245.604zM11.815 7.412c0 .284.11.557.308.758a1.044 1.044 0 0 0 1.49 0 1.083 1.083 0 0 0 0-1.517 1.044 1.044 0 0 0-1.49 0 1.083 1.083 0 0 0-.308.759z'
        fill='#666'
      ></path>
      <g filter='url(#b)'>
        <path
          d='m18.207 6.365-.011-.01a.366.366 0 0 0-.523.037l-5.582 6.546-.706 1.413 1.266-.898 5.593-6.556a.382.382 0 0 0-.037-.532z'
          fill='#666'
        ></path>
        <path
          d='M18.262 6.28a.466.466 0 0 0-.665.048l-5.583 6.545a.097.097 0 0 0-.013.02l-.706 1.413a.1.1 0 0 0 .148.126l1.266-.897a.1.1 0 0 0 .018-.017l5.593-6.557-.076-.064.076.064a.482.482 0 0 0-.047-.671l-.011-.01z'
          stroke='#666'
          strokeWidth='.2'
          strokeLinejoin='round'
        ></path>
      </g>
      <path
        d='M17.727 10.411a.481.481 0 0 0-.477-.505.48.48 0 0 0-.474.43l.951.075zm0 0v.019c-.008.099-.068.373-.185.743-.118.374-.297.854-.547 1.366-.5 1.022-1.289 2.185-2.46 2.892-3.863 2.334-6.431.597-6.964-.28-.155-.254-.293-.52-.415-.755l-.048-.091c-.137-.261-.247-.465-.34-.573-.02-.023-.052-.042-.11-.053a.94.94 0 0 0-.229-.005 5.95 5.95 0 0 0-.29.03l-.026.003a7.005 7.005 0 0 1-.376.038c-.532.036-1.173-.023-1.692-.615-.265-.302-.433-.816-.47-1.435-.038-.623.056-1.366.329-2.139.545-1.548 1.808-3.22 4.172-4.301 4.332-1.982 7.44.427 7.943.857a.475.475 0 0 1-.279.853.461.461 0 0 1-.303-.113c-1.131-.96-3.4-1.829-6.07-1.108-1.901.504-3.237 1.775-4.017 3.12-.39.672-.639 1.36-.75 1.976-.112.619-.083 1.155.072 1.53.073.178.214.274.412.325.204.052.456.053.733.043l.157-.005c.224-.01.458-.018.673-.002.265.02.522.08.714.242.073.062.154.166.235.286.083.123.171.27.26.425.107.188.218.392.32.58l.182.335c.117.208.37.419.736.59.364.17.83.296 1.359.343a5.577 5.577 0 0 0 3.562-.923c1.119-.74 1.81-1.805 2.22-2.69a8.117 8.117 0 0 0 .514-1.457l.02-.09.004-.022.001-.006v-.001l.953.068z'
        fill='#666'
        stroke='#666'
        strokeWidth='.2'
        strokeLinejoin='round'
      ></path>
    </g>
    <defs>
      <clipPath id='a'>
        <path
          d='M0 4a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4z'
          fill='#fff'
        ></path>
      </clipPath>
      <filter
        id='b'
        x='7.185'
        y='6.063'
        width='15.35'
        height='16.488'
        filterUnits='userSpaceOnUse'
        colorInterpolationFilters='sRGB'
      >
        <feFlood floodOpacity='0' result='BackgroundImageFix'></feFlood>
        <feColorMatrix
          in='SourceAlpha'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          result='hardAlpha'
        ></feColorMatrix>
        <feOffset dy='4'></feOffset>
        <feGaussianBlur stdDeviation='2'></feGaussianBlur>
        <feComposite in2='hardAlpha' operator='out'></feComposite>
        <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'></feColorMatrix>
        <feBlend in2='BackgroundImageFix' result='effect1_dropShadow_5734_103268'></feBlend>
        <feBlend in='SourceGraphic' in2='effect1_dropShadow_5734_103268' result='shape'></feBlend>
      </filter>
    </defs>
  </svg>
);

const presetIcon = (
  <svg width='22' height='22' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect x='4.583' y='4.583' width='3.55' height='3.55' rx='.5' fill='#999'></rect>
    <rect x='4.583' y='9.133' width='3.55' height='3.55' rx='.5' fill='#999'></rect>
    <rect x='4.583' y='13.683' width='3.55' height='3.55' rx='.5' fill='#C4C4C4'></rect>
    <rect x='9.225' y='4.583' width='3.55' height='3.55' rx='.5' fill='#999'></rect>
    <rect x='9.225' y='9.133' width='3.55' height='3.55' rx='.5' fill='#666'></rect>
    <rect x='9.225' y='13.683' width='3.55' height='3.55' rx='.5' fill='#999'></rect>
    <rect x='13.867' y='4.583' width='3.55' height='3.55' rx='.5' fill='#C4C4C4'></rect>
    <rect x='13.867' y='9.133' width='3.55' height='3.55' rx='.5' fill='#999'></rect>
    <rect x='13.867' y='13.683' width='3.55' height='3.55' rx='.5' fill='#999'></rect>
  </svg>
);

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
  value: SELECT_MODE
  onChange: (value: SELECT_MODE) => void
}
const Bar: FC<BarProps> = ({ value, onChange }) => {
  return (
    <StyledTabLine className='tab-line'>
      <span>{SELECT_TEXT[value]}</span>
      <div className='tabs'>
        {menu.map(item => (
          <div
            key={item.key}
            className={item.key === value ? 'selected' : ''}
            onClick={() => onChange(item.key)}
          >
            {item.icon}
          </div>
        ))}
      </div>
    </StyledTabLine>
  );
};

export default Bar;