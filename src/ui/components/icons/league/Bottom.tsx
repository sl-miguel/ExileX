import IconProps from '../IconProps';

function Bottom({ color, size = 35 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.5" d="M21 20H14V13H21V20ZM30 4V26.984L26.045 22.984L26 8H11.014L7.014 4H30Z" fill="#C0C2C2" />
      <path d="M4.00292 5.95502L8.99992 11V25H22.9999L28.0449 29.997L3.99992 30L4.00292 5.95502Z" fill="#EDEEEE" />
    </svg>
  );
}

export default Bottom;
