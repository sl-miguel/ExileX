import { ipcRenderer } from 'electron';

function Switch() {
  ipcRenderer.on('pong', () => {
    console.log('Got message from node.');
  });

  return (
    <div>
      <h1 className="font-primary cursor-pointer text-3xl font-black" onClick={() => ipcRenderer.send('ping')}>
        This is a test
      </h1>
    </div>
  );
}

export default Switch;
