import { useState } from 'react';

function useSorting() {
    const [sortOrder, setSortOrder] = useState({ field: '', direction: 'asc' });

    const handleSort = (field) => {
        setSortOrder((prevState) => ({
            field,
            direction: prevState.field === field && prevState.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    const sortData = (data) => {
        return [...data].sort((a, b) => {
            if (!sortOrder.field) return 0;
            const aField = a[sortOrder.field];
            const bField = b[sortOrder.field];
            if (aField < bField) return sortOrder.direction === 'asc' ? -1 : 1;
            if (aField > bField) return sortOrder.direction === 'asc' ? 1 : -1;
            return 0;
        });
    };

    return { sortOrder, handleSort, sortData };
}

export default useSorting;