import { NavLink } from 'react-router-dom';
import { scrollToTop } from '../../utils/ScrollUtils';
import NavBarLogo from '../NavBarLogo/NavBarLogo';
import CartWidget from '../CartWidget/CartWidget';
import WishlistWidget from '../WishlistWidget/WishlistWidget';
import './NavBar.css';

function NavBar() {
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

    return (
        <nav className="navbar navbar-expand-lg navbar-custom">
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
                    </ul>

                    <div className="ms-auto d-flex justify-content-center align-items-center flex-lg-row flex-column">
                        <WishlistWidget />

                        <CartWidget />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;