import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import useFavorites from '../../hooks/useFavorites';
import useNotification from '../../hooks/useNotification';
import ItemDetailPicture from './ItemDetailPicture';
import ItemDetailInfo from './ItemDetailInfo';

function ItemDetailContent({ item }) {
    // Get the current user from the useAuth hook
    const { user } = useAuth();

    // Get the showNotification function from the useNotification hook
    const { showNotification } = useNotification();

    // Get the toggleFavorite and isItemFavorite functions from the useFavorites hook
    const { toggleFavorite, isItemFavorite } = useFavorites();
    // State to handle the favorite status of the item
    const [isFavorite, setIsFavorite] = useState(false);
    // Effect to check if the item is a favorite
    useEffect(() => {
        const checkIfFavorite = async () => {
            const favoriteStatus = await isItemFavorite(item.id);
            setIsFavorite(favoriteStatus);
        }

        checkIfFavorite();
    }, [item.id, isItemFavorite]);
    // Handle the favorite toggle
    const handleFavoriteToggle = async (event) => {
        event.preventDefault();
        if (!user) {
            showNotification('Debes iniciar sesión para añadir productos a tus favoritos', 'warning');
            return;
        }
        const updatedFavoriteStatus = await toggleFavorite(item);
        setIsFavorite(updatedFavoriteStatus);
    };

    // Get the isItemInCart, cartItemQuantity, and addCartItem functions from the useCart hook
    const { isItemInCart, cartItemQuantity, addCartItem } = useCart();
    // State to handle the cart status of the item
    const [isInCart, setIsInCart] = useState(false);
    // State to handle the total quantity of the item in the cart
    const [cartTotalQuantity, setcartTotalQuantity] = useState(0);
    // Effect to check if the item is in the cart
    useEffect(() => {
        const checkIfInCart = async () => {
            const inCart = await isItemInCart(item.id);
            setIsInCart(inCart);
            setcartTotalQuantity(inCart ? cartItemQuantity(item.id) : 0);
        }
        checkIfInCart();
    }, [item.id, isItemInCart, cartItemQuantity]);

    // Handle the add to cart action
    const handleAddToCart = (quantity) => {
        if (!user) {
            showNotification('Debes iniciar sesión para añadir productos al carrito', 'warning');
            return;
        }
        addCartItem({ ...item, quantity });
        setIsInCart(true);
        setcartTotalQuantity(quantity);
    };

    // Don't render if there is no item
    if (!item) return null;

    return (
        <div className="container my-5">
            <div className="card custom-border">
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