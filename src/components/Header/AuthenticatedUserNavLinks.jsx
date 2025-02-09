import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import useNotification from '../../hooks/useNotification';
import { scrollToTop } from '../../utils/scrollUtils';

function AuthenticatedUserNavLinks({ isMenuOpen }) {
    const { user, isAdmin, logout } = useAuth();
    const { cartTotalQuantity } = useCart();
    const { showNotification } = useNotification();

    const handleLogout = async () => {
        const result = await logout();

        if (result) {
            showNotification('Sesión cerrada exitosamente', 'success');
            scrollToTop();
        }
    };

    return (
        <ul className={`d-flex gap-5 m-0 ${isMenuOpen ? 'justify-content-center' : ''}`}>
            {(user && !isAdmin) && (
                <>
                    <li>
                        <Link
                            to="/favorites"
                            title="Favoritos"
                            className="nav-link"
                            onClick={scrollToTop}
                        >
                            <i className={`nav-bar-icon bi bi-heart`} />
                        </Link>
                    </li>

                    <li className="position-relative">
                        <Link
                            to="/cart"
                            title="Carrito"
                            className="nav-link"
                            onClick={scrollToTop}
                        >
                            <i className="nav-bar-icon bi bi-cart" />

                            {cartTotalQuantity > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cartTotalQuantity}
                                </span>
                            )}
                        </Link>
                    </li>
                </>
            )}

            <li>
                <Link
                    to={user ? "/" : "/login"}
                    title={user ? "Cerrar sesión" : "Iniciar sesión"}
                    className="nav-link"
                    onClick={user ? handleLogout : scrollToTop}
                >
                    <i className={`nav-bar-icon bi ${user ? "bi-box-arrow-right" : "bi-box-arrow-in-right"}`} />
                </Link>
            </li>
        </ul>
    );
}

export default AuthenticatedUserNavLinks;