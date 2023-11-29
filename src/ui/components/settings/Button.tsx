interface ButtonProps {
  text: string;
}

function Button({ text }: ButtonProps) {
  return (
    <button className="my-2 flex h-9 w-full cursor-pointer items-center justify-center rounded-3xl border-none bg-black py-1 text-white">
      {text}
    </button>
  );
}

export default Button;
