import { FC } from 'react';
import { StyledColorPreset } from '../../styles';

const presets = [
  '#000000',
  '#333333',
  '#4F4F4F',
  '#6c6c6c',
  '#9a9a9a',
  '#bebebe',
  '#cecece',
  '#efefef',
  '#ffffff',
  '#de868f',
  '#fcca00',
  '#f4ce98',
  '#fefa83',
  '#ccf783',
  '#B4FDFF',
  '#93D2F3',
  '#7F83F7',
  '#B886F8',
  '#BD3124',
  '#E99D42',
  '#FFBF6B',
  '#FFF81D',
  '#A2EF4D',
  '#75F9FD',
  '#4095E5',
  '#0F40F5',
  '#7728F5',
  '#951D1D',
  '#A16222',
  '#CBA43F',
  '#BFBF3D',
  '#81B337',
  '#54BCBD',
  '#347CAF',
  '#0014B7',
  '#591BB7',
  '#641013',
  '#744E20',
  '#9B7D31',
  '#817F26',
  '#567722',
  '#377F7F',
  '#215476',
  '#000A7B',
  '#3B0E7B',
].map(color => color.toUpperCase());
interface Props {
  value: string;
  onChange: (color: string) => void;
}
const ColorPreset: FC<Props> = ({ value, onChange }) => {
  return (
    <StyledColorPreset>
      {presets.map(hex => (
        <div
          key={hex}
          className={'#' + value === hex ? 'active' : ''}
          style={{ backgroundColor: hex }}
          onClick={() => onChange(hex)}
        />
      ))}
    </StyledColorPreset>
  );
};

export default ColorPreset;
