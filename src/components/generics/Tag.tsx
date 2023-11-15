interface TagProps {
	text: string;
}

function Tag({ text }: TagProps) {
	const lowercaseText = text.toLowerCase();
	const colorMap: { [key: string]: string } = {
		enemy: '#FFC6C6',
		friend: '#FFC6F9',
		ally: '#C6FFCB',
	};

	const color = colorMap[lowercaseText] || '#9F9AA9';
	console.log(color);

	return (
		<span className='px-2 py-1 rounded-lg text-xs' style={{ backgroundColor: color }}>
			{text}
		</span>
	);
}

export default Tag;
