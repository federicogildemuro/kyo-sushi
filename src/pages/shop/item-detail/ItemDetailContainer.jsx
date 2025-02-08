import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById, fetchProducts } from '../../../services/productsServices';
import useAsync from '../../../hooks/useAsync';
import ItemDetail from './ItemDetail';
import RelatedItems from './RelatedItems';
import ProductNotFound from './ProductNotFound';
import BackButton from '../../../components/BackButton';
import Spinner from '../../../components/Spinner';
import './ItemDetailContainer.css';

function ItemDetailContainer() {
    const { id } = useParams();
    const { data: item, loading: loadingItem } = useAsync(() => fetchProductById(id), [id]);

    const category = item?.category;
    const { data: relatedItems, loading: loadingRelatedItems } = useAsync(
        () => (category ? fetchProducts(category) : []),
        [category]
    );

    const loading = loadingItem || loadingRelatedItems;

    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        if (!loading) {
            setHasLoaded(true);
        }
    }, [loading]);

    return (
        <section className="d-flex flex-column text-center">
            <div className="container">
                {loading ? (
                    <Spinner />
                ) : hasLoaded && item ? (
                    <>
                        {item && <ItemDetail item={item} />}
                        <RelatedItems items={relatedItems} />
                    </>
                ) : (
                    <ProductNotFound />
                )}

                <BackButton />
            </div>
        </section>
    );
}

export default ItemDetailContainer;
