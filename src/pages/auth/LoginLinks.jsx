import { Link } from 'react-router-dom';
import { scrollToTop } from '../../utils/scrollUtils';

function LoginLinks() {
    return (
        <div className="d-flex align-items-center justify-content-center gap-5">
            <Link
                to="/reset-password"
                className="auth-link"
                onClick={scrollToTop}
            >
                <i className="bi bi-key me-2" />
                No recuerdas tu contraseña?
            </Link>

            <Link
                to="/register"
                className="auth-link"
                onClick={scrollToTop}
            >
                <i className="bi bi-person-plus me-2" />
                No tienes una cuenta?
            </Link>
        </div>
    );
}

export default LoginLinks;