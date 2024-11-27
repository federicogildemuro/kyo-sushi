import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProducts, fetchProductsByCategory } from '../../services/ProductsServices';
import Spinner from '../Spinner/Spinner';
import ItemList from '../ItemList/ItemList';
import './ItemListContainer.css';

function ItemListContainer() {
    const defaultH1 = 'Nuestros productos';
    const [h1, setH1] = useState(defaultH1);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { category } = useParams();

    const fetchItems = async () => {
        try {
            const data = await fetchProducts();
            setItems(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchItemsByCategory = async () => {
        try {
            const data = await fetchProductsByCategory(category);
            setItems(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (category) {
            setLoading(true);
            fetchItemsByCategory();
            setH1(`${category}`);
        } else {
            setLoading(true);
            fetchItems();
            setH1(defaultH1);
        }
    }, [category]);

    return (
        <>
            <h1>{h1}</h1>

            {loading && <Spinner />}

            {!loading && items.length > 0 && <ItemList items={items} />}

            {!loading && items.length === 0 && <p>No hay productos disponibles</p>}
        </>
    );
};

export default ItemListContainer;