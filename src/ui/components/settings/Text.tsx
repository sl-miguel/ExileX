import { useEffect, useState } from 'react';

interface TextProps {
  plugin: any;
  setting: any;
  toParent: (plugin: any, updatedSetting: any) => void;
}

function Text({ plugin, setting, toParent }: TextProps) {
  const [value, setValue] = useState(setting.value);

  useEffect(() => {
    console.log(value);
    const updatedSettings = { ...setting, value };
    toParent(plugin, updatedSettings);
  }, [value]);

  return (
    <input
      className="mb-2 mt-1 flex h-8 w-full items-center justify-between overflow-hidden rounded-md border border-gray px-3 focus:outline-black"
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Report message.."
    />
  );
}

export default Text;
