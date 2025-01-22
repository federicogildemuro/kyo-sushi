import useCart from '../../hooks/useCart';
import useCount from '../../hooks/useCount';
import './ItemCount.css';

function ItemCount({ item, onAddToCart }) {
    const { checkItemInCart, cartItemQuantity } = useCart();
    const stock = item.stock;
    const initial = checkItemInCart(item.id) ? cartItemQuantity(item.id) : 0;

    const { count, increment, decrement } = useCount(initial, 1, stock);

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
                onClick={() => onAddToCart(count)}
                disabled={stock === 0}
            >
                <i className="bi bi-cart-plus me-2" />
                Agregar
            </button>
        </div>
    );
}

export default ItemCount;