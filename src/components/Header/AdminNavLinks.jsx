import { NavLink } from 'react-router-dom';
import { scrollToTop } from '../../utils/ScrollUtils';

function AdminNavLinks({ isMenuOpen }) {
    const links = [
        { to: '/admin/products', label: 'Productos' },
        { to: '/admin/orders', label: 'Órdenes' },
        { to: '/admin/users', label: 'Usuarios' },
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
        </ul>
    );
}

export default AdminNavLinks;