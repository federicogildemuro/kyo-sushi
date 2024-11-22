import useCount from '../../hooks/useCount';

function ItemCount({ stock, onAddToCart }) {
    const { count, increment, decrement, reset } = useCount(stock ? 1 : 0, 1, stock);

    const handleAdd = () => {
        if (count > stock) {
            alert('No puedes agregar más productos que el stock disponible.');
            return;
        }

        if (stock === 0) {
            alert('No hay stock disponible.');
            return;
        }

        onAddToCart(count);
    };

    return (
        <div className="d-flex align-items-center mt-3">
            <button
                className="btn btn-outline-secondary me-2"
                onClick={decrement}
                disabled={count <= 1}
            >
                -
            </button>
            <input
                type="text"
                className="form-control text-center"
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
                className="btn btn-primary ms-2"
                onClick={handleAdd}
                disabled={stock === 0}
            >
                Agregar
            </button>
            <button
                className="btn btn-danger ms-2"
                onClick={reset}
            >
                Limpiar
            </button>
        </div>
    );
}

export default ItemCount;