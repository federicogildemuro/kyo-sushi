import { useEffect } from 'react';
import useSorting from '../../hooks/useSorting';

function SortButtons({ items, onChange, fields }) {
    const { sortOrder, handleSort, applySorting } = useSorting();

    useEffect(() => {
        onChange(applySorting(items));
    }, [onChange, applySorting, items]);

    const getArrowIcon = (field) => {
        if (sortOrder.field === field) {
            return sortOrder.direction === 'asc' ? (
                <i className="bi bi-arrow-up" />
            ) : (
                <i className="bi bi-arrow-down" />
            );
        }
        return <i className="bi bi-arrow-down-up" />;
    };

    return (
        <div className="d-flex flex-wrap gap-3 mb-5">
            {fields.map((field) => (
                <button
                    key={field.key}
                    className="btn custom-btn"
                    onClick={() => handleSort(field.key)}
                >
                    {field.name} {getArrowIcon(field.key)}
                </button>
            ))}
        </div>
    );
}

export default SortButtons;