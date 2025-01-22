import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useWishlist from '../../hooks/useWishlist';
import useNotification from '../../hooks/useNotification';
import './Item.css';

function Item({ item }) {
    const { user } = useAuth();
    const { isInWishlist, addWishlistItem, removeWishlistItem } = useWishlist();
    const { showNotification } = useNotification();

    const handleWishlistToggle = (event) => {
        event.preventDefault();

        if (!user) {
            showNotification('Debes iniciar sesión para añadir productos a tus favoritos', 'warning');
            return;
        }

        if (isInWishlist(item.id)) {
            removeWishlistItem(item.id);
        } else {
            addWishlistItem(item);
        }
    };

    if (!item) return null;

    return (
        <Link to={`/item/${item.id}`} className="item-container card h-100">
            <div className="wishlist-icon-container">
                <i
                    className={`wishlist-icon p-2 bi ${isInWishlist(item.id) ? 'bi-heart-fill' : 'bi-heart'}`}
                    onClick={handleWishlistToggle}
                />
            </div>

            <img
                src={item.pictureUrl}
                className="card-img-top"
                alt={item.title}
            />

            <div className="card-body d-flex flex-column justify-content-between align-items-center mb-3">
                <p className="card-text">{item.category}</p>

                <h5 className="card-title">{item.title}</h5>

                <p className="card-text">€{item.price.toFixed(2)}</p>
            </div>
        </Link>
    );
}

export default Item;