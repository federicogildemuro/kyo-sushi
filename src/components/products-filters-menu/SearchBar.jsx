import { useEffect, useState } from 'react';

function SearchBar({ searchValue, onChange }) {
    // State to store the debounced value
    const [debouncedValue, setDebouncedValue] = useState(searchValue);

    // Debounce the search value
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(searchValue);
        }, 300);

        return () => clearTimeout(handler);
    }, [searchValue]);

    // Call the onChange callback with the debounced value
    useEffect(() => {
        onChange(debouncedValue);
    }, [debouncedValue, onChange]);

    // Handle the input change
    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <div className="d-flex flex-column align-items-center gap-3 w-50" role="search">
            <h5 id="search-label">Filtrar por nombre</h5>

            <input
                type="text"
                id="search-bar"
                className="form-control"
                value={searchValue}
                onChange={handleChange}
                aria-labelledby="search-label"
            />
        </div>
    );
}

export default SearchBar;