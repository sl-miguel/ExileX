import { useEffect, useState } from 'react';
import Router from './components/Router';
import Sidebar from './components/sidebar/Sidebar';
import Loader from './pages/Loader';
import { ipcRenderer } from 'electron';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ipcRenderer.on('lcu-is-connected', (_, value: boolean) => setLoading(!value));
  }, []);

  // temp
  useEffect(() => {
    ipcRenderer.send('is-connected', !loading);
  }, [loading]);

  if (loading) return <Loader />;

  return (
    <div className="flex">
      <Sidebar />
      <div className="grow px-4 py-6">
        <Router />
      </div>
    </div>
  );
}

export default App;
