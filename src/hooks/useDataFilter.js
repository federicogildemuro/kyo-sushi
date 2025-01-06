import { useState, useEffect, useCallback } from 'react';

function useDataFilter(data, fields = [], customFilterFunction) {
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
            const lowerCaseSearch = filter.search?.trim().toLowerCase() || '';
            const searchFilteredData = data.filter((item) =>
                fields.some((field) => {
                    const fieldValue = item[field];
                    return (
                        typeof fieldValue === 'string' &&
                        fieldValue.toLowerCase().includes(lowerCaseSearch)
                    );
                })
            );

            if (customFilterFunction) {
                return searchFilteredData.filter((item) =>
                    customFilterFunction(item, filter)
                );
            }

            return searchFilteredData;
        };

        const newFilteredData = applyFilter();

        if (JSON.stringify(newFilteredData) !== JSON.stringify(filteredData)) {
            setFilteredData(newFilteredData);
        }
    }, [data, filter, fields, customFilterFunction]);

    return { filteredData, setFilter: memoizedSetFilter };
}

export default useDataFilter;