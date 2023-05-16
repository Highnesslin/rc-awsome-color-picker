import { HTMLAttributes, FunctionComponent, ComponentClass, ReactHTML, createElement, ReactNode, ReactElement } from "react";

export interface PointerProps extends Pick<HTMLAttributes<HTMLElement>, 'className' | 'style' | 'onMouseDown' | 'children'> {
  active?: boolean
}

export type PointerType = (index: number, props: PointerProps) => ReactElement
// FunctionComponent<PointerProps> | ComponentClass<PointerProps> | keyof ReactHTML

// const Pointer: PointerType = (_, { tag, active, className = '', children, ...rest }) => {
//   return tag ? (
//     createElement(tag, {
//       className: `pointer ${className}`,
//       active,
//       ...rest
//     })
//   ) : (
//     <span className={`pointer default ${className}`} {...rest}></span>
//   )
// }
 
// export default Pointer
