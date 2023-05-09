import { FC, MouseEventHandler, useReducer } from 'react'
import AwsomeColorPicker, { ColorPickerProps } from './ColorPlane'
import { createPortal } from 'react-dom'
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

const ColorPicker: FC<ColorPickerProps> = ({ value, onChange, style, ...rest }) => {
  const [state, setState] = useReducer<Reducer>((s, action) => ({ ...s, ...action }), {
    visible: false,
    color: value,
    position: {
      x: 0,
      t: 0
    }
  })

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

  const handleClose = () => setState({ visible: false })

  const val = value || color

  return (
    <>
      <StyledTrigger onClick={handleShow} className='rc-awsome-color-picker-trigger' style={{ backgroundColor: val }} />
      {visible &&
        createPortal(
          <AwsomeColorPicker style={{ ...style, left: position.x, top: position.t }} value={val || ''} onChange={handleChange} onClose={handleClose} {...rest} />,
          document.body
        )}
    </>
  )
}

export default ColorPicker
