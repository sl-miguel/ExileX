interface ButtonProps {
  plugin: any;
  setting: any;
  toParent: (plugin: any, setting: any) => void;
}

function Button({ plugin, setting, toParent }: ButtonProps) {
  return (
    <button
      onClick={() => toParent(plugin, setting)}
      className="my-2 flex h-9 w-full cursor-pointer items-center justify-center rounded-3xl border-none bg-black py-1 text-white"
    >
      {setting.text}
    </button>
  );
}

export default Button;
