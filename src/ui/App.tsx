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

  useEffect(() => {
    ipcRenderer.send('is-connected', !loading);
  }, [loading]);

  if (loading) return <Loader />;

  return (
    <div className="flex">
      <Sidebar />
      <div className="h-screen grow overflow-y-scroll px-4 py-6 [&::-webkit-scrollbar-thumb]:bg-black [&::-webkit-scrollbar]:w-1  [&::-webkit-scrollbar]:bg-gray">
        <Router />
      </div>
    </div>
  );
}

export default App;
