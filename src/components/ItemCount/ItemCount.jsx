import { useState } from 'react';

function ItemCount() {
    const stock = 5;
    const initial = stock ? 1 : 0;
    const [count, setCount] = useState(initial);

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
            console.log('No hay stock');
            return;
        }
        console.log(`Agregaste ${count} productos al carrito`);
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