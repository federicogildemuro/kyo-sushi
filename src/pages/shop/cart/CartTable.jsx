import CartTableItem from './CartTableItem';

function CartTable({ cart, removeFromCart }) {
    return (
        <div className="table-responsive">
            <table className="table cart-table">
                <thead>
                    <tr>
                        <th className="text-start">Producto</th>

                        <th className="text-center d-none d-sm-table-cell">Cantidad</th>

                        <th className="text-end d-none d-sm-table-cell">Precio</th>

                        <th className="text-end">Total</th>
                    </tr>
                </thead>

                <tbody>
                    {cart.map((item) => (
                        <CartTableItem
                            key={item.id}
                            item={item}
                            removeItem={removeFromCart}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CartTable;