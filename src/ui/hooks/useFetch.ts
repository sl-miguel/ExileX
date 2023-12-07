import { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';

const useFetch = <T>(endpoint: string): T | null =>  {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {

    ipcRenderer.send('useFetch[request]', endpoint);

    const handleIconFetched = (_event: any, data: T) => {
      console.log('useFetch', data);
      setData(data);
    };

    ipcRenderer.on('useFetch[response]', handleIconFetched);

    return () => {
      ipcRenderer.removeListener('useFetch[response]', handleIconFetched);
    };

  }, [endpoint])

  return data;
}

export default useFetch;