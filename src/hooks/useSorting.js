import { useCallback, useState } from 'react';

function useSorting() {
    const [sortOrder, setSortOrder] = useState({ field: '', direction: 'asc' });

    const handleSort = (field) => {
        setSortOrder((prevState) => ({
            field,
            direction: prevState.field === field && prevState.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    const sortData = (data, field, direction) => {
        return [...data].sort((a, b) => {
            const aField = a[field];
            const bField = b[field];
            if (aField < bField) return direction === 'asc' ? -1 : 1;
            if (aField > bField) return direction === 'asc' ? 1 : -1;
            return 0;
        });
    };

    const applySorting = useCallback((data) => {
        if (!sortOrder.field) return data;
        return sortData(data, sortOrder.field, sortOrder.direction);
    }, [sortOrder]);

    return { sortOrder, handleSort, applySorting };
}

export default useSorting;