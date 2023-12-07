import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { Champions as ChampionsData } from '../../../electron/typings/ChampionTypings';

function Champions() {
  const [champions, setChampions] = useState<ChampionsData[]>([]);

  const readableDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(date);
    return formattedDate;
  };

  useEffect(() => {
    console.log('Loading champions..');

    const updateChampions = async (_: any, champions: ChampionsData[]) => {
      console.log(champions);
      setChampions(champions);
    };

    ipcRenderer.send('champions[request]');
    ipcRenderer.on('champions[response]', updateChampions);
  }, []);

  return (
    <div>
      {champions.map((champion) => (
        <div key={champion.id} className="py-2">
          <h4>
            {champion.name}, {champion.title}
          </h4>
          <div>
            Roles:{' '}
            {champion.roles.map((role: string) => (
              <span key={role} className="pr-1">
                {role}
              </span>
            ))}
          </div>
          <div>Purchased date: {champion.purchased ? readableDate(champion.purchased) : 'Not Purchased'}</div>
          {/* <img src={champion.iconUrl} alt={champion.name} /> */}
          {/* <img src={`data:image/png;base64,${Buffer.from(champion.iconBuffer).toString('base64')}`} alt={champion.name} /> */}
        </div>
      ))}
    </div>
  );
}

export default Champions;
