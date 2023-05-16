import { FC } from "react";
import LinearPointerIcon from '@icon/linearPointer'
import { PointerProps } from "@/components/common/Slider/Pointer";

const LinearPointer: FC<PointerProps> = ({ className, active, children, ...rest }) => {
  return (
    <div className={`${className} pointer-icon`} {...rest}>
      <LinearPointerIcon active={active} />
      <span>{children}</span>
    </div>
  )
}
 
export default LinearPointer
