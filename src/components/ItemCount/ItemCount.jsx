import useCount from "../../hooks/useCount"

function ItemCount({ stock }) {
    const { count, increment, decrement } = useCount(stock ? 1 : 0, 1, stock);

    const onAdd = () => {
        if (stock === 0) {
            alert('No hay stock disponible');
            return;
        }
        alert(`Agregaste ${count} productos al carrito`);
    }

    return (
        <div className="d-flex align-items-center mt-3">
            <button className="btn btn-outline-secondary me-2" onClick={decrement} disabled={count <= 1}>-</button>
            <input
                type="text"
                className="form-control text-center"
                value={count}
                readOnly
            />
            <button className="btn btn-outline-secondary ms-2" onClick={increment} disabled={count >= stock}>+</button>
            <button className="btn btn-primary ms-2" onClick={onAdd}>Agregar</button>
        </div>
    )
}

export default ItemCount