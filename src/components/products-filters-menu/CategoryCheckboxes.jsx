function CategoryCheckboxes({ categories, selectedCategories = [], onChange }) {
    // Handle the change of the category checkboxes
    const handleChange = (category) => {
        // If the category is already selected, remove it from the list, otherwise add it
        if (selectedCategories.includes(category)) {
            onChange(selectedCategories.filter((cat) => cat !== category));
        } else {
            onChange([...selectedCategories, category]);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center gap-3">
            <h5>Filtrar por categoría</h5>

            <div className="d-flex justify-content-center flex-wrap gap-3 mx-3">
                {categories.map((category) => (
                    <div
                        key={category}
                        className="form-check"
                    >
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