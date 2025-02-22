import './Pagination.css';

function Pagination({ totalPages, currentPage, onPageChange }) {
    // Don't render pagination if there is only one page
    if (totalPages <= 1) return null;

    // Handle pagination buttons clicks
    const handlePreviousPage = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };
    const handlePageClick = (pageNumber) => {
        if (pageNumber !== currentPage) onPageChange(pageNumber);
    };

    // Calculate the visible pages
    const visiblePages = 3;
    const halfRange = Math.floor(visiblePages / 2);
    let startPage = Math.max(1, currentPage - halfRange);
    let endPage = Math.min(totalPages, currentPage + halfRange);
    if (endPage - startPage < visiblePages - 1) {
        if (startPage === 1) {
            endPage = Math.min(totalPages, startPage + visiblePages - 1);
        } else if (endPage === totalPages) {
            startPage = Math.max(1, endPage - visiblePages + 1);
        }
    }

    // Create an array with the visible pages
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <nav
            className="d-flex justify-content-center m-5"
            aria-label="Paginación"
        >
            <ul className="pagination gap-2">
                {/* Show previous page button if not on the first page */}
                {currentPage > 1 && (
                    <li className="page-item">
                        <button
                            className="page-link fw-semibold p-2"
                            onClick={handlePreviousPage}
                            aria-label="Página anterior"
                        >
                            <i
                                className="bi bi-chevron-left"
                                aria-hidden="true"
                            />
                        </button>
                    </li>
                )}

                {/* Show dots if the start page is not the first page */}
                {startPage > 1 && (
                    <li className="page-item">
                        <span
                            className="page-link dots fw-semibold p-2"
                            aria-hidden="true"
                        >
                            ...
                        </span>
                    </li>
                )}

                {/* Create a button for each visible page */}
                {pages.map((pageNumber) => (
                    <li
                        key={pageNumber}
                        className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}
                    >
                        <button
                            className="page-link fw-semibold p-2"
                            onClick={() => handlePageClick(pageNumber)}
                            aria-label={`Página ${pageNumber}`}
                        >
                            {pageNumber}
                        </button>
                    </li>
                ))}

                {/* Show dots if the end page is not the last page */}
                {endPage < totalPages && (
                    <li className="page-item">
                        <span
                            className="page-link dots fw-semibold p-2"
                            aria-hidden="true"
                        >
                            ...
                        </span>
                    </li>
                )}

                {/* Show next page button if not on the last page */}
                {currentPage < totalPages && (
                    <li className="page-item">
                        <button
                            className="page-link fw-semibold p-2"
                            onClick={handleNextPage}
                            aria-label="Página siguiente"
                        >
                            <i
                                className="bi bi-chevron-right"
                                aria-hidden="true"
                            />
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Pagination;