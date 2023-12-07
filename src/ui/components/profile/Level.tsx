interface LevelProps {
  level: string;
}

function Level({ level }: LevelProps) {
  return (
    <div>
      <div className="mt-10 flex justify-center gap-4 text-6xl font-medium">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="50" y="25" width="5" height="21" rx="2" fill="#535255" />
          <rect x="34" y="14" width="5" height="32" rx="2" fill="#8C8B8F" />
          <rect x="19" y="30" width="5" height="16" rx="2" fill="#ACACB1" />
          <rect x="4" y="35" width="5" height="11" rx="2" fill="#CCCBD0" />
        </svg>
        {level}
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="35" width="5" height="10" rx="2" fill="#535255" />
          <rect x="20" y="30" width="5" height="15" rx="2" fill="#8C8B8F" />
          <rect x="35" y="14" width="5" height="31" rx="2" fill="#ACACB1" />
          <rect x="50" y="24" width="5" height="21" rx="2" fill="#CCCBD0" />
        </svg>
      </div>
      <div className="text-center font-bold">Player Level</div>
    </div>
  );
}

export default Level;
