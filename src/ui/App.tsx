import { useState } from 'react';
import Router from './components/Router';
import Sidebar from './components/sidebar/Sidebar';
import Loader from './pages/Loader';

function App() {
  const [loading, setLoading] = useState(true);

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
