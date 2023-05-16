import { FC, MouseEventHandler, useReducer, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useClickAway, useKeyPress } from 'ahooks'
import ColorPlane, { ColorPickerProps } from './ColorPlane'
import { StyledTrigger } from '../styles'

interface State {
  visible: boolean
  color?: string,
  position: {
    x: number,
    t: number
  }
}
type Reducer = (prevState: State, action: Partial<State>) => State

const Trigger: FC<ColorPickerProps> = ({ value, onChange, onClose, style, ...rest }) => {
  const [state, setState] = useReducer<Reducer>((s, action) => ({ ...s, ...action }), {
    visible: false,
    color: value,
    position: {
      x: 0,
      t: 0
    }
  })
  const trigger = useRef<HTMLDivElement>(null)

  const { visible, color, position } = state

  const handleShow: MouseEventHandler<HTMLDivElement> = e => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    setState({
      position: {
        x: left + width,
        t: top + height,
      },
      visible: !visible
    })
  }

  const handleChange = (color: string) => {
    setState({ color })
    onChange && onChange(color)
  }

  const handleClose: ColorPickerProps['onClose'] = () => {
    onClose && onClose()
    setState({ visible: false })
  }

  useClickAway(handleClose, trigger, 'mousedown')

  useKeyPress(['esc'], handleClose)

  const val = value || color

  return (
    <>
      <StyledTrigger ref={trigger} onClick={handleShow} className='rc-awsome-color-picker-trigger' style={{ background: val, ...style }} />
      {visible &&
        createPortal(
          <ColorPlane style={{ left: position.x, top: position.t }} value={val || ''} onChange={handleChange} onClose={handleClose} {...rest} />,
          document.body
        )}
    </>
  )
}

export default Trigger
