import IconProps from './IconProps';

function Exile({ color, size = 35 }: IconProps) {
	return (
		<svg width={size} height={size} viewBox='0 0 35 35' fill={color} xmlns='http://www.w3.org/2000/svg'>
			<path d='M24 8.79144C19.0905 10.4078 15.55 14.9924 15.55 20.3957C15.55 25.799 19.0905 30.3836 24 32V24.7125C22.8032 23.6521 22.05 22.111 22.05 20.3958C22.05 18.6805 22.8032 17.1395 24 16.079V8.79144Z' />
			<path d='M11 26.2086C15.9095 24.5922 19.45 20.0076 19.45 14.6043C19.45 9.201 15.9095 4.61637 11 3V10.2875C12.1968 11.3479 12.95 12.889 12.95 14.6043C12.95 16.3196 12.1968 17.8607 11 18.9211V26.2086Z' />
		</svg>
	);
}

export default Exile;
