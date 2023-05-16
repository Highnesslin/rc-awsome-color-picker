import { useState } from 'react'
import { ColorPicker } from '../lib'

const App = function () {
  // '#00aaffa1'
  // rgba(0,0,0,0.5)
  const [color, setColor] = useState('linear-gradient(to right, rgba(255, 255, 255, 0) 0%, #333 100%)')

  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: 100 }}>
      <span style={{ marginRight: 6, fontSize: 12 }}>颜色</span>
      <ColorPicker headerTitle='' value={color} onChange={setColor} />
    </div>
  )
}

export default App
