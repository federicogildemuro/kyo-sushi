import { useParams } from 'react-router-dom'
import useAsync from '../../hooks/useAsync'
import { fetchProducts } from '../../services/ProductsServices'
import Spinner from '../Spinner/Spinner'
import ItemList from '../ItemList/ItemList'

function ItemListContainer() {
    const { category } = useParams();
    const { data, loading } = useAsync(() => fetchProducts(category), [category]);

    return (
        <section className="custom-container d-flex flex-column text-center">
            {loading ? (
                <Spinner />
            ) : Array.isArray(data) && data.length > 0 ? (
                <>
                    <h1 className="display-6 fw-bold mb-3">
                        {category
                            ? `${category}`
                            : 'Nuestros productos'
                        }
                    </h1>
                    <ItemList items={data} />
                </>
            ) : (
                <p className="fs-5 fs-sm-6 fs-md-7 fs-lg-8 mt-3 mb-3">No se encontraron productos</p>
            )}
        </section>
    )
}

export default ItemListContainer