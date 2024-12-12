function SearchBar({ onSearch, placeholder = 'Buscar...' }) {
    const handleSearch = (event) => onSearch(event.target.value);

    return (
        <div className="container d-flex justify-content-center mt-3">
            <div className="w-75">
                <input
                    type="text"
                    className="form-control"
                    placeholder={placeholder}
                    onChange={handleSearch}
                />
            </div>
        </div>
    );
}

export default SearchBar;