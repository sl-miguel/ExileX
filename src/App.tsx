import { useEffect } from 'react';
import { useLcu } from './context/LeagueContext';
import Sidebar from './components/sidebar/Sidebar';
import Router from './components/Router';
import Loader from './pages/Loader';

function App() {
	const { isConnected } = useLcu();

	useEffect(() => {
		console.log('Loader is', isConnected ? 'on' : 'off');
	}, [isConnected]);

	if (!isConnected) return <Loader />;

	return (
		<div className='flex'>
			<Sidebar />
			<div className='px-4 py-6 grow'>
				<Router />
			</div>
		</div>
	);
}

export default App;
