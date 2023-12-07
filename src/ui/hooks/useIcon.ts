import { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';

const useIcon = (endpoint: string) => {
  const [icon, setIcon] = useState<Buffer | null>(null);

  useEffect(() => {

    ipcRenderer.send('useIcon[request]', endpoint);

    const handleIconFetched = (_event: any, data: Buffer) => {
      console.log('useIcon', data);
      setIcon(data);
    };

    ipcRenderer.on('useIcon[response]', handleIconFetched);

    return () => {
      ipcRenderer.removeListener('useIcon[response]', handleIconFetched);
    };

  }, [endpoint])

  return icon;
}

export default useIcon;