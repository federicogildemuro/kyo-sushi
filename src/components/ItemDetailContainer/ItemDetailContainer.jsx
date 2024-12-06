import { useParams, Link } from 'react-router-dom'
import { fetchProductById } from '../../services/ProductsServices'
import useAsync from '../../hooks/useAsync'
import Spinner from '../Spinner/Spinner'
import ItemDetail from '../ItemDetail/ItemDetail'

function ItemDetailContainer() {
    const { id } = useParams();
    const { data, loading } = useAsync(() => fetchProductById(id), [id]);

    return (
        <section className="custom-container d-flex flex-column text-center">
            {loading ? (
                <Spinner />
            ) : data ? (
                <ItemDetail item={data} />
            ) : (
                <>
                    <p className="fs-5 fs-sm-6 fs-md-7 fs-lg-8 mt-3 mb-3">Producto no encontrado</p>
                    <Link to="/tienda" className="btn custom-btn mx-auto">Volver a la tienda</Link>
                </>
            )}
        </section>
    )
}

export default ItemDetailContainer