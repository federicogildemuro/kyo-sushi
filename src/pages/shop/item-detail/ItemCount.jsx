import useCart from '../../../hooks/useCart';
import useCount from '../../../hooks/useCount';

function ItemCount({ item, addToCart }) {
    const { isItemInCart, cartItemQuantity } = useCart();
    const stock = item.stock;
    const initial = isItemInCart(item.id) ? cartItemQuantity(item.id) : 0;

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
                onClick={() => addToCart(count)}
                disabled={stock === 0}
            >
                Agregar
                <i className="bi bi-cart-plus ms-2" />
            </button>
        </div>
    );
}

export default ItemCount;