import { useEffect, useState } from 'react';
import Switch from '../generics/Switch';
import Tooltip from '../generics/Tooltip';

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
      <div className="flex items-center gap-2">
        {setting.bubble && <Tooltip text={setting.bubble} textColor={'#FFFFFF'} iconColor={'#9F9AA9'} bubbleColor={'#1F1F1F'} size={15} />}
        <span>{setting.text}</span>
      </div>
      <Switch checked={value} onChange={() => setValue(!value)} />
    </div>
  );
}

export default Toggle;
