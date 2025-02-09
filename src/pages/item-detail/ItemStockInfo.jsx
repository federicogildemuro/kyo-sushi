function ItemStockInfo({ stock, isInCart, cartTotalQuantity }) {
    return (
        <p className="card-text text-start">
            {stock > 0
                ? (<small className="text-muted">{stock} unidades en stock</small>)
                : (<small className="text-danger">Producto no disponible</small>)
            }

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