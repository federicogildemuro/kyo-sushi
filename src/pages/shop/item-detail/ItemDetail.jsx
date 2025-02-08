import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useCart from '../../../hooks/useCart';
import useFavorites from '../../../hooks/useFavorites';
import useNotification from '../../../hooks/useNotification';
import { scrollToTop } from '../../../utils/scrollUtils';
import ItemCount from './ItemCount';

function ItemDetail({ item }) {
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
                    <div className="col-lg-4 d-flex align-items-stretch">
                        <div className="position-relative w-100">
                            <div className="favorite-icon-container">
                                <i
                                    className={`favorite-icon fs-4 p-2 bi bi-heart${isFavorite ? '-fill' : ''}`}
                                    onClick={handleFavoriteToggle}
                                />
                            </div>

                            <img
                                src={item.pictureUrl}
                                alt={item.title}
                                className="img-fluid w-100 d-none d-lg-block rounded-start"
                                style={{ height: "100%", objectFit: "cover" }}
                            />

                            <img
                                src={item.pictureUrl}
                                alt={item.title}
                                className="img-fluid w-100 d-block d-lg-none rounded-top"
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                    </div>

                    <div className="col-lg-8">
                        <div className="card-body d-flex flex-column h-100">
                            <h1 className="card-title display-6 fw-bold">{item.title}</h1>

                            <p className="card-text">{item.description}</p>

                            <h3 className="card-text text-start">€{item.price.toFixed(2)}</h3>

                            <p className="card-text text-start">
                                {item.stock > 0
                                    ? (<small className="text-muted">{item.stock} unidades en stock</small>)
                                    : (<small className="text-danger">Producto no disponible</small>)
                                }

                                {(isInCart && cartTotalQuantity > 0) && (
                                    <small className="text-success ms-2">
                                        {cartTotalQuantity}
                                        {cartTotalQuantity === 1 ? ' unidad' : ' unidades'} en el carrito
                                    </small>
                                )}
                            </p>

                            <div className="d-flex flex-column flex-lg-row align-items-center justify-content-lg-between mt-3 mb-3">
                                <ItemCount
                                    item={item}
                                    onAddToCart={handleAddToCart}
                                />

                                <Link
                                    to="/cart"
                                    className="btn custom-btn mb-3 mb-lg-0 order-lg-3"
                                    onClick={scrollToTop}
                                >
                                    Ver carrito
                                    <i className="bi bi-cart ms-2" />
                                </Link>

                                <Link
                                    to="/tienda"
                                    className="btn custom-btn mb-3 mb-lg-0 order-lg-1"
                                    onClick={scrollToTop}
                                >
                                    Ir a la tienda
                                    <i className="bi bi-shop ms-2" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemDetail;