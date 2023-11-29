import { AccordionBodyProps } from './interfaces';

function AccordionBody({ children, expanded }: AccordionBodyProps) {
  return (
    <div className={`transition-max-h overflow-hidden duration-500 ease-in-out ${expanded ? 'max-h-96' : 'max-h-0'}`}>
      <div className="mb-4 px-2">{children}</div>
    </div>
  );
}

export default AccordionBody;
