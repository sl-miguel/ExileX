import { useState } from 'react';

interface RadioProps {
  options: string[];
  defaultValue: string;
  id: string;
}

function Radio({ options, defaultValue, id }: RadioProps) {
  const [value, setValue] = useState(defaultValue);

  return (
    <div className="flex h-9 gap-0.5 overflow-hidden rounded-md">
      {options.map((option, index) => (
        <div key={`${id}_${index}`} className="flex-grow">
          <input
            type="radio"
            name={id}
            id={`${id}_${index}`}
            value={option}
            checked={option === value}
            onChange={() => setValue(option)}
            className="hidden"
          />
          <label
            htmlFor={`${id}_${index}`}
            className={`flex h-full cursor-pointer items-center justify-center text-center text-sm leading-none text-white hover:bg-black ${
              option === value ? 'bg-black text-white' : 'bg-gray'
            }`}
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  );
}

export default Radio;
