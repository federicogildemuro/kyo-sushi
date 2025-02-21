import { useEffect } from 'react';
import useSorting from '../../hooks/useSorting';

function SortButtons({ items, onChange, fields }) {
    // Get the sorting functions from the custom hook
    const { sortOrder, handleSort, applySorting } = useSorting();

    // Apply sorting when the items change
    useEffect(() => {
        onChange(applySorting(items));
    }, [onChange, applySorting, items]);

    // Get the arrow icon for the field depending on the sort order
    const getArrowIcon = (field) => {
        if (sortOrder.field === field) {
            return sortOrder.direction === 'asc' ? (
                <i
                    className="bi bi-arrow-up"
                    aria-hidden="true"
                />
            ) : (
                <i
                    className="bi bi-arrow-down"
                    aria-hidden="true"
                />
            );
        }
        return <i
            className="bi bi-arrow-down-up"
            aria-hidden="true"
        />;
    };

    return (
        <div className="d-flex justify-content-center flex-wrap gap-3 mx-5 mb-5">
            {/* Create a button for each field */}
            {fields.map((field) => (
                <button
                    key={field.key}
                    className="btn custom-btn"
                    onClick={() => handleSort(field.key)}
                    aria-label={`Ordenar por ${field.name}`}
                    aria-pressed={sortOrder.field === field.key}
                >
                    {field.name} {getArrowIcon(field.key)}
                </button>
            ))}
        </div>
    );
}

export default SortButtons;