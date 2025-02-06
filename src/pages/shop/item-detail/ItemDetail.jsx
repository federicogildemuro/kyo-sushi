import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useCart from '../../../hooks/useCart';
import useFavorites from '../../../hooks/useFavorites';
import useNotification from '../../../hooks/useNotification';
import { scrollToTop } from '../../../utils/scrollUtils';
import ItemCount from './ItemCount';
import './ItemDetail.css';

function ItemDetail({ item }) {
    const { user } = useAuth();
    const { checkItemInCart, cartItemQuantity, addCartItem } = useCart();
    const { toggleFavorite, checkFavorite } = useFavorites();
    const { showNotification } = useNotification();

    const [isFavorite, setIsFavorite] = useState(false);
    const [isInCart, setIsInCart] = useState(false);
    const [cartQuantity, setCartQuantity] = useState(0);

    useEffect(() => {
        const checkIfFavorite = async () => {
            const favoriteStatus = await checkFavorite(item.id);
            setIsFavorite(favoriteStatus);
        }

        checkIfFavorite();
    }, [item.id, checkFavorite]);

    useEffect(() => {
        const checkIfInCart = () => {
            const inCart = checkItemInCart(item.id);
            setIsInCart(inCart);
            setCartQuantity(inCart ? cartItemQuantity(item.id) : 0);
        }

        checkIfInCart();
    }, [item.id, checkItemInCart, cartItemQuantity]);

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
        setCartQuantity(quantity);
    };

    if (!item) return null;

    return (
        <div className="container mt-5 mb-5">
            <div className="card custom-card">
                <div className="row g-0 h-100">
                    <div className="col-md-4 position-relative">
                        <div className="favorite-icon-container">
                            <i
                                className={`favorite-icon fs-4 p-2 bi bi-heart${isFavorite ? '-fill' : ''}`}
                                onClick={handleFavoriteToggle}
                            />
                        </div>

                        <img
                            src={item.pictureUrl}
                            alt={item.title}
                            className="img-fluid rounded-start w-100 h-100 position-absolute"
                            style={{ top: 0, left: 0, bottom: 0, right: 0, objectFit: 'cover' }}
                        />
                    </div>

                    <div className="col-md-8">
                        <div className="card-body d-flex flex-column h-100">
                            <h1 className="card-title display-6 fw-bold">{item.title}</h1>

                            <p className="card-text">{item.description}</p>

                            <h3 className="card-text text-start">€{item.price.toFixed(2)}</h3>

                            <p className="card-text text-start">
                                {item.stock > 0
                                    ? (<small className="text-muted">{item.stock} unidades en stock</small>)
                                    : (<small className="text-danger">Producto no disponible</small>)
                                }
                                {(isInCart && cartQuantity > 0) && (
                                    <small className="text-success ms-2">
                                        {cartQuantity}
                                        {cartQuantity === 1 ? ' unidad' : ' unidades'} en el carrito
                                    </small>
                                )}
                            </p>

                            <div className="d-flex flex-column flex-lg-row align-items-center justify-content-lg-between mt-3 mb-3">
                                <ItemCount item={item} onAddToCart={handleAddToCart} />

                                <Link
                                    to="/cart"
                                    className="btn custom-btn mb-3 mb-lg-0 order-lg-3"
                                    onClick={scrollToTop}
                                >
                                    <i className="bi bi-cart me-2" />
                                    Ver carrito
                                </Link>

                                <button
                                    className="btn custom-btn mb-3 mb-lg-0 order-lg-1"
                                    onClick={() => window.history.back()}
                                >
                                    <i className="bi bi-arrow-left me-2" />
                                    Volver a la tienda
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemDetail;