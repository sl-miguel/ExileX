import { useEffect, useState } from 'react';
import Switch from '../generics/Switch';

interface ToggleProps {
  plugin: any;
  setting: any;
  toParent: (plugin: any, updatedSetting: any) => void;
}

function Toggle({ plugin, setting, toParent }: ToggleProps) {
  const [value, setValue] = useState(setting.value);

  useEffect(() => {
    const updatedSettings = { ...setting, value };
    toParent(plugin, updatedSettings);
  }, [value]);

  return (
    <div className="flex justify-between">
      <span>{setting.text}</span>
      <Switch checked={value} onChange={() => setValue(!value)} />
    </div>
  );
}

export default Toggle;
