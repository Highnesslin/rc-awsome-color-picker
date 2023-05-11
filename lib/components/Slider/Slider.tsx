import { FC, HTMLAttributes, MouseEvent, MouseEventHandler, ReactNode, useMemo, useRef, useState } from 'react';
import { stopReactEventPropagation } from '../../utils/dom';
import { StyledSlider } from '../../styles';

export interface SliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onDragStart' | 'onDrag' | 'onDragEnd'> {
  mode: 'horizontal' | 'vertical'
  value: number
  extra?: ReactNode
  onDragStart?: (progress: number) => void;
  onDrag?: (progress: number) => void;
  onDragEnd?: (progress: number) => void;
}

const Slider: FC<SliderProps> = ({ mode, value, onDragStart, onDrag, onDragEnd, className, extra, ...rest }) => {
  const pointer = useRef<HTMLDivElement>(null)

  const [progress, setProgress] = useState(0)

  const getPositionValue = (e: globalThis.MouseEvent | MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    const cur = mode === 'horizontal' ? e.clientX : e.clientY

    const HBandRect = pointer.current!.getBoundingClientRect();

    const base = mode === 'horizontal' ? HBandRect.width : HBandRect.height
    const pre = mode === 'horizontal' ? HBandRect.left : HBandRect.top

    return Math.min(1, Math.max(0, cur - pre) / base)
  };

  const handleDragHBand: MouseEventHandler<HTMLDivElement> = e => {
    stopReactEventPropagation(e);
    e.preventDefault();

    const value = getPositionValue(e);

    setProgress(value)

    onDragStart && onDragStart(value)

    const onMouseMove = (e: globalThis.MouseEvent) => {
      e.stopPropagation();
      e.stopImmediatePropagation();
      e.preventDefault();

      if (!pointer.current) return;

      const value = getPositionValue(e);

      setProgress(value)

      onDrag && onDrag(value);
    };

    const onMouseUp = (e: globalThis.MouseEvent) => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (!pointer.current) return;

      const value = getPositionValue(e);

      setProgress(value)

      onDragEnd && onDragEnd(value);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const style = useMemo(() => {
    const v = value || progress
    const key = mode === 'horizontal' ? 'left' : 'top'

    return {
      [key]: `${v * 100}%`
    }
  }, [mode, value, progress]);

  return (
    <StyledSlider className={`${mode} ${className || ''}`} {...rest} onMouseDown={handleDragHBand}>
      {extra}
      <div className='rail color-rail' ref={pointer}>
        <span className='pointer' style={style} />
      </div>
    </StyledSlider>
  );
}
 
export default Slider;