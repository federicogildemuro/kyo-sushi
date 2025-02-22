function ItemStockInfo({ stock, isInCart, cartTotalQuantity }) {
    return (
        <p className="card-text text-start">
            {/* If the stock is greater than 0, show the stock amount */}
            {stock > 0
                ? (<small className="text-muted">{stock} unidades en stock</small>)
                : (<small className="text-danger">Producto no disponible</small>)
            }

            {/* If the item is in the cart and the cart total quantity is greater than 0, show the units of the item in the cart */}
            {(isInCart && cartTotalQuantity > 0) && (
                <small className="text-success ms-2">
                    {cartTotalQuantity}
                    {cartTotalQuantity === 1 ? ' unidad' : ' unidades'} en el carrito
                </small>
            )}
        </p>
    );
}

export default ItemStockInfo;