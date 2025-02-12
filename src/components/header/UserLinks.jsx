import { NavLink } from 'react-router-dom';
import { userLinks as links } from './links';
import CategoriesDropdownMenu from './CategoriesDropdownMenu';
import AuthenticatedUserLinks from './AuthenticatedUserLinks';

function UserLinks({ isMenuOpen }) {
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

            <CategoriesDropdownMenu />

            <AuthenticatedUserLinks />
        </ul>
    );
}

export default UserLinks;