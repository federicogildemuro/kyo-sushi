import { Link } from 'react-router-dom';

function Copyright() {
    return (
        <div className="d-flex flex-column text-center text-md-end gap-2">
            <h5>
                <i className="bi bi-c-circle me-2" />
                2025 Kyo Sushi
            </h5>

            <Link
                to="https://www.linkedin.com/in/federicogildemuro/"
                title="Ir a perfil de LinkedIn"
                className="footer-link"
                target="_blank"
            >
                <i className="bi bi-code-slash me-2" />
                Federico Gil de Muro
            </Link>

        </div>
    );
}

export default Copyright;