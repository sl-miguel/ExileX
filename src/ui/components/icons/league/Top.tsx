import IconProps from '../IconProps';

function Top({ color, size = 35 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.5" d="M13.0001 14H20.0001V21H13.0001V14ZM8.00008 11V26H22.9861L26.9861 30H4.00008V7.01599L8.00008 11Z" fill="#C0C2C2" />
      <path d="M30 4L29.997 28.045L25 23V9H11L5.955 4.003L30 4Z" fill="#EDEEEE" />
    </svg>
  );
}

export default Top;
