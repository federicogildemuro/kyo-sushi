import { useEffect, useState } from 'react';

function SearchBar({ searchValue, onChange }) {
    const [debouncedValue, setDebouncedValue] = useState(searchValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(searchValue);
        }, 300);

        return () => clearTimeout(handler);
    }, [searchValue]);

    useEffect(() => {
        onChange(debouncedValue);
    }, [debouncedValue, onChange]);

    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <div className="d-flex flex-column align-items-center gap-3 w-50">
            <label
                htmlFor="search-bar"
                className="fw-semibold"
            >
                Fiiltrar por nombre
            </label>

            <input
                type="text"
                id="search-bar"
                className="form-control"
                value={searchValue}
                onChange={handleChange}
            />
        </div>

    );
}

export default SearchBar;