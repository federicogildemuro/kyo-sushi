import { useEffect, useState } from 'react';

function SearchBar({ searchValue, onChange }) {
    const [isVisible, setIsVisible] = useState(false);
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
        <div className="d-flex flex-column align-items-center align-items-md-start gap-3 w-100">
            <h5
                onClick={() => setIsVisible(!isVisible)}
                style={{ cursor: 'pointer' }}
            >
                Filtrar por nombre
                <i className={`bi bi-caret-${isVisible ? 'up-fill' : 'down-fill'}`} />
            </h5>

            {isVisible && (
                <input
                    type="text"
                    id="search-bar"
                    className="form-control"
                    value={searchValue}
                    onChange={handleChange}
                />
            )}
        </div>
    );
}

export default SearchBar;