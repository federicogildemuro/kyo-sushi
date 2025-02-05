import { useCallback, useEffect, useState } from 'react';
import useDataFilter from '../hooks/useDataFilter';
import SearchBar from './SearchBar';
import CategoryCheckboxes from './CategoryCheckboxes';
import PriceRange from './PriceRange';

function FiltersMenu({ items, onFilterChange }) {
    /* Custom filter function */
    const customFilterFunction = useCallback((item, filter) => {
        const { selectedCategories = [], priceRange = {} } = filter;

        const matchesCategory =
            selectedCategories.length === 0 || selectedCategories.includes(item.category);

        const matchesPrice =
            (!priceRange.min || item.price >= parseFloat(priceRange.min)) &&
            (!priceRange.max || item.price <= parseFloat(priceRange.max));

        return matchesCategory && matchesPrice;
    }, []);

    /* Data filter */
    const { filteredData, setFilter } = useDataFilter(items, ['title'], customFilterFunction);

    /* Update parent component */
    useEffect(() => {
        onFilterChange(filteredData);
    }, [filteredData, onFilterChange]);

    /* Search */
    const [searchValue, setSearchValue] = useState('');
    const handleSearchChange = useCallback((value) => {
        setSearchValue(value);
        setFilter({ search: value });
    }, [setFilter]);

    /* Categories */
    const categories = Array.from(new Set(items.map((item) => item.category)));
    const [selectedCategories, setSelectedCategories] = useState([]);
    const handleCategoryChange = useCallback((categories) => {
        setSelectedCategories(categories);
        setFilter({ selectedCategories: categories });
    }, [setFilter]);

    /* Price */
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const handlePriceRangeChange = useCallback((priceRange) => {
        setPriceRange(priceRange);
        setFilter({ priceRange });
    }, [setFilter]);

    /* Clear filters */
    const handleClearFilters = () => {
        setSearchValue('');
        setSelectedCategories([]);
        setPriceRange({ min: '', max: '' });
        setFilter({ search: '', selectedCategories: [], priceRange: { min: '', max: '' } });
    };

    return (
        <div className="d-flex flex-column align-items-center gap-5 mt-5">
            <SearchBar
                searchValue={searchValue}
                onChange={handleSearchChange}
            />

            <CategoryCheckboxes
                categories={categories}
                selectedCategories={selectedCategories}
                onChange={handleCategoryChange}
            />

            <PriceRange
                priceRange={priceRange}
                onChange={handlePriceRangeChange}
            />

            <button
                className="btn custom-btn"
                onClick={handleClearFilters}>
                Limpiar filtros
            </button>
        </div>
    )
}

export default FiltersMenu;