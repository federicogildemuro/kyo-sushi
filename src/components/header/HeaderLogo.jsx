import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { scrollToTop } from '../../utils/scrollUtils';

function HeaderLogo() {
    return (
        <Link
            to="/"
            title="Inicio"
            onClick={scrollToTop}
        >
            <img
                src={logo}
                className="header-logo"
                alt="Logo de la empresa"
            />
        </Link>
    );
}

export default HeaderLogo;