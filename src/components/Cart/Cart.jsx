import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useNotification from '../../hooks/useNotification';
import { scrollToTop } from '../../utils/ScrollUtils';
import CartItem from '../CartItem/CartItem';
import './Cart.css';

function Cart() {
    const { cart, clearCart, getTotalPrice } = useCart();
    const { showNotification } = useNotification();

    const handleClearCart = () => {
        clearCart();
        showNotification('Carrito vaciado exitosamente', 'success');
    }

    return (
        <section className="custom-container d-flex flex-column text-center">
            <div className="container mb3">
                <h1 className="display-6 fw-bold mb-3">Tu carrito</h1>

                {cart.length > 0
                    ?
                    (<div className="table-responsive">
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
                                    <CartItem key={item.id} item={item} />
                                ))}
                            </tbody>
                        </table>

                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4">
                            <h3 className="text-center text-md-start mb-3 mb-md-0">
                                Total: ${getTotalPrice().toFixed(2)}
                            </h3>

                            <div className="d-flex flex-column flex-md-row justify-content-center justify-content-md-end">
                                <Link to="/tienda" className="btn custom-btn mb-2 mb-md-0 me-md-3" onClick={scrollToTop}>
                                    <i className="bi bi-arrow-left me-2" />
                                    Seguir comprando
                                </Link>

                                <button className="btn custom-btn mb-2 mb-md-0 me-md-3" onClick={handleClearCart}>
                                    <i className="bi bi-cart-x me-2" />
                                    Vaciar carrito
                                </button>

                                <Link to="/checkout" className="btn custom-btn" onClick={scrollToTop}>
                                    <i className="bi bi-cart-check me-2" />
                                    Finalizar compra
                                </Link>
                            </div>
                        </div>
                    </div>)
                    :
                    (<>
                        <p className="fs-5">
                            <i className="bi bi-cart-x me-2" />
                            No tienes productos agregados a tu carrito
                        </p>
                        <Link to="/tienda" className="btn custom-btn" onClick={scrollToTop}>Ir a la tienda</Link>
                    </>)
                }
            </div>
        </section>
    )
}

export default Cart;