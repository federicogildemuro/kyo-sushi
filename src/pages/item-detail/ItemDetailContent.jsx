import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import useFavorites from '../../hooks/useFavorites';
import useNotification from '../../hooks/useNotification';
import ItemDetailPicture from './ItemDetailPicture';
import ItemDetailInfo from './ItemDetailInfo';

function ItemDetailContent({ item }) {
    const { user } = useAuth();
    const { isItemInCart, cartItemQuantity, addCartItem } = useCart();
    const { toggleFavorite, isItemFavorite } = useFavorites();
    const { showNotification } = useNotification();

    const [isFavorite, setIsFavorite] = useState(false);
    const [isInCart, setIsInCart] = useState(false);
    const [cartTotalQuantity, setcartTotalQuantity] = useState(0);

    useEffect(() => {
        const checkIfFavorite = async () => {
            const favoriteStatus = await isItemFavorite(item.id);
            setIsFavorite(favoriteStatus);
        }

        checkIfFavorite();
    }, [item.id, isItemFavorite]);

    useEffect(() => {
        const checkIfInCart = async () => {
            const inCart = await isItemInCart(item.id);
            setIsInCart(inCart);
            setcartTotalQuantity(inCart ? cartItemQuantity(item.id) : 0);
        }

        checkIfInCart();
    }, [item.id, isItemInCart, cartItemQuantity]);

    const handleFavoriteToggle = async (event) => {
        event.preventDefault();

        if (!user) {
            showNotification('Debes iniciar sesión para añadir productos a tus favoritos', 'warning');
            return;
        }

        const updatedFavoriteStatus = await toggleFavorite(item);
        setIsFavorite(updatedFavoriteStatus);
    };

    const handleAddToCart = (quantity) => {
        if (!user) {
            showNotification('Debes iniciar sesión para añadir productos al carrito', 'warning');
            return;
        }

        addCartItem({ ...item, quantity });
        setIsInCart(true);
        setcartTotalQuantity(quantity);
    };

    if (!item) return null;

    return (
        <div className="container my-5">
            <div className="card custom-card">
                <div className="row g-0 h-100">
                    <ItemDetailPicture
                        item={item}
                        isFavorite={isFavorite}
                        toggleFavorite={handleFavoriteToggle}
                    />

                    <ItemDetailInfo
                        item={item}
                        isInCart={isInCart}
                        cartTotalQuantity={cartTotalQuantity}
                        addToCart={handleAddToCart}
                    />
                </div>
            </div>
        </div>
    );
}

export default ItemDetailContent;