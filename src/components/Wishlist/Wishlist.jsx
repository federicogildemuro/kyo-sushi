import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useWishlist from '../../hooks/useWishlist';
import usePagination from '../../hooks/usePagination';
import { scrollToTop } from '../../utils/ScrollUtils';
import ItemList from '../ItemList/ItemList';
import Pagination from '../Pagination/Pagination';

function Wishlist() {
    const { wishlist } = useWishlist();

    /* Responsive items per page */
    const [itemsPerPage, setItemsPerPage] = useState(4);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 576) {
                setItemsPerPage(4);
            } else if (window.innerWidth < 992) {
                setItemsPerPage(12);
            } else {
                setItemsPerPage(16);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    /* Pagination */
    const { currentItems, currentPage, totalPages, setCurrentPage } = usePagination(wishlist, itemsPerPage);

    return (
        <section className="custom-container d-flex flex-column text-center gap-3">
            <div className="container mb3">
                <h1 className="display-6 fw-bold mb-3">Tus favoritos</h1>

                {currentItems.length > 0
                    ?
                    (<>
                        <ItemList items={currentItems} />

                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                        />
                    </>)
                    :
                    (<>
                        <p className="fs-5">
                            <i className="bi bi-heart me-2" />
                            No tienes productos marcados como favoritos
                        </p>

                        <Link
                            to="/tienda"
                            className="btn custom-btn"
                            onClick={scrollToTop}
                        >
                            Ir a la tienda
                        </Link>
                    </>)
                }
            </div>
        </section>
    );
}

export default Wishlist;