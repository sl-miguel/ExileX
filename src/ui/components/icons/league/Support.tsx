import IconProps from '../IconProps';

function Support({ color, size = 35 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 13C4.465 13 0 9 0 9H11L14 12L12 19L7 17L10 13H8ZM12 5L13.173 3H20.938L22 5L17 11L12 5ZM17 14L18 13L21 28L17 31L13 28L16 13L17 14ZM23 9H34C34 9 29.535 13 26 13H24L27 17L22 19L20 12L23 9Z"
        fill="#EDEEEE"
      />
    </svg>
  );
}

export default Support;
