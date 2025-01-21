import useCart from '../../hooks/useCart';
import useCount from '../../hooks/useCount';
import useNotification from '../../hooks/useNotification';
import './ItemCount.css';

function ItemCount({ item, onAddToCart }) {
    const { isInCart, cartItemQuantity } = useCart();
    const stock = item.stock;
    const initial = isInCart(item.id) ? cartItemQuantity(item.id) : 0;

    const { count, increment, decrement } = useCount(initial, 1, stock);

    const { showNotification } = useNotification();

    const handleAdd = () => {
        onAddToCart(count);
        showNotification(
            `Se agregó${count === 1 ? '' : 'ron'} ${count} unidad${count === 1 ? '' : 'es'} al carrito.`,
            'success'
        );
    };

    return (
        <div className="d-flex align-items-center mb-3 mb-lg-0 order-lg-2">
            <button
                className="btn btn-outline-secondary me-2"
                onClick={decrement}
                disabled={count <= 1}
            >
                -
            </button>

            <input
                type="text"
                className="form-control text-center input-small"
                value={count}
                readOnly
            />

            <button
                className="btn btn-outline-secondary ms-2"
                onClick={increment}
                disabled={count >= stock}
            >
                +
            </button>

            <button
                className="btn custom-btn ms-2"
                onClick={handleAdd}
                disabled={stock === 0}
            >
                <i className="bi bi-cart-plus me-2" />
                Agregar
            </button>
        </div>
    );
}

export default ItemCount;