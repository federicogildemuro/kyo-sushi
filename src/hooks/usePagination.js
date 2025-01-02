import { useState, useMemo } from 'react';

function usePagination(data, itemsPerPage) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = useMemo(() => Math.ceil(data.length / itemsPerPage), [data, itemsPerPage]);

    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return data.slice(startIndex, startIndex + itemsPerPage);
    }, [data, currentPage, itemsPerPage]);

    return {
        currentItems,
        currentPage,
        totalPages,
        setCurrentPage
    };
}

export default usePagination;