import { Link } from 'react-router-dom';
import { scrollToTop } from '../../utils/ScrollUtils';
import './WishlistWidget.css';

function WishlistWidget() {
    return (
        <Link
            to="/wishlist"
            className="nav-link"
            onClick={scrollToTop}
        >
            <i className="wishlist-widget-icon me-lg-3 bi bi-heart" />
        </Link>
    );
}

export default WishlistWidget;