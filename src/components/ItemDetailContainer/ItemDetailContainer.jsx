import { useEffect, useState } from 'react'
import { getProduct } from '../../services/ProductsServices'
import ItemDetail from '../ItemDetail/ItemDetail'

function ItemDetailContainer() {
    const [item, setItem] = useState(null);

    useEffect(() => {
        const fetchItem = async (id) => {
            try {
                const data = await getProduct(id);
                setItem(data);
            } catch (error) {
                console.error(error);
            }
        };

        const id = 1;
        fetchItem(id);
    }, []);

    return (
        <ItemDetail item={item} />
    )
}

export default ItemDetailContainer