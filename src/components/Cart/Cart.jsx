import { Link } from 'react-router-dom'
import useCart from '../../hooks/useCart'
import useNotification from '../../hooks/useNotification'
import { scrollToTop } from '../../utils/ScrollUtils'
import CartItem from '../CartItem/CartItem'
import './Cart.css'

function Cart() {
    const { cart, clearCart, getTotalPrice } = useCart();
    const { showNotification } = useNotification();

    const handleClearCart = () => {
        clearCart();
        showNotification('Carrito vaciado', 'success');
    }

    return (
        <section className="custom-container d-flex flex-column text-center">
            <div className="container mb3">
                <h1 className="display-6 fw-bold mb-3">Tu carrito</h1>

                {cart.length === 0
                    ?
                    (<>
                        <p className="fs-5 fs-sm-6 fs-md-7 fs-lg-8 mb-3">No hay ítems en tu carrito.</p>
                        <Link to="/tienda" className="btn custom-btn" onClick={scrollToTop}>Ir a la tienda</Link>
                    </>
                    )
                    :
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
                                    Seguir comprando
                                </Link>

                                <button className="btn btn-danger mb-2 mb-md-0 me-md-3" onClick={handleClearCart}>
                                    Vaciar carrito
                                </button>

                                <Link to="/checkout" className="btn btn-success" onClick={scrollToTop}>
                                    Finalizar compra
                                </Link>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </section>
    )
}

export default Cart