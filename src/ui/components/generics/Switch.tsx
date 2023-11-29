import { useState } from 'react';

function Switch({ checked = false }) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => setIsChecked(!isChecked);

  return (
    <label className="flex items-center">
      <input type="checkbox" onChange={handleToggle} defaultChecked={isChecked} className="hidden" />
      <span
        className={`h-5 w-10 ${
          isChecked ? 'bg-black' : 'bg-gray'
        } relative flex items-center rounded-full p-[2px] transition-colors duration-300`}
      >
        <span
          className={`block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
            isChecked ? 'translate-x-5' : ''
          }`}
        />
      </span>
    </label>
  );
}

export default Switch;
