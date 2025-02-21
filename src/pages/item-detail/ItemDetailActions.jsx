import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { scrollToTop } from '../../utils/scrollUtils';
import ItemCount from './ItemCount';

function ItemDetailActions({ item, addToCart }) {
    const { user } = useAuth();

    return (
        <div className="d-flex flex-column flex-lg-row align-items-center justify-content-lg-between mt-3 mb-3">
            <ItemCount
                item={item}
                addToCart={addToCart}
            />

            <Link
                to="/cart"
                className="btn custom-btn mb-3 mb-lg-0 order-lg-3"
                onClick={scrollToTop}
                disabled={!user}
            >
                Ver carrito
                <i
                    className="bi bi-cart ms-2"
                    aria-hidden="true"
                />
            </Link>

            <Link
                to="/tienda"
                className="btn custom-btn mb-3 mb-lg-0 order-lg-1"
                onClick={scrollToTop}
            >
                Seguir comprando
                <i
                    className="bi bi-shop ms-2"
                    aria-hidden="true"
                />
            </Link>
        </div>
    );
}

export default ItemDetailActions;