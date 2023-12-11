import * as Icons from '../components/icons';
import MultiSelector from '../components/generics/MultiSelector';
import Tooltip from '../components/generics/Tooltip';

function Chaos() {
  const LANES = [
    { id: 'Top', value: false, element: <Icons.Lanes.Top color="red" /> },
    { id: 'Jungle', value: true, element: <Icons.Lanes.Jungle color="red" /> },
    { id: 'Mid', value: false, element: <Icons.Lanes.Mid color="red" /> },
    { id: 'Bottom', value: false, element: <Icons.Lanes.Bottom color="red" /> },
    { id: 'Support', value: true, element: <Icons.Lanes.Support color="red" /> },
  ];

  return (
    <div>
      <h1 className="text-xl font-semibold">Champions Chaos</h1>
      <p className="text-gray">
        ExileX takes the wheel, locking your champion, runes, and summoner spells for an unpredictable, madcap adventure in League of Legends.
      </p>

      <MultiSelector group={'LANES'} elements={LANES} />

      <button className="my-2 flex h-9 w-full cursor-not-allowed items-center justify-center rounded-3xl border-none bg-black py-1 text-white">
        <Tooltip text="⚠️ Auto Launch" size={15} bubbleColor="#9F9AA9" textColor="#FFFFFF" iconColor="#FFFFFF" />
        <span className="pl-2">Validate</span>
      </button>
    </div>
  );
}

export default Chaos;
