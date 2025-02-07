import { Link } from 'react-router-dom';
import { scrollToTop } from '../../../utils/scrollUtils';

function EmptyCart() {
    return (
        <div className="text-center">
            <p className="fs-5 mb-5">
                <i className="bi bi-cart-x me-2" />
                No tienes productos en tu carrito
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
};

export default EmptyCart;