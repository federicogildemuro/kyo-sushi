import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import useNotification from '../../hooks/useNotification';
import { scrollToTop } from '../../utils/ScrollUtils';

function AuthenticatedUserNavLinks({ isMenuOpen }) {
    const { user, isAdmin, logout } = useAuth();
    const { cartQuantity } = useCart();
    const { showNotification } = useNotification();

    const links = [
        { to: '/profile', icon: 'bi-person', title: 'Perfil' },
        { to: '/favorites', icon: 'bi-heart', title: 'Favoritos' },
    ];

    const handleLogout = () => {
        logout();
        showNotification("Sesión cerrada correctamente", "success");
        scrollToTop();
    };

    return (
        <ul className={`d-flex gap-5 m-0 ${isMenuOpen ? 'justify-content-center' : ''}`}>
            {(user && !isAdmin) && links.map((link, index) => (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        title={link.title}
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        onClick={scrollToTop}
                    >
                        <i className={`nav-bar-icon bi ${link.icon} ${window.location.pathname === link.to ? 'active-icon' : ''}`} />
                    </NavLink>
                </li>
            ))}

            {(user && !isAdmin) && (
                <li className="position-relative">
                    <NavLink
                        to="/cart"
                        title="Carrito"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        onClick={scrollToTop}
                    >
                        <i className={`nav-bar-icon bi bi-cart ${window.location.pathname === "/cart" ? 'active-icon' : ''}`} />

                        {cartQuantity > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {cartQuantity}
                            </span>
                        )}
                    </NavLink>
                </li>
            )}

            <li>
                <NavLink
                    to={user ? "/" : "/login"}
                    title={user ? "Cerrar sesión" : "Iniciar sesión"}
                    className="nav-link"
                    onClick={user ? handleLogout : scrollToTop}
                >
                    <i
                        className=
                        {`nav-bar-icon bi
                            ${user ? "bi-box-arrow-right" : "bi-box-arrow-in-right"}
                            ${window.location.pathname === (user ? "/" : "/login") ? "active-icon" : ""}
                        `}
                    />
                </NavLink>
            </li>
        </ul>
    );
}

export default AuthenticatedUserNavLinks;