import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useAsync from '../../hooks/useAsync';
import { fetchProductById, fetchProducts } from '../../services/productsServices';
import ItemDetailContent from './ItemDetailContent';
import RelatedItems from './RelatedItems';
import ProductNotFound from './ProductNotFound';
import Spinner from '../../components/spinner/Spinner';
import './ItemDetail.css';

function ItemDetail() {
    // Get the id from the URL params
    const { id } = useParams();

    // Fetch the item by id
    const { data: dataItem, loading: loadingItem } = useAsync(
        () => fetchProductById(id),
        [id]
    );
    // Memoize the item data
    const item = useMemo(() => dataItem, [dataItem]);

    // Get the category from the item
    const category = item?.category;
    // Fetch related items by category
    const { data: dataRelatedItems, loading: loadingRelatedItems } = useAsync(
        () => (category ? fetchProducts(category) : []),
        [category]
    );
    // Memoize the related items data
    const relatedItems = useMemo(() => Array.isArray(dataRelatedItems) ? dataRelatedItems : [], [dataRelatedItems]);
    // Filter the related items to exclude the current item and limit to 4
    const filteredRelatedItems = relatedItems
        ?.filter((item) => item.id !== id)
        .slice(0, 4);

    // Show spinner while loading
    const loading = loadingItem || loadingRelatedItems;
    if (loading) return <Spinner />;

    return (
        <section className="d-flex flex-column text-center">
            <div className="container">
                {/* Show the item detail content or a product not found message */}
                {item ? (
                    <>
                        <ItemDetailContent item={item} />
                        <RelatedItems items={filteredRelatedItems} />
                    </>
                ) : (
                    <ProductNotFound />
                )}
            </div>
        </section>
    );
}

export default ItemDetail;