import { useMemo, useState } from 'react';

// Custom hook to manage pagination based on data and items per page
function usePagination(data, itemsPerPage) {
    // State to store the current page number
    const [currentPage, setCurrentPage] = useState(1);

    // Memoized value to calculate the total number of pages based on data length and items per page
    const totalPages = useMemo(() => {
        return Array.isArray(data) ? Math.ceil(data.length / itemsPerPage) : 0;
    }, [data, itemsPerPage]);

    // Memoized value to get the items for the current page based on the page number
    const currentItems = useMemo(() => {
        if (Array.isArray(data)) {
            // Calculate the start index for the current page and slice the data array
            const startIndex = (currentPage - 1) * itemsPerPage;
            return data.slice(startIndex, startIndex + itemsPerPage);
        }
        return [];
    }, [data, currentPage, itemsPerPage]);

    return { currentItems, currentPage, totalPages, setCurrentPage };
}

export default usePagination;