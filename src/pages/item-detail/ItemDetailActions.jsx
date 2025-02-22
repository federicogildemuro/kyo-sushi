import { Link } from 'react-router-dom';
import { scrollToTop } from '../../utils/scrollUtils';
import ItemCount from './ItemCount';

function ItemDetailActions({ item, addToCart }) {
    return (
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-md-between mt-3 mb-3">
            <ItemCount
                item={item}
                addToCart={addToCart}
            />

            <Link
                to="/tienda"
                className="btn custom-btn mb-3 mb-lg-0"
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