import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAsync from '../../hooks/useAsync';
import useNotification from '../../hooks/useNotification';
import { scrollToTop } from '../../utils/ScrollUtils';
import NavBarLogo from '../NavBarLogo/NavBarLogo';
import CartWidget from '../CartWidget/CartWidget';
import FavoritesWidget from '../FavoritesWidget/FavoritesWidget';
import Spinner from '../Spinner/Spinner';
import './NavBar.css';

function NavBar() {
    const { user, logout } = useAuth();
    const { data, loading, error, execute } = useAsync(logout, [], false);
    const { showNotification } = useNotification();
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            showNotification('Sesión cerrada correctamente', 'success');
            navigate('/');
        }
    }, [data, showNotification, navigate]);

    useEffect(() => {
        if (error) {
            showNotification('Ha ocurrido un error cerrando la sesión', 'danger');
        }
    }, [error, showNotification]);

    const categories = [
        'Rolls',
        'Hot Rolls',
        'Sin alga y sin arroz',
        'Veggies',
        'Makis',
        'Sashimis',
        'Entrantes',
        'Nigiris',
        'Salsas',
        'Combinados'
    ];

    const handleLogout = async () => {
        await execute();
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-custom">
            {loading && <Spinner />}

            <div className="container-fluid">
                <NavBarLogo />

                <button
                    className="navbar-toggler ms-auto"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                                onClick={scrollToTop}
                            >
                                Inicio
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/about-us"
                                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                                onClick={scrollToTop}
                            >
                                Sobre nosotros
                            </NavLink>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Menú</a>

                            <ul className="dropdown-menu">
                                {categories.map((category) => (
                                    <li key={category}>
                                        <NavLink
                                            to={`/tienda/${category}`}
                                            className={({ isActive }) => (isActive ? 'dropdown-item active' : 'dropdown-item')}
                                            onClick={scrollToTop}
                                        >
                                            {category}
                                        </NavLink>
                                    </li>
                                ))}

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li key="all">
                                    <NavLink
                                        to={`/tienda`}
                                        className={({ isActive }) => (isActive ? 'dropdown-item active' : 'dropdown-item')}
                                        onClick={scrollToTop}
                                    >
                                        Todos
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/contact"
                                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                                onClick={scrollToTop}
                            >
                                Contacto
                            </NavLink>
                        </li>

                        {user && (
                            <li>
                                <NavLink
                                    to="/profile"
                                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                                    onClick={scrollToTop}
                                >
                                    Perfil
                                </NavLink>
                            </li>
                        )}

                        <li>
                            {user ? (
                                <button
                                    className="nav-link btn btn-link"
                                    onClick={handleLogout}
                                >
                                    Cerrar sesión
                                </button>
                            ) : (
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                                    onClick={scrollToTop}
                                >
                                    Iniciar sesión
                                </NavLink>
                            )}
                        </li>
                    </ul>

                    <div className="ms-auto d-flex justify-content-center align-items-center flex-lg-row flex-column">
                        <FavoritesWidget />

                        <CartWidget />
                    </div>
                </div>
            </div>
        </nav >
    );
}

export default NavBar;