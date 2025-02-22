import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useFavorites from '../../hooks/useFavorites';
import useNotification from '../../hooks/useNotification';
import { scrollToTop } from '../../utils/scrollUtils';

function Item({ item }) {
    // Get the current user from the useAuth hook
    const { user } = useAuth();
    // Get the toggleFavorite and isItemFavorite functions from the useFavorites hook
    const { toggleFavorite, isItemFavorite } = useFavorites();
    // State to handle the favorite status of the item
    const [isFavorite, setIsFavorite] = useState(false);

    // Effect to check if the item is a favorite
    useEffect(() => {
        const checkIfFavorite = async () => {
            if (user) {
                const favoriteStatus = await isItemFavorite(item.id);
                setIsFavorite(favoriteStatus);
            }
        };
        checkIfFavorite();
    }, [user, item.id, isItemFavorite]);

    // Handle the favorite toggle
    const { showNotification } = useNotification();
    const handleFavoriteToggle = async (event) => {
        event.preventDefault();
        if (!user) {
            showNotification('Debes iniciar sesión para añadir productos a tus favoritos', 'warning');
            return;
        }
        const updatedFavoriteStatus = await toggleFavorite(item);
        setIsFavorite(updatedFavoriteStatus);
    };

    // Handle the link click
    const favoriteIconRef = useRef(null);
    const handleLinkClick = (event) => {
        if (favoriteIconRef.current && favoriteIconRef.current.contains(event.target)) return;
        scrollToTop();
    };

    // Don't render if there is no item
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
                    onClick={handleFavoriteToggle}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                            handleFavoriteToggle(event);
                        }
                    }}
                    role="button"
                    tabIndex="0"
                    aria-pressed={isFavorite}
                    aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
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