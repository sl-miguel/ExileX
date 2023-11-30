import { useEffect, useState } from 'react';

interface RadioProps {
  plugin: any;
  setting: any;
  toParent: (plugin: any, updatedSetting: any) => void;
}

function Radio({ plugin, setting, toParent }: RadioProps) {
  const [value, setValue] = useState(setting.value);

  useEffect(() => {
    const updatedSettings = { ...setting, value };
    toParent(plugin, updatedSettings);
  }, [value]);

  return (
    <div className="flex h-9 gap-0.5 overflow-hidden rounded-md">
      {setting.options.map((option: any, index: number) => (
        <div key={`${setting.id}_${index}`} className="flex-grow">
          <input
            type="radio"
            name={setting.id}
            id={`${setting.id}_${index}`}
            value={option}
            checked={option === value}
            onChange={() => setValue(option)}
            className="hidden"
          />
          <label
            htmlFor={`${setting.id}_${index}`}
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
