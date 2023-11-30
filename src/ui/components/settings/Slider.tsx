import { useEffect, useState } from 'react';
import * as Icons from '../icons';

interface SliderProps {
  plugin: any;
  setting: any;
  toParent: (plugin: any, updatedSetting: any) => void;
}

function Slider({ plugin, setting, toParent }: SliderProps) {
  const [value, setValue] = useState(setting.value);

  console.log(setting);

  const incrementing = () => {
    const nextValue = value + setting.step;
    setValue(nextValue <= setting.max ? nextValue : value);
  };

  const decrementing = () => {
    const nextValue = value - setting.step;
    setValue(nextValue >= setting.min ? nextValue : value);
  };

  useEffect(() => {
    const updatedSettings = { ...setting, value };
    toParent(plugin, updatedSettings);
  }, [value]);

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
        min={setting.min}
        max={setting.max}
        onChange={(e) => setValue(e.target.value)}
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
