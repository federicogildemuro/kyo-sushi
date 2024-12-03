import { NavLink } from 'react-router-dom'
import NavBarLogo from '../NavBarLogo/NavBarLogo'
import CartWidget from '../CartWidget/CartWidget'
import './NavBar.css'

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
                            <NavLink className="nav-link" to="/">Inicio</NavLink>
                        </li>

                        <li>
                            <NavLink className="nav-link" to="/about-us">Sobre nosotros</NavLink>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Tienda</a>

                            <ul className="dropdown-menu">
                                {categories.map((category) => (
                                    <li key={category}>
                                        <NavLink className="dropdown-item" to={`/tienda/${category}`}>{category}</NavLink>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contacto</NavLink>
                        </li>
                    </ul>

                    <div className="ms-auto d-flex align-items-center">
                        <CartWidget />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar