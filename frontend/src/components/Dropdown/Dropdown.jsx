import { NavLink } from 'react-router-dom';

export default function Dropdown({ group, isOpen, onOpen, onClose, user }) {
  function handleBlur(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) onClose();
  }

  return <div
    className={`nav-dropdown ${isOpen ? 'is-open' : ''}`}
    onMouseEnter={onOpen}
    onMouseLeave={onClose}
    onFocus={onOpen}
    onBlur={handleBlur}
  >
    <button className="nav-dropdown-button" type="button" aria-haspopup="true" aria-expanded={isOpen}>{group.label}</button>
    <div className="nav-dropdown-menu">
      {group.items.filter(item => !item.protected || user).map(item => <NavLink key={`${group.label}-${item.label}`} to={item.to} onClick={onClose}>{item.label}</NavLink>)}
    </div>
  </div>;
}
