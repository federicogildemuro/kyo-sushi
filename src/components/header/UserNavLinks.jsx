import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { userLinks as links } from './links';
import CategoriesDropdownMenu from './CategoriesDropdownMenu';
import AuthenticatedUserNavLinks from './AuthenticatedUserNavLinks';

function UserNavLinks({ isMenuOpen }) {
    const { user } = useAuth();

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

            {user && <AuthenticatedUserNavLinks />}
        </ul>
    );
}

export default UserNavLinks;