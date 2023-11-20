import { useEffect, useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Router from './components/Router';
import Loader from './pages/Loader';

function App() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const onPageLoad = () => {
			console.log('Page loaded !');
			window.utilities.clientReady();
		};

		if (document.readyState === 'complete') onPageLoad();
		else window.addEventListener('load', onPageLoad, false);

		return () => window.removeEventListener('load', onPageLoad);
	}, []);

	useEffect(() => {
		console.log('Lcu Connection');
		window.lcu.connection((_event: any, value: any) => setLoading(value));
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
