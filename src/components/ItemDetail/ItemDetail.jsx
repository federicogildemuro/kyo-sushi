import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import useWishlist from '../../hooks/useWishlist';
import useNotification from '../../hooks/useNotification';
import ItemCount from '../ItemCount/ItemCount';
import { scrollToTop } from '../../utils/ScrollUtils';
import './ItemDetail.css';

function ItemDetail({ item }) {
    const { user } = useAuth();
    const { isInCart, cartItemQuantity, addCartItem } = useCart();
    const { isInWishlist, addWishlistItem, removeWishlistItem } = useWishlist();
    const { showNotification } = useNotification();

    const onAddToCart = (quantity) => {
        if (!user) {
            showNotification('Debes iniciar sesión para añadir productos al carrito', 'warning');
            return;
        }
        addCartItem({ ...item, quantity });
    }

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
        <div className="container mt-5 mb-5">
            <div className="card custom-card">
                <div className="row g-0 h-100">
                    <div className="col-md-4 position-relative">
                        <div className="wishlist-icon-container">
                            <i
                                className={`wishlist-icon p-2 bi ${isInWishlist(item.id) ? 'bi-heart-fill' : 'bi-heart'}`}
                                onClick={handleWishlistToggle}
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
                                {isInCart(item.id) && (
                                    <small className="text-success ms-2">
                                        {cartItemQuantity(item.id)}
                                        {cartItemQuantity(item.id) === 1 ? ' unidad' : ' unidades'} en el carrito
                                    </small>

                                )
                                }
                            </p>

                            <div className="d-flex flex-column flex-lg-row align-items-center justify-content-lg-between mt-3 mb-3">
                                <ItemCount item={item} onAddToCart={onAddToCart} />

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