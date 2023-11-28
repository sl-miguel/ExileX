import { ipcRenderer } from 'electron';
import { useEffect } from 'react';

function Plugins() {
  useEffect(() => {
    const handlePlugins = (_: any, plugins: any) => {
      console.log('Got plugins settings', plugins);
    };

    ipcRenderer.send('plugins-mounted');
    ipcRenderer.on('plugins', handlePlugins);

    return () => {
      ipcRenderer.removeListener('plugins', handlePlugins);
    };
  }, []);

  return (
    <div>
      <h1>Plugins</h1>
    </div>
  );
}

export default Plugins;
