import { CSSProperties, HTMLAttributes, MouseEvent, MouseEventHandler, ReactNode, useRef } from 'react';
import { useReactive } from 'ahooks';
import { stopReactEventPropagation } from '../../../utils/dom';
import { StyledSlider } from '../../../styles';
import Pointer, { PointerType } from './Pointer';

export interface SliderProps<T extends number | number[]> extends Omit<HTMLAttributes<HTMLDivElement>, 'onDragStart' | 'onDrag' | 'onDragEnd'> {
  mode: 'horizontal' | 'vertical'
  value: T
  extra?: ReactNode
  pointerElement?: PointerType
  onActiveChange?: (active: number) => void
  onDragStart?: (progress: T) => void;
  onDrag?: (progress: T) => void;
  onDragEnd?: (progress: T) => void;
}

const normalize = <T extends number | number[]>(val: T): T => {
  if (Array.isArray(val)) {
    return val
  }
  return val || 0 as T
}

const nor = (value: number | number[]) => Array.isArray(value) ? value : [value]

const Slider = <T extends number | number[] = number> ({ mode, value, pointerElement, onActiveChange, onDragStart, onDrag, onDragEnd, className, extra, ...rest }: SliderProps<T>) => {
  const pointer = useRef<HTMLDivElement>(null)
  const state = useReactive({
    active: 0,
    progress: normalize(value)
  })

  const getPositionValue = (e: globalThis.MouseEvent | MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    const cur = mode === 'horizontal' ? e.clientX : e.clientY

    const HBandRect = pointer.current!.getBoundingClientRect();

    const base = mode === 'horizontal' ? HBandRect.width : HBandRect.height
    const pre = mode === 'horizontal' ? HBandRect.left : HBandRect.top

    return Math.min(1, Math.max(0, cur - pre) / base)
  };

  const handleDrag: MouseEventHandler<HTMLDivElement> = e => {
    stopReactEventPropagation(e);
    e.preventDefault();

    const cur = getPositionValue(e);

    const nextProgress = (Array.isArray(state.progress) ? state.progress.map((pre, index) => state.active === index ? cur : pre) : cur) as T
    onDragStart && onDragStart(nextProgress)
    state.progress = nextProgress

    const onMouseMove = (e: globalThis.MouseEvent) => {
      e.stopPropagation();
      e.stopImmediatePropagation();
      e.preventDefault();

      const cur = getPositionValue(e);

      const nextProgress = (Array.isArray(state.progress) ? state.progress.map((pre, index) => state.active === index ? cur : pre) : cur) as T
      onDrag && onDrag(nextProgress);
      state.progress = nextProgress
    };

    const onMouseUp = (e: globalThis.MouseEvent) => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      const cur = getPositionValue(e);

      const nextProgress = (Array.isArray(state.progress) ? state.progress.map((pre, index) => state.active === index ? cur : pre) : cur) as T
      onDragEnd && onDragEnd(nextProgress);
      state.progress = nextProgress
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const handleActiveChange = (index: number) => {
    state.active = index
    onActiveChange && onActiveChange(index)
  }

  const getStyle = (num: number): CSSProperties => {
    const key = mode === 'horizontal' ? 'left' : 'top'

    return {
      [key]: `${num * 100}%`
    }
  }

  const normalizeValue = nor(value || state.progress)

  return (
    <StyledSlider className={`${mode} ${className || ''}`} {...rest} onMouseDown={handleDrag}>
      {extra}
      <div className='rail color-rail' ref={pointer}>
        {normalizeValue.map((num, index) => {
          return (
            <Pointer
              key={index}
              tag={pointerElement}
              active={normalizeValue.length > 1 && state.active === index}
              style={getStyle(num)}
              onMouseDown={() => handleActiveChange(index)}
            />
          )
        })}
      </div>
    </StyledSlider>
  );
}
 
export default Slider;