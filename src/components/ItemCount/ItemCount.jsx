import useCount from '../../hooks/useCount'
import useNotification from '../../hooks/useNotification'
import './ItemCount.css'

function ItemCount({ stock, onAddToCart }) {
    const { count, increment, decrement } = useCount(stock ? 1 : 0, 1, stock);
    const { showNotification } = useNotification();

    const handleAdd = () => {
        onAddToCart(count);
        count === 1
            ? showNotification('Se agregó 1 unidad al carrito.', 'success')
            : showNotification(`Se agregaron ${count} unidades al carrito.`, 'success');
    }

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
                Agregar
            </button>
        </div>
    );
}

export default ItemCount