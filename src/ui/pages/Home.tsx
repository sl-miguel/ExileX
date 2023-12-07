import useFetch from '../hooks/useFetch';
import { Me } from '../../electron/typings/MeTypings';
import Avatar from '../components/profile/Avatar';
import Level from '../components/profile/Level';
// import Champions from '../components/account/Champions';

function Home() {
  const me = useFetch<Me>('/lol-chat/v1/me');

  return (
    <div>
      {me && <Avatar infos={me} />}
      {me && <Level level={me.lol.level} />}
      {/* <Champions /> */}
    </div>
  );
}

export default Home;
