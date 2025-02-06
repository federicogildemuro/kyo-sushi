import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useCart from '../../../hooks/useCart';
import useAsync from '../../../hooks/useAsync';
import { scrollToTop } from '../../../utils/scrollUtils';
import Spinner from '../../../components/Spinner';
import CartItem from './CartItem';
import BackButton from '../../../components/BackButton';
import './Cart.css';

function Cart() {
    const { user } = useAuth();
    const { cart, removeCartItem, clearCart, getTotalPrice } = useCart();
    const { loading: loadingRemove, execute: removeItem } = useAsync(removeCartItem, [], false);
    const { loading: loadingClear, execute: clearCartItems } = useAsync(clearCart, [], false);
    const { data: totalPrice } = useAsync(getTotalPrice, [], true);

    const loading = loadingRemove || loadingClear;

    const handleClearCart = () => {
        clearCartItems();
    };

    const renderCartStatus = () => {
        const buttonText = user ? 'Ir a la tienda' : 'Iniciar sesión';
        const iconClass = user ? "bi bi-shop ms-2" : "bi bi-box-arrow-in-right ms-2";
        const cartMessage = cart.length > 0
            ? (
                <>
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4">
                        <h3 className="text-center text-md-start mb-3 mb-md-0">
                            Total: ${totalPrice ? totalPrice.toFixed(2) : '0.00'}
                        </h3>

                        <div className="d-flex flex-column flex-md-row justify-content-center justify-content-md-end">
                            <Link
                                to="/tienda"
                                className="btn custom-btn mb-2 mb-md-0 me-md-3"
                                onClick={scrollToTop}
                            >
                                Seguir comprando
                                <i className="bi bi-shop ms-2" />
                            </Link>

                            <button
                                className="btn custom-btn mb-2 mb-md-0 me-md-3"
                                onClick={handleClearCart}
                            >
                                Vaciar carrito
                                <i className="bi bi-cart-x ms-2" />
                            </button>

                            <Link
                                to="/checkout"
                                className="btn custom-btn"
                                onClick={scrollToTop}
                            >
                                Finalizar compra
                                <i className="bi bi-cart-check ms-2" />
                            </Link>
                        </div>
                    </div>
                </>
            )
            : (
                <>
                    <p className="fs-5">
                        <i className="bi bi-cart-x me-2" />
                        {user ? 'No tienes productos agregados a tu carrito' : 'Inicia sesión para agregar productos a tu carrito'}
                    </p>
                    <Link
                        to={user ? "/tienda" : "/login"}
                        className="btn custom-btn"
                        onClick={scrollToTop}>
                        {buttonText}
                        <i className={iconClass} />
                    </Link>
                </>
            );

        return cartMessage;
    };

    return (
        <section className="custom-container d-flex flex-column text-center">
            {loading && <Spinner />}

            <div className="container mb-3">
                <h1 className="display-6 fw-bold mb-3">Tu carrito</h1>

                <div className="table-responsive">
                    {cart.length > 0 ? (
                        <>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="text-start">Producto</th>
                                        <th className="text-center d-none d-sm-table-cell d-md-table-cell">Cantidad</th>
                                        <th className="text-end d-none d-sm-table-cell d-md-table-cell">Precio</th>
                                        <th className="text-end">Total</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {cart.map((item) => (
                                        <CartItem key={item.id} item={item} onRemoveFromCart={removeItem} />
                                    ))}
                                </tbody>
                            </table>

                            {renderCartStatus()}
                        </>
                    ) : (
                        renderCartStatus()
                    )}
                </div>

                <BackButton />
            </div>
        </section>
    );
}

export default Cart;