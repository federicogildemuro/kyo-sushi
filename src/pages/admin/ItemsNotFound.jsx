import { Link } from 'react-router-dom';
import { scrollToTop } from '../../utils/scrollUtils';

function ItemsNotFound() {
    return (
        <div className="text-center m-5">
            <p className="fs-5 mb-5">
                <i className="bi bi-exclamation-triangle me-2" />
                No hay elementos para mostrar
            </p>

            <Link
                to="/admin"
                className="btn custom-btn"
                onClick={scrollToTop}
            >
                Ir al panel de administración
                <i className="bi bi-sliders ms-2" />
            </Link>
        </div>
    );
}

export default ItemsNotFound;