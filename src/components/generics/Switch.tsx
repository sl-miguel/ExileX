import { useState } from 'react';

function Switch() {
	const [isChecked, setIsChecked] = useState(false);

	const handleToggle = () => setIsChecked(!isChecked);

	return (
		<label className='flex items-center space-x-2'>
			<input type='checkbox' onChange={handleToggle} defaultChecked={isChecked} className='hidden' />
			<span className={`w-10 h-5 ${isChecked ? 'bg-black' : 'bg-gray'} rounded-full p-[2px] flex items-center duration-300 transition-colors relative`}>
				<span className={`block w-4 h-4 bg-white rounded-full shadow-md transform duration-300 transition-transform ${isChecked ? 'translate-x-5' : ''}`} />
			</span>
		</label>
	);
}

export default Switch;
