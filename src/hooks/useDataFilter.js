import { useState, useEffect, useCallback } from 'react';

function useDataFilter(data, fields = [], customFilter) {
    const [filteredData, setFilteredData] = useState([]);
    const [filter, setFilter] = useState('');

    const memoizedSetFilter = useCallback((value) => {
        setFilter(value);
    }, []);

    useEffect(() => {
        if (!Array.isArray(data) || data.length === 0 || filter === '') {
            setFilteredData(data);
            return;
        }

        const applyFilter = () => {
            const lowerCaseFilter = filter.trim().toLowerCase();

            return customFilter
                ? data.filter((item) => customFilter(item, filter))
                : data.filter((item) =>
                    fields.some((field) => {
                        const fieldValue = item[field];
                        return (
                            typeof fieldValue === 'string' &&
                            fieldValue.toLowerCase().includes(lowerCaseFilter)
                        );
                    })
                );
        };

        const newFilteredData = applyFilter();

        if (JSON.stringify(newFilteredData) !== JSON.stringify(filteredData)) {
            setFilteredData(newFilteredData);
        }

    }, [data, filter, fields, customFilter]);

    return { filteredData, setFilter: memoizedSetFilter };
}

export default useDataFilter;