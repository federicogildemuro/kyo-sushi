import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../services/ProductsServices';
import useAsync from '../../hooks/useAsync';
import Spinner from '../Spinner/Spinner';
import ItemDetail from '../ItemDetail/ItemDetail';

function ItemDetailContainer() {
    const { id } = useParams();
    const { data, loading, error } = useAsync(() => fetchProductById(id), [id]);

    if (loading) return <Spinner />;

    if (error) return <p>Error al cargar el producto</p>;

    if (!data) return <p>Producto no encontrado</p>;

    return <ItemDetail item={data} />;
}

export default ItemDetailContainer;