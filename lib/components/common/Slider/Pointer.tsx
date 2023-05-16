import { HTMLAttributes, FunctionComponent, ComponentClass, ReactHTML, createElement } from "react";

interface PointerProps extends Pick<HTMLAttributes<HTMLElement>, 'className' | 'style' | 'onMouseDown'> {
  tag?: PointerType
  active?: boolean
}

export type PointerType = FunctionComponent<PointerProps> | ComponentClass<PointerProps> | keyof ReactHTML

const Pointer: PointerType = ({ tag, active, className = '', ...rest }) => {
  return tag ? (
    createElement(tag, {
      className: `pointer ${className}`,
      active,
      ...rest
    })
  ) : (
    <span className={`pointer default ${className}`} {...rest}></span>
  )
}
 
export default Pointer
