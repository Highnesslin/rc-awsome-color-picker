import { PointerType } from "@components/common/Slider/Pointer";
import LinearPointerIcon from '@icon/linearPointer'

const LinearPointer: PointerType = ({ className, active, ...rest }) => {
  return (
    <div className={`${className} pointer-icon`} {...rest}>
      <LinearPointerIcon active={active} />
    </div>
  )
}
 
export default LinearPointer;