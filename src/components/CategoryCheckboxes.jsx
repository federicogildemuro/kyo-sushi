function CategoryCheckboxes({ categories, selectedCategories = [], onChange }) {
    const handleChange = (category) => {
        if (selectedCategories.includes(category)) {
            onChange(selectedCategories.filter((cat) => cat !== category));
        } else {
            onChange([...selectedCategories, category]);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <p className="fw-semibold">Filtrar por categorías</p>

            <div className="d-flex flex-column flex-md-row flex-wrap gap-3">
                {categories.map((category) => (
                    <div key={category} className="form-check">
                        <input
                            type="checkbox"
                            id={`category-${category}`}
                            className="form-check-input"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleChange(category)}
                        />

                        <label
                            htmlFor={`category-${category}`}
                            className="form-check-label"
                        >
                            {category}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryCheckboxes;