import ItemStockInfo from './ItemStockInfo';
import ItemDetailActions from './ItemDetailActions';

function ItemDetailInfo({ item, isInCart, cartTotalQuantity, addToCart }) {
    return (
        <div className="col-lg-8">
            <div className="card-body d-flex flex-column h-100">
                <h1 className="card-title display-6 fw-bold">{item.title}</h1>

                <p className="card-text">{item.description}</p>

                <h3 className="card-text text-start">${item.price.toFixed(2)}</h3>

                <ItemStockInfo
                    stock={item.stock}
                    isInCart={isInCart}
                    cartTotalQuantity={cartTotalQuantity}
                />

                <ItemDetailActions
                    item={item}
                    addToCart={addToCart}
                />
            </div>
        </div>
    );
}

export default ItemDetailInfo;