import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { scrollToTop } from '../../utils/ScrollUtils';
import './CartWidget.css';

function CartWidget() {
    const { cartQuantity } = useCart();

    return (
        <Link
            to="/cart"
            className="nav-link position-relative"
            onClick={scrollToTop}
        >
            <i className="cart-widget-icon fs-2 bi bi-cart" />

            {cartQuantity > 0 && (
                <span
                    className="cart-widget-quantity position-absolute top-0 end-0 translate-middle text-white bg-danger d-flex align-items-center justify-content-center rounded-circle fw-bold"
                >
                    {cartQuantity < 10 ? cartQuantity : '+10'}
                </span>
            )}
        </Link>
    );
}

export default CartWidget;