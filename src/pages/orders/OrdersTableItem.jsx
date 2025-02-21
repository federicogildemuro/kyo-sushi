function OrdersTableItem({ order }) {
    // Destructure order data
    const { orderId, date, items, total, status } = order;

    // Format order number
    const formattedNumber = orderId.toString().padStart(4, '0');

    // Format order date
    const orderDate = new Date(date);
    const formattedDate = orderDate.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    // Format order items
    const formattedItems = items.map((item, index) => (
        <div key={index}>
            {item.title} x {item.quantity}
        </div>
    ));

    // Format order total
    const formattedTotal = total.toFixed(2);

    // Format order status
    const getStatusText = (status) => {
        switch (status) {
            case 'pending':
                return 'Pendiente';
            case 'cancelled':
                return 'Cancelado';
            case 'sent':
                return 'Enviado';
            case 'delivered':
                return 'Entregado';
            default:
                return status;
        }
    };
    const formattedStatus = getStatusText(status);

    return (
        <tr>
            <td className="text-start">{formattedNumber}</td>

            <td className="text-center d-none d-md-table-cell">{formattedDate}</td>

            <td className="text-center d-none d-sm-table-cell">{formattedItems}</td>

            <td className="text-center d-none d-sm-table-cell">${formattedTotal}</td>

            <td className="text-center">{formattedStatus}</td>
        </tr>
    );
}

export default OrdersTableItem;