import { NavLink } from 'react-router-dom';
import { scrollToTop } from '../../utils/ScrollUtils';
import CategoriesDropdownMenu from './CategoriesDropdownMenu';

function UserNavLinks({ isMenuOpen }) {
    const links = [
        { to: '/', label: 'Inicio' },
        { to: '/about-us', label: 'Sobre nosotros' },
        { to: '/contact', label: 'Contacto' },
    ];

    return (
        <ul className={`d-flex align-items-center m-0 ${isMenuOpen ? 'flex-column gap-3' : 'gap-5'}`}>
            {links.map((link, index) => (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                        onClick={scrollToTop}
                    >
                        {link.label}
                    </NavLink>
                </li>
            ))}

            <CategoriesDropdownMenu />
        </ul>
    );
}

export default UserNavLinks;