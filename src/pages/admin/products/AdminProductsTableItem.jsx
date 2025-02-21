import { useState } from 'react';
import { Link } from 'react-router-dom';
import useNotification from '../../../hooks/useNotification';
import { scrollToTop } from '../../../utils/scrollUtils';

function AdminProductsTableItem({ product, onDelete }) {
    // Destructure and format product data
    const { title, description, category, price, stock } = product;
    const formattedPrice = price.toFixed(2);

    // Handle delete confirmation
    const [isConfirming, setIsConfirming] = useState(false);
    const { showNotification } = useNotification();
    const handleConfirmDelete = () => {
        setIsConfirming(true);
        showNotification(`¿Eliminar producto "${title}"?`, 'confirm', true, handleConfirm, handleCancel);
    };
    const handleConfirm = () => {
        setIsConfirming(false);
        onDelete(product.id);
    };
    const handleCancel = () => {
        setIsConfirming(false);
    };

    return (
        <tr>
            <td className="text-start">{title}</td>

            <td className="text-start d-none d-md-table-cell">{description}</td>

            <td className="text-center d-none d-md-table-cell">{category}</td>

            <td className="text-center d-none d-sm-table-cell">${formattedPrice}</td>

            <td className="text-center d-none d-sm-table-cell">{stock}</td>

            <td>
                <div className="d-flex justify-content-end gap-3">
                    <Link
                        to={`/admin/productos/editar/${product.id}`}
                        className="btn btn-sm custom-btn"
                        onClick={scrollToTop}
                        aria-label={`Editar producto ${title}`}
                    >
                        <i
                            className="bi bi-pencil"
                            aria-hidden="true"
                        />
                    </Link>

                    <button
                        className="btn btn-sm custom-btn"
                        onClick={handleConfirmDelete}
                        disabled={isConfirming}
                        aria-disabled={isConfirming}
                        aria-label={`Eliminar producto ${title}`}
                    >
                        <i
                            className="bi bi-trash"
                            aria-hidden="true"
                        />
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default AdminProductsTableItem;