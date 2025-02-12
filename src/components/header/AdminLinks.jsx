import { NavLink } from 'react-router-dom';
import { adminLinks as links } from './links';

function AdminLinks({ isMenuOpen }) {
    return (
        <ul className={`d-flex align-items-center m-0 ${isMenuOpen ? 'flex-column gap-3' : 'gap-5'}`}>
            {links.map((link) => (
                <li key={link.label}>
                    <NavLink
                        to={link.to}
                        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                    >
                        {link.label}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
}

export default AdminLinks;