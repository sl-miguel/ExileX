interface TagProps {
	text: string;
}

function Tag({ text }: TagProps) {
	return <span className='px-2 py-1 rounded-lg text-xs bg-gray'>{text}</span>;
}

export default Tag;
