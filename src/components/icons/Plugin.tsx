import IconProps from './IconProps';

function Plugin({ color, size = 35 }: IconProps) {
	return (
		<svg width={size} height={size} viewBox='0 0 35 35' fill={color} xmlns='http://www.w3.org/2000/svg'>
			<path d='M28.687 10.4231L17.5 4L6.31307 10.4231L17.5 16.8462L28.687 10.4231ZM5 12.6849V25.5311L16.1842 31.9527V19.1063L5 12.6849ZM18.8158 31.9527L30 25.5311V12.6849L18.8158 19.1063V31.9527Z' />
		</svg>
	);
}

export default Plugin;
