import { AccordionHeaderProps } from './interfaces';
import * as Icons from '../icons';
import Switch from '../generics/Switch';

function AccordionHeader({ children, expanded, onClick }: AccordionHeaderProps) {
  return (
    <div className="flex h-12 cursor-pointer items-center font-medium" onClick={onClick}>
      <div className="flex items-center gap-2">
        <Switch />
        {children}
      </div>
      <div className={`ml-auto transition-all duration-500 ${expanded ? 'rotate-180' : ''}`}>
        <Icons.Chevron size={24} color="#1F1F1F" />
      </div>
    </div>
  );
}

export default AccordionHeader;
