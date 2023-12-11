import { ReactNode } from 'react';

interface MultiSelectorProps {
  elements: { id: string; value: boolean; element: ReactNode }[];
  group: string;
}

function MultiSelector({ group, elements }: MultiSelectorProps) {
  return (
    <div className="my-3 flex h-11 gap-0.5 overflow-hidden rounded-md">
      {elements.map((selector) => (
        <div className="flex-grow">
          <input type="checkbox" name={group} id={selector.id} value={selector.id} checked={selector.value} className="hidden" />
          <label
            htmlFor={selector.id}
            className={`flex h-full cursor-pointer items-center justify-center bg-black text-center text-sm leading-none text-white hover:bg-black 
            ${selector.value ? 'bg-black' : 'bg-gray'}`}
          >
            {selector.element}
          </label>
        </div>
      ))}
    </div>
  );
}

export default MultiSelector;
