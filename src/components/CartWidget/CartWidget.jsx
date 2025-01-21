import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { scrollToTop } from '../../utils/ScrollUtils';
import './CartWidget.css';

function CartWidget() {
    const { cartQuantity } = useCart();

    return (
        <Link
            to="/cart"
            className="nav-link"
            onClick={scrollToTop}
        >
            <i className="cart-widget-icon bi bi-cart" />

            {cartQuantity > 0 && cartQuantity < 10 && <span className="cart-widget-quantity">{cartQuantity}</span>}

            {cartQuantity > 10 && <span className="cart-widget-quantity">+10</span>}
        </Link>
    );
}

export default CartWidget;