import { Link } from 'react-router-dom';
import SidebarLink from './SidebarLink';
import * as Icons from '../icons';

function Sidebar() {
	return (
		<div className='w-28 py-12 h-screen bg-light'>
			<ul className='flex flex-col gap-16 h-full text-center'>
				<li className='mb-4'>
					<Link to='/' className='flex justify-center'>
						<Icons.Exile color='#1F1F1F' size={60} />
					</Link>
				</li>
				<li>
					<SidebarLink to='/plugins' element={<Icons.Plugin color='#9F9AA9' />} text='Plugins' activeColor='#1F1F1F' />
				</li>
				<li>
					<SidebarLink to='/chaos' element={<Icons.Chaos color='#9F9AA9' />} text='Chaos' activeColor='#1F1F1F' />
				</li>
				<li className='mt-auto'>
					<SidebarLink to='/' element={<Icons.Profile color='#9F9AA9' />} text='Profile' activeColor='#1F1F1F' />
				</li>
			</ul>
		</div>
	);
}

export default Sidebar;
