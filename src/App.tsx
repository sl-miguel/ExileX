import { useEffect, useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Router from './components/Router';
import Loader from './pages/Loader';

function App() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		window.lcu.onConnect((_event: any, value: any) => setLoading(!value));
		window.lcu.onDisconnect((_event: any, value: any) => setLoading(!value));
		setTimeout(() => setLoading(false), 3400); // temp
	}, [loading]);

	if (loading) return <Loader />;

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
