import { Link } from 'react-router-dom';
import { scrollToTop } from '../../../utils/scrollUtils';

function CartActions({ totalAmount, clearCart }) {
    return (
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4">
            <h3 className="text-center text-md-start mb-3 mb-md-0">
                Total: ${totalAmount.toFixed(2)}
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
                    onClick={clearCart}
                >
                    Vaciar carrito
                    <i className="bi bi-cart-x ms-2" />
                </button>

                <Link to="/checkout"
                    className="btn custom-btn"
                    onClick={scrollToTop}
                >
                    Finalizar compra
                    <i className="bi bi-cart-check ms-2" />
                </Link>
            </div>
        </div>
    );
}

export default CartActions;