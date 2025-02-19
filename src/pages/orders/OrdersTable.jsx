import OrdersTableItem from './OrdersTableItem';

function OrdersTable({ orders }) {
    return (
        <div className="table-responsive mx-5">
            <table className="table custom-table">
                <thead>
                    <tr>
                        <th className="text-start">Número</th>

                        <th className="text-center d-none d-md-table-cell">Fecha</th>

                        <th className="text-center d-none d-sm-table-cell">Detalle</th>

                        <th className="text-center d-none d-sm-table-cell">Monto</th>

                        <th className="text-center">Estado</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order) => (
                        <OrdersTableItem
                            key={order.id}
                            order={order}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrdersTable;