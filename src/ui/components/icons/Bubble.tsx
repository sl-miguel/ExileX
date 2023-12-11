import IconProps from './IconProps';

function Bubble({ color, size = 35 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 15 15" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5C15 11.6421 11.6421 15 7.5 15ZM6.75 9.75V11.25H8.25V9.75H6.75ZM6.75 3.75V8.25H8.25V3.75H6.75Z" />
    </svg>
  );
}

export default Bubble;
