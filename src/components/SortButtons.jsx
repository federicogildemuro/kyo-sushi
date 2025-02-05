import { useEffect } from 'react';
import useSorting from '..//hooks/useSorting';

function SortButtons({ items, onChange, fields }) {
    const { sortOrder, handleSort, applySorting } = useSorting();

    useEffect(() => {
        onChange(applySorting(items));
    }, [items, onChange, applySorting]);

    const getArrowIcon = (field) => {
        if (sortOrder.field === field) {
            return sortOrder.direction === 'asc' ? (
                <i className="bi bi-arrow-up"></i>
            ) : (
                <i className="bi bi-arrow-down"></i>
            );
        }
        return <i className="bi bi-arrow-down-up"></i>;
    };

    return (
        <div className="d-flex align-items-center justify-content-center gap-3">
            {fields.map((field) => (
                <button
                    key={field.name}
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