import { Link } from 'react-router-dom';
import { scrollToTop } from '../../utils/ScrollUtils';
import './FavoritesWidget.css';

function FavoritesWidget() {
    return (
        <Link
            to="/favorites"
            className="nav-link"
            onClick={scrollToTop}
        >
            <i className="favorites-widget-icon fs-2 me-lg-3 bi bi-heart" />
        </Link>
    );
}

export default FavoritesWidget;