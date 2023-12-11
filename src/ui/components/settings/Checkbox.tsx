import { useEffect, useState } from 'react';

interface CheckboxProps {
  plugin: any;
  setting: any;
  toParent: (plugin: any, updatedSetting: any) => void;
}

function Checkbox({ plugin, setting, toParent }: CheckboxProps) {
  const [value, setValue] = useState(setting.value);

  useEffect(() => {
    const updatedSettings = { ...setting, value };
    toParent(plugin, updatedSettings);
  }, [value]);

  const handleCheckbox = (option: string) => {
    const hasValue = value.includes(option);
    const updatedValue = hasValue ? value.filter((val: string) => val !== option) : [...value, option];
    setValue(updatedValue);
  };

  return (
    <div className="my-2 flex h-9 gap-0.5 overflow-hidden rounded-md">
      {setting.options.map((option: any, index: number) => (
        <div key={`${setting.id}_${index}`} className="flex-grow">
          <input
            type="checkbox"
            name={setting.id}
            id={`${setting.id}_${index}`}
            value={option}
            checked={value.includes(option)}
            onChange={() => handleCheckbox(option)}
            className="hidden"
          />
          <label
            htmlFor={`${setting.id}_${index}`}
            className={`flex h-full cursor-pointer items-center justify-center text-center text-sm leading-none text-white hover:bg-black ${
              value.includes(option) ? 'bg-black text-white' : 'bg-gray'
            }`}
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  );
}

export default Checkbox;
