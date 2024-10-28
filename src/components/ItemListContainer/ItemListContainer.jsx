import { useEffect, useState } from 'react'
import { getProducts } from '../../services/ProductsServices'
import ItemList from '../ItemList/ItemList'

function ItemListContainer({ greeting }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <>
            <h1>{greeting}</h1>
            <ItemList items={products} />
        </>
    )
}

export default ItemListContainer