import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import Plugins from '../pages/Plugins';
import Chaos from '../pages/Chaos';

function Router() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/plugins' element={<Plugins />} />
			<Route path='/chaos' element={<Chaos />} />
		</Routes>
	);
}

export default Router;
