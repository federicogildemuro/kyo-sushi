import useFavorites from '../../hooks/useFavorites';
import ItemList from '../../components/item-list/ItemList';
import EmptyFavorites from './EmptyFavorites';
import BackButton from '../../components/misc/BackButton';
import Spinner from '../../components/spinner/Spinner';

function Favorites() {
    const { favorites, loading } = useFavorites();

    if (loading) return <Spinner />;

    return (
        <section className="d-flex flex-column text-center">
            <div className="container mb-5">
                <h1 className="display-6 fw-bold mb-5">Tus favoritos</h1>

                {favorites.length > 0 ? (
                    <ItemList items={favorites} />
                ) : (
                    <EmptyFavorites />
                )}

                <BackButton />
            </div>
        </section>
    );
}

export default Favorites;