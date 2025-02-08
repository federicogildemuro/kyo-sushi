import { Link } from 'react-router-dom';
import { scrollToTop } from '../../../utils/scrollUtils';

function ProductsNotFound() {
    return (
        <div className="text-center m-5">
            <p className="fs-5 mb-5">
                <i className="bi bi-exclamation-triangle me-2" />
                No se encontraron productos
            </p>

            <Link
                to="/tienda"
                className="btn custom-btn"
                onClick={scrollToTop}
            >
                Ir a la tienda
                <i className="bi bi-shop ms-2" />
            </Link>
        </div>
    );
}

export default ProductsNotFound;