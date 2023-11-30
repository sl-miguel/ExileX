interface SwitchProps {
  checked: boolean;
  onChange: () => void;
}

function Switch({ checked = false, onChange }: SwitchProps) {
  return (
    <label className="flex items-center">
      <input type="checkbox" onChange={onChange} defaultChecked={checked} className="hidden" />
      <span className={`h-5 w-10 ${checked ? 'bg-black' : 'bg-gray'} relative flex items-center rounded-full p-[2px] transition-colors duration-300`}>
        <span
          className={`block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${checked ? 'translate-x-5' : ''}`}
        />
      </span>
    </label>
  );
}

export default Switch;
