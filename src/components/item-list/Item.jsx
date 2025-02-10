import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useFavorites from '../../hooks/useFavorites';
import useNotification from '../../hooks/useNotification';
import { scrollToTop } from '../../utils/scrollUtils';
import './Item.css';

function Item({ item }) {
    const { user } = useAuth();
    const { toggleFavorite, isItemFavorite } = useFavorites();
    const { showNotification } = useNotification();

    const [isFavorite, setIsFavorite] = useState(false);

    const favoriteIconRef = useRef(null);

    useEffect(() => {
        const checkIfFavorite = async () => {
            if (user) {
                const favoriteStatus = await isItemFavorite(item.id);
                setIsFavorite(favoriteStatus);
            }
        };
        checkIfFavorite();
    }, [user, item.id, isItemFavorite]);

    const handleLinkClick = (event) => {
        if (favoriteIconRef.current && favoriteIconRef.current.contains(event.target)) return;
        scrollToTop();
    };

    const handleFavoriteToggle = async (event) => {
        event.preventDefault();

        if (!user) {
            showNotification('Debes iniciar sesión para añadir productos a tus favoritos', 'warning');
            return;
        }

        const updatedFavoriteStatus = await toggleFavorite(item);
        setIsFavorite(updatedFavoriteStatus);
    };

    if (!item) return null;

    return (
        <Link
            to={`/item/${item.id}`}
            className="item-container card h-100"
            onClick={handleLinkClick}
        >
            <div className="favorite-icon-container">
                <i
                    className={`favorite-icon fs-5 p-1 bi bi-heart${isFavorite ? '-fill' : ''}`}
                    ref={favoriteIconRef}
                    onClick={handleFavoriteToggle}
                />
            </div>

            <img
                src={item.pictureUrl}
                className="card-img-top"
                alt={`Imagen del producto ${item.title}`}
            />

            <div className="card-body d-flex flex-column justify-content-between align-items-center mb-3">
                <p className="card-text">{item.category}</p>

                <h5 className="card-title">{item.title}</h5>

                <p className="card-text">${item.price.toFixed(2)}</p>
            </div>
        </Link>
    );
}

export default Item;