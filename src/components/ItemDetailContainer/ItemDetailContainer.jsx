import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getProduct } from '../../services/ProductsServices'
import ItemDetail from '../ItemDetail/ItemDetail'

function ItemDetailContainer() {
    const { id } = useParams();
    const [item, setItem] = useState({});

    const fetchItem = async (id) => {
        try {
            const data = await getProduct(id);
            setItem(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchItem(id);
    }, [id]);

    return (
        <ItemDetail item={item} />
    )
}

export default ItemDetailContainer