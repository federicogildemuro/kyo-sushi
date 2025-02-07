import ItemList from '../../../components/item-list/ItemList';
import Pagination from '../../../components/Pagination';

const FavoritesList = ({ items, totalPages, currentPage, setCurrentPage }) => (
    <>
        <ItemList items={items} />

        <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
        />
    </>
);

export default FavoritesList;