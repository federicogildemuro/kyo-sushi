import './Pagination.css';

function Pagination({ totalPages, currentPage, onPageChange }) {
    if (totalPages <= 1) return null;

    const handlePreviousPage = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    const handlePageClick = (pageNumber) => {
        if (pageNumber !== currentPage) {
            onPageChange(pageNumber);
        }
    };

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

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <nav className="d-flex justify-content-center mt-4" aria-label="Page navigation">
            <ul className="pagination gap-2">
                {currentPage > 1 && (
                    <li className="page-item">
                        <button
                            className="page-link fw-semibold p-2"
                            onClick={handlePreviousPage}
                            aria-label="Previous page"
                        >
                            &lt;
                        </button>
                    </li>
                )}

                {startPage > 1 && (
                    <li className="page-item">
                        <span className="page-link dots fw-semibold p-2">...</span>
                    </li>
                )}

                {pages.map((pageNumber) => (
                    <li
                        key={pageNumber}
                        className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}
                    >
                        <button
                            className="page-link fw-semibold p-2"
                            onClick={() => handlePageClick(pageNumber)}
                            aria-label={`Page ${pageNumber}`}
                        >
                            {pageNumber}
                        </button>
                    </li>
                ))}

                {endPage < totalPages && (
                    <li className="page-item">
                        <span className="page-link dots fw-semibold p-2">...</span>
                    </li>
                )}

                {currentPage < totalPages && (
                    <li className="page-item">
                        <button
                            className="page-link fw-semibold p-2"
                            onClick={handleNextPage}
                            aria-label="Next page"
                        >
                            &gt;
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Pagination;