import ItemList from '../../../components/item-list/ItemList';
import Pagination from '../../../components/Pagination';

function FavoritesList({ items, totalPages, currentPage, setCurrentPage }) {
    return (
        <>
            <ItemList items={items} />

            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </>
    );
}

export default FavoritesList;