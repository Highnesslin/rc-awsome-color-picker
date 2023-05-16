import { FC, ReactNode, useState } from 'react';
import { INPUT_MODE } from '../../utils/const';

interface ColorInputProps {
  children: (mode: INPUT_MODE) => ReactNode | null;
}
const ColorInput: FC<ColorInputProps> = ({ children }) => {
  const [mode, setMode] = useState<INPUT_MODE>(INPUT_MODE.HEX);

  const handleChangeMode: React.ChangeEventHandler<HTMLSelectElement> = e => {
    const inputMode = e.target.value as INPUT_MODE;
    setMode(inputMode);
  };

  
  return (
    <div className='input-section'>
      <select className='text' value={mode} onChange={handleChangeMode}>
        <option>{INPUT_MODE.HEX}</option>
        <option>{INPUT_MODE.RGB}</option>
      </select>
      {children(mode)}
    </div>
  );
};

export default ColorInput;
