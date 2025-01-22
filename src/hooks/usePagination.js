import { useState, useMemo } from 'react';

function usePagination(data, itemsPerPage) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = useMemo(() => {
        return Array.isArray(data) ? Math.ceil(data.length / itemsPerPage) : 0;
    }, [data, itemsPerPage]);

    const currentItems = useMemo(() => {
        if (Array.isArray(data)) {
            const startIndex = (currentPage - 1) * itemsPerPage;
            return data.slice(startIndex, startIndex + itemsPerPage);
        }
        return [];
    }, [data, currentPage, itemsPerPage]);

    return {
        currentItems,
        currentPage,
        totalPages,
        setCurrentPage
    };
}

export default usePagination;