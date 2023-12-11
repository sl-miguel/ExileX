import * as Icons from '../icons';
import { useRef, MouseEvent } from 'react';

interface Props {
  textColor: string;
  iconColor: string;
  bubbleColor: string;
  size: number;
  text: string;
}

function Tooltip({ text, textColor, iconColor, bubbleColor, size }: Props) {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const container = useRef<HTMLDivElement>(null);

  const handleMouseEnter = ({ clientX }: MouseEvent<HTMLDivElement>) => {
    if (!tooltipRef.current || !container.current) return;
    const { left } = container.current.getBoundingClientRect();
    tooltipRef.current.style.left = clientX - left + 'px';
  };

  return (
    <div ref={container} onMouseEnter={handleMouseEnter} className="group relative inline-block">
      <Icons.Bubble size={size} color={iconColor} />
      <span
        ref={tooltipRef}
        style={{ color: textColor, background: bubbleColor }}
        className="invisible absolute top-full z-10 mt-2 whitespace-nowrap rounded p-1 px-2 opacity-0 transition group-hover:visible group-hover:opacity-100"
      >
        {text}
      </span>
    </div>
  );
}

export default Tooltip;
