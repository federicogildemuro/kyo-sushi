import { useState, useEffect, useCallback } from 'react';

// Custom hook to filter data based on search criteria and custom filter function
function useDataFilter(data, fields = [], customFilterFunction) {
    // State to store the filtered data based on the applied filters
    const [filteredData, setFilteredData] = useState([]);
    // State to store the current filter criteria
    const [filter, setFilter] = useState({});

    // Memoized function to update the filter state without causing unnecessary re-renders
    const memoizedSetFilter = useCallback((newFilter) => {
        setFilter((prevFilter) => ({ ...prevFilter, ...newFilter }));
    }, []);

    // Effect to apply the filter whenever the data, filter, fields, or custom filter function change
    useEffect(() => {
        // If the data is not an array or is empty, just set the filtered data to the original data
        if (!Array.isArray(data) || data.length === 0) {
            setFilteredData(data);
            return;
        }
        // Function to apply the filter to the data
        const applyFilter = () => {
            // Get the search term from the filter and make it lowercase
            const lowerCaseSearch = filter.search?.trim().toLowerCase() || '';
            // Filter data based on the search term in the specified fields
            const searchFilteredData = data.filter((item) =>
                fields.some((field) => {
                    const fieldValue = item[field];
                    return (
                        typeof fieldValue === 'string' &&
                        fieldValue.toLowerCase().includes(lowerCaseSearch)
                    );
                })
            );
            // If a custom filter function is provided, apply it
            if (customFilterFunction) {
                return searchFilteredData.filter((item) =>
                    customFilterFunction(item, filter)
                );
            }
            return searchFilteredData;
        };
        // Apply the filter and update the filtered data state
        const newFilteredData = applyFilter();
        // Only update filteredData if the new filtered data is different from the previous one
        if (JSON.stringify(newFilteredData) !== JSON.stringify(filteredData)) {
            setFilteredData(newFilteredData);
        }
    }, [data, filter, fields, customFilterFunction]);

    return { filteredData, setFilter: memoizedSetFilter };
}

export default useDataFilter;