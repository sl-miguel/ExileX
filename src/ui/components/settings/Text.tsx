import { useState } from 'react';

interface TextProps {
  text: string;
}

function Text({ text }: TextProps) {
  const [value, setValue] = useState(text);
  return (
    <input
      className="mb-2 mt-1 flex h-8 w-full items-center justify-between overflow-hidden rounded-md border border-gray px-3 focus:outline-black"
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Your text here"
    />
  );
}

export default Text;
