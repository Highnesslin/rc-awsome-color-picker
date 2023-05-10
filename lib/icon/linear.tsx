import { FC } from "react";
import { RCIconProps } from "./interface";

const LinearIcon: FC<RCIconProps> = ({ active }) => {
  return (
    <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient x1='50%' y1='39.897%' x2='50%' y2='81.179%' id='LINEAR_ICON'>
          {
            active ? (
              <>
                <stop stopColor='#ffffff' offset='0%'></stop>
                <stop stopColor='#1684fc' offset='100%'></stop>
              </>
            ): (
              <>
                <stop stopColor='#f9f9f9' offset='0%'></stop>
                <stop stopColor='#939393' offset='100%'></stop>
              </>
            )
          }
        </linearGradient>
      </defs>
      <circle
        cx='32'
        cy='8'
        r='7.5'
        transform='translate(-24)'
        fill='url(#LINEAR_ICON)'
        {
          ...active ? {
            stroke: '#1684fc',
            strokeWidth: 1
          }: {
            stroke:'#6c6c6c',
            strokeWidth: 0.5
          }
        }

        fillRule='evenodd'
      ></circle>
    </svg>
  )
}
 
export default LinearIcon;