import { useState } from 'react';

function CategoryCheckboxes({ categories, selectedCategories = [], onChange }) {
    const [isVisible, setIsVisible] = useState(false);

    const handleChange = (category) => {
        if (selectedCategories.includes(category)) {
            onChange(selectedCategories.filter((cat) => cat !== category));
        } else {
            onChange([...selectedCategories, category]);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center align-items-md-start gap-3 w-100">
            <h5
                onClick={() => setIsVisible(!isVisible)}
                style={{ cursor: 'pointer' }}
            >
                Filtrar por categoría
                <i className={`bi bi-caret-${isVisible ? 'up-fill' : 'down-fill'}`} />
            </h5>

            {isVisible && (
                <div className="d-flex flex-column flex-sm-row flex-wrap gap-3">
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
            )}
        </div>
    );
}

export default CategoryCheckboxes;