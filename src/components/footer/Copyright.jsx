import { Link } from 'react-router-dom';

function Copyright() {
    return (
        <div className="d-flex flex-column text-center text-md-end gap-3">
            <h5>Kyo Sushi</h5>

            <Link
                to="https://www.linkedin.com/in/federicogildemuro/"
                title="Perfil de LinkedIn del desarrollador"
                className="footer-link"
                target="_blank"
            >
                <i
                    className="bi bi-code-slash me-2"
                    aria-hidden="true"
                />
                Federico Gil de Muro
            </Link>

            <p>Proyecto final del curso React JS de Coderhouse</p>
        </div>
    );
}

export default Copyright;