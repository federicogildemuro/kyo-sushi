import './ItemListContainer.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProducts, getProductsByCategory } from '../../services/ProductsServices'
import ItemList from '../ItemList/ItemList'

function ItemListContainer() {
    const [h1, setH1] = useState('Bienvenidos a Kyo Sushi');
    const [items, setItems] = useState([]);
    const { id: category } = useParams();

    const fetchItems = async () => {
        try {
            const data = await getProducts();
            setItems(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchItemsByCategory = async () => {
        try {
            const data = await getProductsByCategory(category);
            setItems(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (category) {
            fetchItemsByCategory();
            setH1(`${category}`);
        } else {
            fetchItems();
            setH1('Bienvenidos a Kyo Sushi');
        }
    }, [category]);

    return (
        <>
            <h1>{h1}</h1>
            {items.length > 0 ? (
                <ItemList items={items} />
            ) : (
                <p>No hay productos disponibles</p>
            )}
        </>
    );
}

export default ItemListContainer