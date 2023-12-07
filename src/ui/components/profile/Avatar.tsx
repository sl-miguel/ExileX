import useIcon from '../../hooks/useIcon';
import { Me } from '../../../electron/typings/MeTypings';

interface AvatarProps {
  infos: Me;
}

function Avatar({ infos }: AvatarProps) {
  const icon = useIcon(`/lol-game-data/assets/v1/profile-icons/${infos.icon}.jpg`);

  return (
    <div className="flex flex-col items-center">
      {icon && (
        <img
          className="mb-4 h-32 w-32 rounded-full outline outline-4 outline-black"
          src={`data:image/png;base64,${Buffer.from(icon).toString('base64')}`}
        />
      )}
      <div className="text-lg font-bold">
        <span>{infos.gameName}</span> <span className="text-gray">#{infos.gameTag}</span>
      </div>
      <div className="italic text-gray">{infos.statusMessage}</div>
    </div>
  );
}

export default Avatar;
