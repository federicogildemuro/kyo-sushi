import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getProduct } from '../../services/ProductsServices'
import Spinner from '../Spinner/Spinner'
import ItemDetail from '../ItemDetail/ItemDetail'

function ItemDetailContainer() {
    const { id } = useParams();
    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchItem = async (id) => {
        try {
            const data = await getProduct(id);
            setItem(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchItem(id);
    }, [id]);

    return (
        <>
            {loading && <Spinner />}

            {!loading && item && <ItemDetail item={item} />}

            {!loading && !item && <p>No se encontró el producto</p>}
        </>
    )
}

export default ItemDetailContainer