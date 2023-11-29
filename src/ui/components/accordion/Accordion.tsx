import { useState, cloneElement } from 'react';
import { AccordionProps } from './interfaces';

function Accordion({ children, open = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(open);
  const [header, body] = children;

  const handleHeaderClick = () => setIsOpen(!isOpen);

  return (
    <div className="border-b-[0.5px] border-solid border-gray">
      {cloneElement(header, { onClick: handleHeaderClick, expanded: isOpen })}
      {cloneElement(body, { expanded: isOpen })}
    </div>
  );
}

export default Accordion;
