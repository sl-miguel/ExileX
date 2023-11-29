import Switch from '../generics/Switch';

interface ToggleProps {
  text: string;
  value: boolean;
}

function Toggle({ text, value }: ToggleProps) {
  return (
    <div className="flex justify-between">
      <span>{text}</span>
      <Switch checked={value} />
    </div>
  );
}

export default Toggle;
