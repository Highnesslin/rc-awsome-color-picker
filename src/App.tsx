import { useState } from 'react'
import { ColorPicker } from '../lib'

const App = function () {
  // '#00aaffa1'
  // rgba(0,0,0,0.5)
  const [color, setColor] = useState('')

  return (
    <ColorPicker headerText='颜色选择器' value={color} onChange={setColor} />
  )
}

export default App
