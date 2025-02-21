import { useCallback, useState } from 'react';

// Custom hook to manage sorting based on field and direction
function useSorting() {
    // State to store the sorting order with field and direction (ascending or descending)
    const [sortOrder, setSortOrder] = useState({ field: '', direction: 'asc' });

    // Function to handle the sorting action, toggling between ascending and descending
    const handleSort = (field) => {
        setSortOrder((prevState) => ({
            field,
            direction: prevState.field === field && prevState.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    // Function to sort the data based on the selected field and direction
    const sortData = (data, field, direction) => {
        return [...data].sort((a, b) => {
            const aField = a[field];
            const bField = b[field];
            // Compare the field values and return accordingly based on direction
            if (aField < bField) return direction === 'asc' ? -1 : 1;
            if (aField > bField) return direction === 'asc' ? 1 : -1;
            return 0;
        });
    };

    // Memoized function to apply the sorting to the data based on the current sort order
    const applySorting = useCallback((data) => {
        if (!sortOrder.field) return data;
        return sortData(data, sortOrder.field, sortOrder.direction);
    }, [sortOrder]);

    // Return the sorting state, handleSort function, and applySorting function
    return { sortOrder, handleSort, applySorting };
}

export default useSorting;