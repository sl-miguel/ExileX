import IconProps from '../IconProps';

function Jungle({ color, size = 35 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 3C11.128 6.3 14.147 9.851 15.966 14.469C15.1836 16.265 14.5267 18.1131 14 20C13.7241 18.9818 13.3902 17.9801 13 17C13 12.023 11.144 8.277 9 3ZM21 20C22.488 15.513 25.76 13.034 30 11C26.132 14.136 25.578 18.52 25 23L21.257 26.312C19.785 27.917 17.473 30.451 17 31C12.445 21.555 20.366 10.2 25 3C22.33 9.573 20.283 13.342 21 20ZM13 25C12.9563 25.666 12.9563 26.334 13 27L9 23C8.422 18.52 7.868 14.136 4 11C9.288 13.537 11.866 18.854 13 25Z"
        fill="#EDEEEE"
      />
    </svg>
  );
}

export default Jungle;
