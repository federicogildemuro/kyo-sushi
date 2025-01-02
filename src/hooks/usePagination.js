import { useState, useEffect } from 'react';

function usePagination(data, itemsPerPage) {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);

    useEffect(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        setCurrentItems(data?.slice(indexOfFirstItem, indexOfLastItem) || []);
    }, [data, currentPage, itemsPerPage]);

    return { currentItems, currentPage, totalPages, setCurrentPage };
}

export default usePagination;