# rc-awsome-color-picker

基于 [mb-react-color-picker](https://github.com/mockingbot/mb-color-picker)二次开发

## Install

```bash
npm i rc-awsome-color-picker
```

## About

```jsx
import { useState } from 'react'
import { ColorPicker } from 'rc-awsome-color-picker'

const App = function () {
  const [color, setColor] = useState('')

  return <ColorPicker headerText='颜色选择器' color={color} onChange={setColor} />
}

export default App

```
