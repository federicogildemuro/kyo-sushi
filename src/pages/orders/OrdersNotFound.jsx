import { Link } from 'react-router-dom';
import { scrollToTop } from '../../utils/scrollUtils';

function OrdersNotFound() {
    return (
        <div className="text-center m-5">
            <p className="fs-5 mb-5">
                <i
                    className="bi bi-box me-2"
                    aria-hidden="true"
                />
                No tienes pedidos realizados
            </p>

            <Link
                to="/tienda"
                className="btn custom-btn"
                onClick={scrollToTop}
            >
                Ir a la tienda
                <i
                    className="bi bi-shop ms-2"
                    aria-hidden="true"
                />
            </Link>
        </div>
    );
}

export default OrdersNotFound;