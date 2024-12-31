import { useState, useEffect, useCallback } from 'react';

function useDataFilter(data, fields = [], customFilter) {
    const [filteredData, setFilteredData] = useState([]);
    const [filter, setFilter] = useState({});

    const memoizedSetFilter = useCallback((newFilter) => {
        setFilter((prevFilter) => ({ ...prevFilter, ...newFilter }));
    }, []);

    useEffect(() => {
        if (!Array.isArray(data) || data.length === 0) {
            setFilteredData(data);
            return;
        }

        const applyFilter = () => {
            if (customFilter) {
                return data.filter((item) => customFilter(item, filter));
            }

            const lowerCaseFilter = filter.search?.trim().toLowerCase() || '';
            return data.filter((item) =>
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