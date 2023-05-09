# rc-awsome-color-picker

基于 [mb-react-color-picker](https://github.com/mockingbot/mb-color-picker)二次开发

## Install

```bash
npm i rc-awsome-color-picker
```

## Usage

![preview](https://yun.dui88.com/tuia-fed/assets/20230509153853.jpg)

```jsx
import { useState } from 'react'
import { ColorPicker } from 'rc-awsome-color-picker'

const App = function () {
  const [color, setColor] = useState('')

  return <ColorPicker headerText='颜色选择器' color={color} onChange={setColor} />
}

export default App

```

## About
  <!-- 
  value?: string,
  headerTitle?: string,
  onChange: (color: string) => void,
  onClose?: (e: React.MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => void, -->

|  参数   | 说明  | 类型  | 默认值  |
|  ----  | ----  | ----  | ----  |
| `value`  | 颜色(支持十六进制和RGBA格式) | `string` \| `undefined` | `#fff` |
| `onChange`  | 颜色被修改时的回调函数 | `(hex: string) => void` | `undefined` |
| `onClose`  | 颜色选择器面板 被关闭时的回调函数 | `(e: React.MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => void` | `undefined` |
| `headerTitle`  | 颜色选择器面板的标题组件 | `ReactChildren` | `undefined` |
