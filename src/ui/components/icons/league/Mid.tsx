import IconProps from '../IconProps';

function Mid({ color, size = 35 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.5" d="M4 12.968L8.008 16.968L8 26H17L21 30H4V12.968ZM17.021 8L13 4H30V20.977L26 17V8H17.019H17.021Z" fill="#C0C2C2" />
      <path d="M9 4L30 25V30H25L4 9V4H9Z" fill="#EDEEEE" />
    </svg>
  );
}

export default Mid;
