import { useParams } from 'react-router-dom';
import { fetchProductById, fetchProducts } from '../../../services/productsServices';
import useAsync from '../../../hooks/useAsync';
import ItemDetail from './ItemDetail';
import RelatedItems from './RelatedItems';
import ProductNotFound from './ProductNotFound';
import Spinner from '../../../components/Spinner';
import './ItemDetailContainer.css';

function ItemDetailContainer() {
    const { id } = useParams();
    const { data: item, loading: loadingItem } = useAsync(
        () => fetchProductById(id),
        [id]
    );

    const category = item?.category;
    const { data: relatedItems, loading: loadingRelatedItems } = useAsync(
        () => (category ? fetchProducts(category) : []),
        [category]
    );
    const filteredRelatedItems = relatedItems
        ?.filter((item) => item.id !== id)
        .slice(0, 4);

    const loading = loadingItem || loadingRelatedItems;
    if (loading) return <Spinner />;

    return (
        <section className="d-flex flex-column text-center">
            <div className="container">
                {item ? (
                    <>
                        <ItemDetail item={item} />
                        <RelatedItems items={filteredRelatedItems} />
                    </>
                ) : (
                    <ProductNotFound />
                )}
            </div>
        </section>
    );
}

export default ItemDetailContainer;