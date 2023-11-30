import { AccordionHeaderProps } from './interfaces';
import * as Icons from '../icons';
import Switch from '../generics/Switch';
import { useEffect, useState } from 'react';

function AccordionHeader({ children, expanded, onClick, plugin, toParent }: AccordionHeaderProps) {
  const [value, setValue] = useState(plugin.active);

  useEffect(() => {
    const updatedPlugin = { ...plugin, active: value };
    toParent(updatedPlugin);
  }, [value]);

  return (
    <div className="flex h-12 cursor-pointer items-center font-medium" onClick={onClick}>
      <div className="flex items-center gap-2">
        <Switch checked={value} onChange={() => setValue(!value)} />
        {children}
      </div>
      <div className={`ml-auto transition-all duration-500 ${expanded ? 'rotate-180' : ''}`}>
        <Icons.Chevron size={24} color="#1F1F1F" />
      </div>
    </div>
  );
}

export default AccordionHeader;
