import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import logoHover from '../../assets/logo-hover.png';
import { scrollToTop } from '../../utils/ScrollUtils';

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
                alt="logo kyo-sushi"
                onMouseEnter={(event) => event.currentTarget.src = logoHover}
                onMouseLeave={(event) => event.currentTarget.src = logo}
            />
        </Link>
    );
}

export default HeaderLogo;