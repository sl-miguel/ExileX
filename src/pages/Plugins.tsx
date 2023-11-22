import { useEffect } from 'react';

function Plugins() {
	useEffect(() => {
		console.log('Plugins loaded.');
	}, []);

	return (
		<div>
			<h1>Plugins</h1>
		</div>
	);
}

export default Plugins;
