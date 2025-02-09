import { Link } from 'react-router-dom';
import { scrollToTop } from '../../utils/scrollUtils';

function LoginLinks() {
    return (
        <div className="d-flex align-items-center justify-content-center gap-5 mb-3">
            <Link
                to="/reset-password"
                className="auth-link"
                onClick={scrollToTop}
            >
                No recuerdas tu contraseña?
            </Link>

            <Link
                to="/register"
                className="auth-link"
                onClick={scrollToTop}
            >
                No tienes una cuenta?
            </Link>
        </div>
    );
}

export default LoginLinks;