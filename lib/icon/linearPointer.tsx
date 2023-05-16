import { FC } from "react";
import { RCIconProps } from "./interface";

const LinearPointer: FC<RCIconProps> = ({ active }) => {
  return (
    <svg width="12" height="12" viewBox="0 0 10 14" xmlns="http://www.w3.org/2000/svg">
      <g style={{ transform: 'translate(-1px, 14px) scale(0.5) rotate(-90deg)' }}>
        <path fill={active ? '#298df8' : '#fff'} d="M16.083 0c6.628 0 12 5.373 12 12s-5.372 12-12 12c-5.63 0-10.355-3.878-11.649-9.108a20.86 20.86 0 00-1.733-.975c-.49-.246-1.07-.51-1.74-.792l-.342-.142a1 1 0 01.006-1.852c.684-.276 1.376-.59 2.076-.94.641-.32 1.207-.63 1.699-.931C5.637 3.953 10.399 0 16.083 0z" fillRule="evenodd"></path>
        <circle cx="16" cy="12" r="9" fill="#fff" strokeWidth="1" stroke="#fff"></circle>
        <g fill="#d7d7d7" transform="translate(10, 2)">
        <rect x="0" y="4" width="4" height="4"></rect>
        <rect x="8" y="4" width="4" height="4"></rect>
        <rect x="4" y="8" width="4" height="4"></rect>
        <rect x="0" y="12" width="4" height="4"></rect>
        <rect x="8" y="12" width="4" height="4"></rect>
        </g>
        <circle cx="16" cy="12" r="8" fill="rgba(64.005, 148.92, 228.99, 0.64)" strokeWidth="2" stroke="rgba(0, 0, 0, 0.16)"></circle>
      </g>
    </svg>
  )
}
 
export default LinearPointer;