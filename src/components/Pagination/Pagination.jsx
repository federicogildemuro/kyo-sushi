import './Pagination.css';

function Pagination({ totalPages, currentPage, onPageChange }) {
    if (totalPages <= 1) return null;

    const handlePreviousPage = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <nav className="d-flex justify-content-center mt-4">
            <ul className="pagination">
                {currentPage > 1 && (
                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={handlePreviousPage}
                        >
                            &lt;
                        </button>
                    </li>
                )}

                {currentPage > 1 && (
                    <li className="page-item">
                        <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
                            {currentPage - 1}
                        </button>
                    </li>
                )}

                <li className="page-item active">
                    <button className="page-link">
                        {currentPage}
                    </button>
                </li>

                {currentPage < totalPages && (
                    <li className="page-item">
                        <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
                            {currentPage + 1}
                        </button>
                    </li>
                )}

                {currentPage < totalPages && (
                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={handleNextPage}
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