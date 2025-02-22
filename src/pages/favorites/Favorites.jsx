import useFavorites from '../../hooks/useFavorites';
import ItemList from '../../components/item-list/ItemList';
import EmptyFavorites from './EmptyFavorites';
import BackButton from '../../components/misc/BackButton';
import Spinner from '../../components/spinner/Spinner';

function Favorites() {
    // Get favorites and loading state from the custom hook
    const { favorites, loading } = useFavorites();

    // Check if there are items in the favorites
    const hasItems = favorites.length > 0;
    // Render EmptyFavorites component if there are no items
    if (!hasItems) return <EmptyFavorites />;

    // Show spinner while the favorites are loading
    if (loading) return <Spinner />;

    return (
        <section className="d-flex flex-column text-center">
            <div className="container mb-5">
                <h1 className="display-6 fw-bold mb-5">Tus favoritos</h1>

                <ItemList items={favorites} />

                <BackButton />
            </div>
        </section>
    );
}

export default Favorites;