import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import { scrollToTop } from '../../utils/scrollUtils';

function CartWidget() {
    const { user } = useAuth();
    const { cartTotalQuantity } = useCart();

    if (!user) return null;

    return (
        <div className="position-relative">
            <Link
                to="/cart"
                title="Carrito de compras"
                className="nav-link"
                onClick={scrollToTop}
            >
                <i className="nav-bar-icon bi bi-cart" />

                {cartTotalQuantity > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartTotalQuantity}
                    </span>
                )}
            </Link>
        </div>
    );
}

export default CartWidget;