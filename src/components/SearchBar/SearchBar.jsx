import { useState } from 'react';

function SearchBar({ onSearch, placeholder = 'Buscar...' }) {
    const [searchValue, setSearchValue] = useState('');
    const handleChange = (event) => {
        const value = event.target.value;
        setSearchValue(value);
        onSearch(value);
    };

    return (
        <div className="container d-flex justify-content-center my-5">
            <div className="w-75">
                <input
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