import { useParams } from 'react-router-dom';
import useAsync from '../../hooks/useAsync';
import useDataFilter from '../../hooks/useDataFilter';
import { fetchProducts } from '../../services/ProductsServices';
import Spinner from '../Spinner/Spinner';
import SearchBar from '../SearchBar/SearchBar';
import ItemList from '../ItemList/ItemList';

function ItemListContainer() {
    const { category } = useParams();
    const { data, loading } = useAsync(() => fetchProducts(category), [category]);
    const { filteredData, setFilter } = useDataFilter(data, ['title', 'category']);

    return (
        <section className="custom-container d-flex flex-column text-center">
            <h1 className="display-6 fw-bold mb-3">
                {category
                    ? `${category}`
                    : 'Nuestros productos'
                }
            </h1>

            <SearchBar
                onSearch={setFilter}
                placeholder="Buscar productos por título o categoría..."
            />

            {loading && <Spinner />}

            {!loading && (
                Array.isArray(filteredData) && filteredData.length > 0 ? (
                    <ItemList items={filteredData} />
                ) : (
                    <p className="fs-5 fs-sm-6 fs-md-7 fs-lg-8 mt-3 mb-3">No se encontraron productos</p>
                )
            )}
        </section>
    );
}

export default ItemListContainer;