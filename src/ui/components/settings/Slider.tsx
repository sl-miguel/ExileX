import { useState } from 'react';
import * as Icons from '../icons';

interface SliderProps {
  defaultValue: number;
  step?: number;
  min?: number;
  max?: number;
}

function Slider({ defaultValue = 0, step = 1, min, max }: SliderProps) {
  const [value, setValue] = useState(defaultValue);

  const incrementing = () => {
    const nextValue = value + step;
    setValue(max ? Math.min(nextValue, max) : nextValue);
    // setValue((prevValue) => prevValue + step);
  };

  const decrementing = () => {
    const nextValue = value - step;
    setValue(min ? Math.max(nextValue, min) : nextValue);
    // setValue((prevValue) => prevValue - step)
  };

  return (
    <div className="mb-2 mt-1 flex w-full items-center justify-between overflow-hidden rounded-md border border-gray">
      <button
        className="flex w-16 cursor-pointer items-center justify-center border-none bg-gray py-1 text-white hover:bg-black"
        onClick={() => decrementing()}
      >
        <div className="rotate-90">
          <Icons.Chevron size={24} color="#fff" />
        </div>
      </button>
      <input
        className="h-full w-20 border-none text-center focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={() => setValue(value)}
      />
      <button
        className="flex w-16 cursor-pointer items-center justify-center border-none bg-gray py-1 text-white hover:bg-black"
        onClick={() => incrementing()}
      >
        <div className="-rotate-90">
          <Icons.Chevron size={24} color="#fff" />
        </div>
      </button>
    </div>
  );
}

export default Slider;
