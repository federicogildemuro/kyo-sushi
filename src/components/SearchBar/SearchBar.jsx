import { useState, useEffect } from 'react';

function SearchBar({ onSearch, placeholder = 'Buscar...' }) {
    const [searchValue, setSearchValue] = useState('');
    const [debouncedValue, setDebouncedValue] = useState(searchValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(searchValue);
        }, 300);

        return () => clearTimeout(handler);
    }, [searchValue]);

    useEffect(() => {
        onSearch(debouncedValue);
    }, [debouncedValue, onSearch]);

    const handleChange = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <div className="container d-flex justify-content-center my-5">
            <div className="w-75">
                <label htmlFor="search-bar" className="visually-hidden">Buscar</label>
                <input
                    id="search-bar"
                    type="text"
                    value={searchValue}
                    className="form-control"
                    placeholder={placeholder}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}

export default SearchBar;