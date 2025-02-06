import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useFavorites from '../../hooks/useFavorites';
import usePagination from '../../hooks/usePagination';
import { scrollToTop } from '../../utils/scrollUtils';
import ItemList from '../../components/item-list/ItemList';
import Pagination from '../../components/Pagination';
import BackButton from '../../components/BackButton';

function Favorites() {
    const { user } = useAuth();
    const { favorites } = useFavorites();

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

    const { currentItems, currentPage, totalPages, setCurrentPage } = usePagination(favorites, itemsPerPage);

    return (
        <section className="custom-container d-flex flex-column text-center gap-3">
            <div className="container mb-3">
                <h1 className="display-6 fw-bold mb-3">Tus favoritos</h1>

                {currentItems.length > 0 ? (
                    <>
                        <ItemList items={currentItems} />

                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                        />
                    </>
                ) : (
                    <div>
                        <p className="fs-5">
                            <i className="bi bi-heart me-2" />
                            {user
                                ? 'No tienes productos marcados como favoritos'
                                : 'Inicia sesión para marcar productos como favoritos'}
                        </p>

                        {user ? (
                            <Link
                                to="/tienda"
                                className="btn custom-btn"
                                onClick={scrollToTop}
                            >
                                Ir a la tienda
                                <i className="bi bi-shop ms-2" />
                            </Link>
                        ) : (
                            <Link
                                to="/login"
                                className="btn custom-btn"
                                onClick={scrollToTop}
                            >
                                Iniciar sesión
                                <i className="bi bi-box-arrow-in-right ms-2" />
                            </Link>
                        )}
                    </div>
                )}

                <BackButton />
            </div>
        </section>
    );
}

export default Favorites;