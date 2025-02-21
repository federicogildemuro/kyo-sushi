import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useNotification from '../../hooks/useNotification';
import { scrollToTop } from '../../utils/scrollUtils';

function AuthWidget() {
    const { user, logout } = useAuth();
    const { showNotification } = useNotification();

    const handleLogout = async () => {
        const result = await logout();

        if (result) {
            showNotification('Sesión cerrada exitosamente', 'success');
            scrollToTop();
        }
    };

    return (
        <Link
            to={user ? "/" : "/login"}
            title={user ? "Cerrar sesión" : "Iniciar sesión"}
            className="nav-link"
            onClick={user ? handleLogout : scrollToTop}
        >
            <i
                className={`nav-bar-icon bi ${user ? "bi-box-arrow-right" : "bi-box-arrow-in-right"}`}
                aria-hidden="true"
            />
        </Link>
    );
}

export default AuthWidget;