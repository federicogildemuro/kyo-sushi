import useFavorites from '../../hooks/useFavorites';
import useItemsPerPage from '../../hooks/useItemsPerPage';
import usePagination from '../../hooks/usePagination';
import FavoritesList from './FavoritesList';
import EmptyFavorites from './EmptyFavorites';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';

function Favorites() {
    const { favorites, loading } = useFavorites();
    const { itemsPerPage } = useItemsPerPage();
    const { currentItems, currentPage, totalPages, setCurrentPage } = usePagination(favorites, itemsPerPage);

    if (loading) return <Spinner />;

    return (
        <section className="d-flex flex-column text-center">
            <div className="container">
                <h1 className="display-6 fw-bold mb-5">Tus favoritos</h1>

                {currentItems.length > 0 ? (
                    <FavoritesList
                        items={currentItems}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                ) : (
                    <EmptyFavorites />
                )}

                <BackButton />
            </div>
        </section>
    );
}

export default Favorites;