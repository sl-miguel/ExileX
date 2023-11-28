import { ReactElement, cloneElement } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

interface SidebarLinkProps extends NavLinkProps {
  text: string;
  element: ReactElement;
  activeColor: string;
}

function SidebarLink({ to, text, element, activeColor, ...rest }: SidebarLinkProps) {
  return (
    <NavLink to={to} {...rest}>
      {({ isActive }) => (
        <div className="relative flex flex-col items-center gap-2">
          {isActive && <div className="absolute bottom-0 left-0 top-0 w-1 rounded-e-md bg-black"></div>}
          {isActive ? cloneElement(element, { key: 'icon', color: activeColor }) : element}
          <span className={`text-xs ${isActive ? 'text-black' : 'text-gray'}`}>{text}</span>
        </div>
      )}
    </NavLink>
  );
}

export default SidebarLink;
