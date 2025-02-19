import SortButtons from '../../components/misc/SortButtons';

function OrdersHeader({ orders, handleSortChange }) {
    const sortFields = [
        { name: 'Número', key: 'orderId' },
        { name: 'Fecha', key: 'date' },
        { name: 'Estado', key: 'status' }
    ];

    return (
        <SortButtons
            items={orders}
            onChange={handleSortChange}
            fields={sortFields}
        />
    );
}

export default OrdersHeader;