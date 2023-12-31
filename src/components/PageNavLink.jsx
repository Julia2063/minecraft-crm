import cn from 'classnames';
import { NavLink } from 'react-router-dom';

export const PageNavLink = ({ to, text, ...props }) => (
  <NavLink
    to={to}
    className={({ isActive }) => cn(
      'text-[#000] no-underline', { 'font-bold border-b border-b-black': isActive },
    )}
   
    {...props}
  >
    {text}
    
  </NavLink>
);