import AdminProductsTableItem from './AdminProductsTableItem';

function AdminProductsTable({ products, onDeleteProduct }) {
    return (
        <div className="table-responsive mx-5">
            <table className="table custom-table">
                <thead>
                    <tr>
                        <th className="text-start">Nombre</th>

                        <th className="text-center d-none d-md-table-cell">Descripción</th>

                        <th className="text-center d-none d-md-table-cell">Categoría</th>

                        <th className="text-center d-none d-sm-table-cell">Precio</th>

                        <th className="text-center d-none d-sm-table-cell">Stock</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <AdminProductsTableItem
                            key={product.id}
                            product={product}
                            onDelete={onDeleteProduct}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminProductsTable;