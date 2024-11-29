import { useParams } from 'react-router-dom';
import useAsync from '../../hooks/useAsync';
import { fetchProducts } from '../../services/ProductsServices';
import Spinner from '../Spinner/Spinner';
import ItemList from '../ItemList/ItemList';
import './ItemListContainer.css';

function ItemListContainer() {
    const { category } = useParams();
    const { data, loading, error } = useAsync(() => fetchProducts(category), [category]);

    if (loading) return <Spinner />;

    if (error) return <p>Error al cargar los productos</p>;

    if (!data) return <p>No hay productos disponibles</p>;

    return (
        <>
            {category
                ? <h1>{category}</h1>
                : <h1>Nuestros productos</h1>
            }
            <ItemList items={data} />;
        </>
    );
};

export default ItemListContainer;