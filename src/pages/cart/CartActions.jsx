import { useState } from 'react';
import { Link } from 'react-router-dom';
import useNotification from '../../hooks/useNotification';
import { scrollToTop } from '../../utils/scrollUtils';

function CartActions({ clearCart }) {
    // State to handle the confirmation dialog
    const [isConfirming, setIsConfirming] = useState(false);

    // Handle cart clearing confirmation
    const { showNotification } = useNotification();
    const handleDelete = () => {
        setIsConfirming(true);
        showNotification('¿Estás seguro que deseas vaciar el carrito?', 'confirm', true, handleConfirm, handleCancel);
    };
    const handleConfirm = () => {
        setIsConfirming(false);
        clearCart();
    };
    const handleCancel = () => {
        setIsConfirming(false);
    };

    return (
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-md-end gap-3">
            <Link
                to="/tienda"
                className="btn custom-btn"
                onClick={scrollToTop}
            >
                Seguir comprando
                <i
                    className="bi bi-shop ms-2"
                    aria-hidden="true"
                />
            </Link>

            <button
                className="btn btn-danger"
                onClick={handleDelete}
                disabled={isConfirming}
            >
                Vaciar carrito
                <i
                    className="bi bi-cart-x ms-2"
                    aria-hidden="true"
                />
            </button>

            <Link to="/checkout"
                className="btn btn-success"
                onClick={scrollToTop}
            >
                Finalizar compra
                <i
                    className="bi bi-cart-check ms-2"
                    aria-hidden="true"
                />
            </Link>
        </div>
    );
}

export default CartActions;