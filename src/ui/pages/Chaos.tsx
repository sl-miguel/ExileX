import useIcon from "../hooks/useIcon";

function Chaos() {
  const bufferVersion = useIcon('/lol-game-data/assets/v1/champion-icons/119.png')

  return (
    <div>
      <h1>Chaos</h1>
      {bufferVersion && ( <img className="w-12 h-12" src={`data:image/png;base64,${Buffer.from(bufferVersion).toString('base64')}`} alt="Champion Icon" /> )}
    </div>
  );
}

export default Chaos;
