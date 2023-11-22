import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { LcuProvider } from './context/LeagueContext.tsx';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<LcuProvider>
		<Router>
			<App />
		</Router>
	</LcuProvider>
);
