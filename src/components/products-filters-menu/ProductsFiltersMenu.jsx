import { useState, useCallback, useEffect } from 'react';
import useDataFilter from '../../hooks/useDataFilter';
import SearchBar from './SearchBar';
import CategoryCheckboxes from './CategoryCheckboxes';
import PriceRange from './PriceRange';

function ProductsFilterMenu({ products, onChange }) {
    // Function to filter products based on selected categories and price range
    const customFilterFunction = useCallback((product, filter) => {
        // Destructure filter object
        const { selectedCategories = [], priceRange = {} } = filter;
        // Check if product matches selected categories
        const matchesCategory =
            selectedCategories.length === 0 || selectedCategories.includes(product.category);
        // Check if product matches selected price range
        const matchesPrice =
            (!priceRange.min || product.price >= parseFloat(priceRange.min)) &&
            (!priceRange.max || product.price <= parseFloat(priceRange.max));
        // Return true if product matches both category and price range filters
        return matchesCategory && matchesPrice;
    }, []);

    // Use the useDataFilter hook to filter products based on title, selected categories, and price range
    const { filteredData, setFilter } = useDataFilter(products, ['title'], customFilterFunction);

    // Call the onChange callback with the filtered data whenever it changes
    useEffect(() => {
        onChange(filteredData);
    }, [filteredData, onChange]);

    // Handle search input change
    const [searchValue, setSearchValue] = useState('');
    const handleSearchChange = useCallback((value) => {
        setSearchValue(value);
        setFilter({ search: value });
    }, [setFilter]);

    // Handle category selection change
    const categories = Array.from(new Set(products.map((product) => product.category)));
    const [selectedCategories, setSelectedCategories] = useState([]);
    const handleCategoryChange = useCallback((categories) => {
        setSelectedCategories(categories);
        setFilter({ selectedCategories: categories });
    }, [setFilter]);

    // Handle price range change
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const handlePriceRangeChange = useCallback((priceRange) => {
        setPriceRange(priceRange);
        setFilter({ priceRange });
    }, [setFilter]);

    // Handle clear filters button click
    const handleClearFilters = () => {
        setSearchValue('');
        setSelectedCategories([]);
        setPriceRange({ min: '', max: '' });
        setFilter({ search: '', selectedCategories: [], priceRange: { min: '', max: '' } });
    };

    return (
        <div className="d-flex flex-column align-items-center gap-3 mb-5">
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
                className="btn custom-btn mt-3"
                onClick={handleClearFilters}
            >
                Limpiar filtros
                <i
                    className="bi bi-arrow-counterclockwise ms-2"
                    aria-hidden="true"
                />
            </button>
        </div>
    );
}

export default ProductsFilterMenu;