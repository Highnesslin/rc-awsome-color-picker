import { useState } from 'react'
import { ColorPicker } from '../lib'

const App = function () {
  // '#00aaffa1'
  // rgba(0,0,0,0.5)
  const [color, setColor] = useState('')

  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: 100 }}>
      <span style={{ marginRight: 6, fontSize: 12 }}>颜色</span>
      <ColorPicker headerTitle='' />
    </div>
  )
}

export default App
