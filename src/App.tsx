import { useEffect, useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Router from './components/Router';
import Loader from './pages/Loader';

function App() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// window.lcu.onConnect((event: any, value: any) => console.log(value));
		setTimeout(() => setLoading(false), 3400);
	}, [loading]);

	if (loading) return <Loader />;
	return (
		<div className='flex'>
			<Sidebar />
			<Router />
		</div>
	);
}

export default App;
