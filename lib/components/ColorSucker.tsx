import { FC } from "react"

interface ColorSuckerProps {
  onSucker?: (color: string) => void
}
const ColorSucker: FC<ColorSuckerProps> = ({ onSucker }) => {
  const handleSucker = async () => {
    if (!window.EyeDropper) {
      throw new Error('当前浏览器不支持吸管')
    }

    const eyeDropper = new window.EyeDropper() // 初始化一个EyeDropper对象

    try {
      const result = await eyeDropper.open() // 开始拾取颜色
      onSucker && onSucker(result.sRGBHex)
    } catch (e) {
    }
  }

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleSucker}>
      <path d="M14.8284 10.5858C15.2189 10.9763 15.2189 11.6095 14.8284 12L8.18155 18.6468C7.16619 19.6622 5.70991 19.8521 4.92886 19.0711C4.18331 18.3255 4.3225 16.9647 5.21979 15.9595L5.35312 15.8184L11.9999 9.17158C12.3904 8.78105 13.0236 8.78105 13.4141 9.17158L14.8284 10.5858Z" stroke="currentColor" strokeWidth="1.5"></path>
      <path d="M19.071 4.92894C19.8165 5.67448 19.768 6.94461 18.9857 7.83489L18.8689 7.9594L16.4446 10.3838C15.5519 11.2764 14.1951 11.3668 13.4141 10.5858C12.6686 9.84025 12.7171 8.57012 13.4994 7.67984L13.6161 7.55533L16.0405 5.13097C16.9331 4.23834 18.2899 4.14789 19.071 4.92894Z" fill="currentColor" fillRule="nonzero"></path>
      <rect x="10.5857" y="4.92893" width="12" height="3" rx="1.5" transform="rotate(45 10.5857 4.92893)" fill="currentColor" fillRule="nonzero"></rect>
    </svg>
  )
}

export default ColorSucker
