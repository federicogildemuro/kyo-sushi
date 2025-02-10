import { Link } from 'react-router-dom';
import { deleteProduct } from '../../../services/productsServices';
import useAsync from '../../../hooks/useAsync';
import useNotification from '../../../hooks/useNotification';
import { scrollToTop } from '../../../utils/scrollUtils';
import { useEffect } from 'react';

function AdminProductsTableItem({ product, onDelete }) {
    const { title, description, category, price, stock } = product;
    const { error, execute: executeDeleteProduct } = useAsync(deleteProduct, [], false);
    const { showNotification } = useNotification();

    useEffect(() => {
        if (error) showNotification(error.message, 'danger');
    }, [error, showNotification]);

    const handleDeleteProduct = async () => {
        const result = await executeDeleteProduct(product.id);
        if (result) {
            showNotification('Producto eliminado correctamente', 'success');
            onDelete(product.id);
        }
    };

    if (!product) return null;

    return (
        <tr>
            <td className="text-start">{title}</td>

            <td className="text-center d-none d-md-table-cell">{description}</td>

            <td className="text-center">{category}</td>

            <td className="text-end d-none d-sm-table-cell">${price.toFixed(2)}</td>

            <td className="text-end d-none d-sm-table-cell">{stock}</td>

            <td>
                <div className="d-flex justify-content-end gap-3">
                    <Link
                        to={`/admin/products/${product.id}`}
                        className="btn custom-btn btn-sm"
                        onClick={scrollToTop}
                    >
                        <i className="bi bi-pencil" />
                    </Link>

                    <button
                        className="btn custom-btn btn-sm"
                        onClick={handleDeleteProduct}
                    >
                        <i className="bi bi-trash" />
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default AdminProductsTableItem;