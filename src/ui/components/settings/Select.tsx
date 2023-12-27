import { useEffect, useState } from 'react';

interface SelectProps {
  plugin: any;
  setting: any;
  toParent: (plugin: any, updatedSetting: any) => void;
}

function Select({ plugin, setting, toParent }: SelectProps) {
  const [value, setValue] = useState(setting.value);

  useEffect(() => {
    const updatedSettings = { ...setting, value };
    toParent(plugin, updatedSettings);
  }, [value]);

  return (
    <div>
      <select
        className="mb-2 mt-1 flex h-8 w-full items-center justify-between overflow-hidden rounded-md border border-gray px-3 focus:outline-black "
        value={value.puuid}
        id={setting.id}
        onChange={(event) => setValue(setting.options.find((option: any) => option.puuid === event.target.value))}
      >
        {setting.options.map((option: any, index: number) => (
          <option key={index} value={option.puuid}>
            {option.gameName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
