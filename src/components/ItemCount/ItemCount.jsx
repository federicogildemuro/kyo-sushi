import { useState } from 'react'

function ItemCount({ stock }) {
    const [count, setCount] = useState(stock ? 1 : 0);

    const add = () => {
        if (count < stock) {
            setCount(count + 1);
        }
    }

    const substract = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    }

    const onAdd = () => {
        if (stock === 0) {
            alert('No hay stock disponible');
            return;
        }
        alert(`Agregaste ${count} productos al carrito`);
    }

    return (
        <>
            <button onClick={substract}>-</button>
            <input type="text" value={count} />
            <button onClick={add}>+</button>
            <button onClick={onAdd}>Agregar al carrito</button>
        </>
    )
}

export default ItemCount